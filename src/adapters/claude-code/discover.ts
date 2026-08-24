import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { PATHS } from '../../core/paths';
import { parseSessionFile } from './parse-session';
import type { ParsedSession } from './types';

export interface DiscoveredClaudeCodeProject {
  cwd: string; // read from session content, not the slug — see parse-session.ts
  sessions: ParsedSession[];
}

/**
 * Enumerates every Claude Code session on disk and groups them by the
 * real `cwd` recorded inside each session (not by the slug folder name,
 * which is a lossy encoding of the path and cannot be reliably reversed).
 */
export async function discoverClaudeCodeProjects(): Promise<DiscoveredClaudeCodeProject[]> {
  let slugDirs: string[];
  try {
    slugDirs = await fs.readdir(PATHS.claudeCodeProjects);
  } catch {
    return []; // Claude Code has never run on this machine, or the path moved — not an error state
  }

  const byCwd = new Map<string, ParsedSession[]>();

  for (const slug of slugDirs) {
    const slugPath = path.join(PATHS.claudeCodeProjects, slug);
    let entries: string[];
    try {
      entries = await fs.readdir(slugPath);
    } catch {
      continue; // not a directory, or a permissions issue — skip, don't fail the whole scan
    }

    for (const entry of entries) {
      if (!entry.endsWith('.jsonl')) continue;
      const filePath = path.join(slugPath, entry);
      let session: ParsedSession;
      try {
        session = await parseSessionFile(filePath);
      } catch {
        continue; // one unreadable file shouldn't fail discovery for every other project
      }
      if (!session.cwd) continue; // can't attribute this session to a project without a real path

      const list = byCwd.get(session.cwd) ?? [];
      list.push(session);
      byCwd.set(session.cwd, list);
    }
  }

  return Array.from(byCwd.entries()).map(([cwd, sessions]) => ({ cwd, sessions }));
}
