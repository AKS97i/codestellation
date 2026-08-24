import { discoverClaudeCodeProjects } from '../adapters/claude-code/discover';
import { discoverCodexProjects } from '../adapters/codex/discover';
import { detectAgentAvailability, detectGraphify, resolveClaudeCliBin } from '../adapters/detect';
import { PATHS } from '../core/paths';
import type { RegistryEntry } from './project-registry';

/**
 * Everything a bug report actually needs: what the plugin detected, where
 * it looked, and how many log lines it couldn't parse. Per the
 * implementation plan's Phase 10 note, this is meant to be the first
 * thing asked for when something's wrong, rather than guessing blind —
 * exactly the "silent failure" pattern this project's history kept
 * running into.
 */
export async function buildDiagnosticsReport(registry: RegistryEntry[]): Promise<string> {
  const lines: string[] = [];
  lines.push(`Codestellation diagnostics, ${new Date().toISOString()}`);
  lines.push(`Platform: ${process.platform}`);
  lines.push('');

  const agents = await detectAgentAvailability();
  lines.push(`Claude Code session history found: ${agents.claudeCode} (${PATHS.claudeCodeProjects})`);
  lines.push(`Codex session history found: ${agents.codex} (${PATHS.codexSessions})`);

  const claudeCliBin = await resolveClaudeCliBin();
  lines.push(`Claude CLI resolved to: ${claudeCliBin ?? '(not found, work log AI summaries will fall back to a plain commit list)'}`);

  const graphify = await detectGraphify();
  lines.push(`graphify: ${graphify.installed ? `found at ${graphify.bin} (v${graphify.version ?? 'unknown'})` : 'not found. Install with: pip install graphifyy'}`);
  lines.push('');

  lines.push(`Registered projects: ${registry.length}`);
  for (const entry of registry) {
    lines.push(`  - ${entry.name} (${entry.id}) → ${entry.path}${entry.graphPath ? ` [graph: ${entry.graphPath}]` : ' [no graph]'}`);
  }
  lines.push('');

  try {
    const [claudeProjects, codexProjects] = await Promise.all([discoverClaudeCodeProjects(), discoverCodexProjects()]);
    const totalClaudeSessions = claudeProjects.reduce((n, p) => n + p.sessions.length, 0);
    const totalCodexSessions = codexProjects.reduce((n, p) => n + p.sessions.length, 0);
    const unparsedClaude = claudeProjects.reduce((n, p) => n + p.sessions.reduce((m, s) => m + s.unparsedLineCount, 0), 0);
    const unparsedCodex = codexProjects.reduce((n, p) => n + p.sessions.reduce((m, s) => m + s.unparsedLineCount, 0), 0);
    lines.push(`Claude Code sessions on disk: ${totalClaudeSessions} across ${claudeProjects.length} project path(s), ${unparsedClaude} unparsed line(s)`);
    lines.push(`Codex sessions on disk: ${totalCodexSessions} across ${codexProjects.length} project path(s), ${unparsedCodex} unparsed line(s)`);
  } catch (e) {
    lines.push(`Session scan failed: ${(e as Error).message ?? e}`);
  }

  return lines.join('\n');
}
