// Merges Claude Code + Codex discovery into one list the wizard can show,
// independent of which agent(s) actually produced the session history —
// per the design spec, projects aren't tagged by which agent found them,
// they're just "projects".
import { discoverClaudeCodeProjects } from '../../adapters/claude-code/discover';
import { discoverCodexProjects } from '../../adapters/codex/discover';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

export interface DiscoveredProject {
  cwd: string;
  name: string; // last path segment, used as the initial display name
  sessionCount: number;
}

export async function discoverAllProjects(): Promise<DiscoveredProject[]> {
  const [claudeProjects, codexProjects] = await Promise.all([
    discoverClaudeCodeProjects().catch(() => []),
    discoverCodexProjects().catch(() => []),
  ]);

  const byCwd = new Map<string, number>();
  for (const p of claudeProjects) byCwd.set(p.cwd, (byCwd.get(p.cwd) ?? 0) + p.sessions.length);
  for (const p of codexProjects) byCwd.set(p.cwd, (byCwd.get(p.cwd) ?? 0) + p.sessions.length);

  const results: DiscoveredProject[] = [];
  for (const [cwd, sessionCount] of byCwd) {
    const exists = await fs.stat(cwd).then((s) => s.isDirectory()).catch(() => false);
    if (!exists) continue; // don't offer to import a project whose folder was deleted/moved since the session ran
    results.push({ cwd, name: path.basename(cwd), sessionCount });
  }

  return results.sort((a, b) => b.sessionCount - a.sessionCount);
}
