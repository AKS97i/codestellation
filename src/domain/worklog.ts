import { run } from '../core/shell';
import { resolveClaudeCliBin } from '../adapters/detect';
import type { CommitSummary } from '../adapters/git/commits';

export interface WorklogInputs {
  projectName: string;
  date: string; // YYYY-MM-DD
  commits: CommitSummary[];
  sessionCount: number;
  totalTokens: number;
  timeSpentHoursEstimate: number;
}

/**
 * Builds the prompt handed to `claude -p`. Per the implementation plan's
 * Decision 16, the summary is AI-generated rather than templated — but the
 * prompt hands the model the commit subjects directly instead of letting
 * it re-read the repo, which is what actually keeps the token cost down
 * (the plan's "reuse graphify context" framing is about avoiding raw file
 * reads; giving it the diff summary up front accomplishes the same thing
 * without needing a live graphify query wired in for what's fundamentally
 * a git-log summarization task).
 */
export function buildWorklogPrompt(inputs: WorklogInputs): string {
  const commitLines = inputs.commits.length > 0
    ? inputs.commits.map((c) => `- ${c.subject}`).join('\n')
    : '(no commits on this date)';

  return [
    `Write a short, plain-language work log summary for "${inputs.projectName}" on ${inputs.date}.`,
    `Base it only on the commit messages below — do not invent details that aren't implied by them.`,
    `Format: 3-6 bullet points, each one line, no preamble or sign-off.`,
    ``,
    `Commits:`,
    commitLines,
  ].join('\n');
}

export interface WorklogResult {
  summary: string;
  generatedByAi: boolean;
}

// Shelling out to `claude -p` from inside Obsidian's child-process
// environment triggered an interactive permission prompt that the plugin
// has no way to answer (Obsidian isn't a terminal), which just hangs.
// Disabled until that's root-caused rather than shipping a beta with a
// feature that can silently freeze. The mechanical fallback below still
// gives a real, useful work log in the meantime.
const AI_SUMMARY_ENABLED = false;

/**
 * Runs the actual generation. Falls back to a plain commit-list summary
 * (generatedByAi: false) rather than failing outright when the Claude CLI
 * isn't resolvable or the call errors — a work log with a mechanical
 * summary is still useful; a blank one isn't.
 */
export async function generateWorklogSummary(inputs: WorklogInputs): Promise<WorklogResult> {
  if (!AI_SUMMARY_ENABLED) {
    return { summary: mechanicalFallback(inputs), generatedByAi: false };
  }
  const bin = await resolveClaudeCliBin();
  if (!bin) {
    return { summary: mechanicalFallback(inputs), generatedByAi: false };
  }
  try {
    const { stdout } = await run(bin, ['-p', buildWorklogPrompt(inputs), '--output-format', 'text'], { timeoutMs: 60_000 });
    const text = stdout.trim();
    if (!text) return { summary: mechanicalFallback(inputs), generatedByAi: false };
    return { summary: text, generatedByAi: true };
  } catch {
    return { summary: mechanicalFallback(inputs), generatedByAi: false };
  }
}

function mechanicalFallback(inputs: WorklogInputs): string {
  if (inputs.commits.length === 0) return '(no commits on this date)';
  return inputs.commits.map((c) => `- ${c.subject}`).join('\n');
}
