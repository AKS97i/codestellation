import * as readline from 'node:readline';
import { createReadStream } from 'node:fs';
import * as fs from 'node:fs/promises';
import { PATHS } from '../../core/paths';

/**
 * `~/.codex/session_index.jsonl` — one line per session: `{id, thread_name,
 * updated_at}`. `thread_name` is the real, human-written session title
 * (verified against real data on this machine) — without this, Codex
 * sessions in the Chats tab have no title at all, since rollout logs
 * themselves don't carry one.
 */
export async function loadCodexSessionTitles(): Promise<Map<string, string>> {
  const titles = new Map<string, string>();
  const exists = await fs.stat(PATHS.codexSessionIndex).then(() => true).catch(() => false);
  if (!exists) return titles; // Codex has never run, or this build predates session_index.jsonl

  const rl = readline.createInterface({ input: createReadStream(PATHS.codexSessionIndex, 'utf8'), crlfDelay: Infinity });
  for await (const rawLine of rl) {
    if (!rawLine.trim()) continue;
    try {
      const parsed = JSON.parse(rawLine);
      if (typeof parsed.id === 'string' && typeof parsed.thread_name === 'string') {
        titles.set(parsed.id, parsed.thread_name);
      }
    } catch {
      // one corrupt line shouldn't lose every other title
    }
  }
  return titles;
}
