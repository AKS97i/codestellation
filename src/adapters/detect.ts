import * as fs from 'node:fs/promises';
import { PATHS, graphifyCandidates, claudeCliCandidates } from '../core/paths';
import { run } from '../core/shell';

export interface AgentAvailability {
  claudeCode: boolean;
  codex: boolean;
}

/** Checks whether Claude Code and/or Codex have ever run on this machine, by presence of their local session directories — not by checking for the CLI binary on PATH, since a session history existing is the actual signal onboarding cares about. */
export async function detectAgentAvailability(): Promise<AgentAvailability> {
  const [claudeCode, codex] = await Promise.all([
    fs.stat(PATHS.claudeCodeProjects).then((s) => s.isDirectory()).catch(() => false),
    fs.stat(PATHS.codexSessions).then((s) => s.isDirectory()).catch(() => false),
  ]);
  return { claudeCode, codex };
}

export const GRAPHIFY_MIN_VERSION = '0.9.47'; // matches the graphify skill version at time of writing — see R6 in the implementation plan

export interface GraphifyAvailability {
  installed: boolean;
  version: string | null;
  /** The candidate path that actually worked — null when nothing did. Callers that need to invoke graphify (the onboarding wizard) should reuse this rather than guessing a path themselves. */
  bin: string | null;
}

let cached: { bin: string | null; version: string | null } | undefined;

/** Tries every known graphify location in order and caches the first one that responds to `--version`. Not a PATH-only lookup, because a GUI app's PATH usually excludes pipx/homebrew/npm install dirs — see graphifyCandidates(). */
async function resolveGraphifyBin(): Promise<{ bin: string | null; version: string | null }> {
  if (cached !== undefined) {
    return cached;
  }
  for (const candidate of graphifyCandidates()) {
    try {
      const { stdout } = await run(candidate, ['--version']);
      const match = stdout.match(/(\d+\.\d+\.\d+)/);
      cached = { bin: candidate, version: match?.[1] ?? null };
      return cached;
    } catch {
      // try the next candidate
    }
  }
  cached = { bin: null, version: null };
  return cached;
}

export async function detectGraphify(): Promise<GraphifyAvailability> {
  const { bin, version } = await resolveGraphifyBin();
  return { installed: bin !== null, version, bin };
}

/** A graph already exists for this project if graphify-out/graph.json is present. */
export async function projectHasGraph(projectPath: string): Promise<boolean> {
  return fs
    .stat(`${projectPath}/graphify-out/graph.json`)
    .then((s) => s.isFile())
    .catch(() => false);
}

let cachedClaudeBin: string | null | undefined;

/** Same resolution strategy as detectGraphify() — the work log generator needs to shell out to `claude -p`, and can't assume it's on Obsidian's minimal PATH. */
export async function resolveClaudeCliBin(): Promise<string | null> {
  if (cachedClaudeBin !== undefined) return cachedClaudeBin;
  for (const candidate of claudeCliCandidates()) {
    try {
      await run(candidate, ['--version']);
      cachedClaudeBin = candidate;
      return cachedClaudeBin;
    } catch {
      // try the next candidate
    }
  }
  cachedClaudeBin = null;
  return null;
}
