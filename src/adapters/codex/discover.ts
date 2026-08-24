import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { PATHS } from '../../core/paths';
import { parseRolloutFile } from './parse-rollout';
import type { ParsedCodexSession } from './types';

export interface DiscoveredCodexProject {
  cwd: string;
  sessions: ParsedCodexSession[];
}

/**
 * Codex rollout files live under ~/.codex/sessions/YYYY/MM/DD/*.jsonl —
 * this walks that three-level date tree. Grouping is by each session's
 * resolved cwd (workspace_roots preferred over the scratch cwd — see
 * parse-rollout.ts), same approach as the Claude Code adapter.
 */
export async function discoverCodexProjects(): Promise<DiscoveredCodexProject[]> {
  let files: string[];
  try {
    files = await walkJsonlFiles(PATHS.codexSessions, 3);
  } catch {
    return []; // Codex has never run on this machine, or the path moved
  }

  const byCwd = new Map<string, ParsedCodexSession[]>();

  for (const filePath of files) {
    let session: ParsedCodexSession;
    try {
      session = await parseRolloutFile(filePath);
    } catch {
      continue; // one unreadable file shouldn't fail discovery for every other project
    }
    if (!session.cwd) continue;

    const list = byCwd.get(session.cwd) ?? [];
    list.push(session);
    byCwd.set(session.cwd, list);
  }

  return Array.from(byCwd.entries()).map(([cwd, sessions]) => ({ cwd, sessions }));
}

async function walkJsonlFiles(dir: string, depthRemaining: number): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && depthRemaining > 0) {
      results.push(...(await walkJsonlFiles(full, depthRemaining - 1).catch(() => [])));
    } else if (entry.isFile() && entry.name.endsWith('.jsonl')) {
      results.push(full);
    }
  }
  return results;
}
