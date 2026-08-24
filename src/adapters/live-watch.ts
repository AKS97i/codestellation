import * as fs from 'node:fs';
import * as fsp from 'node:fs/promises';
import * as path from 'node:path';
import * as readline from 'node:readline';
import { PATHS } from '../core/paths';
import { extractToolUseFileRefs } from './claude-code/tool-use';

/**
 * Finds the Claude Code session file most likely to be "the one currently
 * active" for a project: newest-modified-first among files whose early
 * lines record this exact cwd. Checking only the first few lines (not a
 * full parse) keeps this cheap enough to call once per graph-tab open —
 * cwd is set from the first line that has it, same assumption
 * parse-session.ts already makes. Scans at most the 50 most recently
 * touched files across ALL projects before giving up, so an idle project
 * with many old sessions doesn't make this scan the whole session history.
 */
async function findActiveSessionFile(cwd: string): Promise<string | null> {
  let slugDirs: string[];
  try {
    slugDirs = await fsp.readdir(PATHS.claudeCodeProjects);
  } catch {
    return null;
  }

  const candidates: { file: string; mtimeMs: number }[] = [];
  for (const slug of slugDirs) {
    const dir = path.join(PATHS.claudeCodeProjects, slug);
    const entries = await fsp.readdir(dir).catch(() => [] as string[]);
    for (const entry of entries) {
      if (!entry.endsWith('.jsonl')) continue;
      const file = path.join(dir, entry);
      const stat = await fsp.stat(file).catch(() => null);
      if (stat) candidates.push({ file, mtimeMs: stat.mtimeMs });
    }
  }
  candidates.sort((a, b) => b.mtimeMs - a.mtimeMs);

  for (const candidate of candidates.slice(0, 50)) {
    if (await fileStartsWithCwd(candidate.file, cwd)) return candidate.file;
  }
  return null;
}

async function fileStartsWithCwd(file: string, cwd: string): Promise<boolean> {
  const rl = readline.createInterface({ input: fs.createReadStream(file, 'utf8'), crlfDelay: Infinity });
  let lineCount = 0;
  try {
    for await (const rawLine of rl) {
      lineCount++;
      try {
        const parsed = JSON.parse(rawLine);
        if (parsed?.cwd === cwd) return true;
      } catch {
        // skip corrupt line, same tolerance parse-session.ts uses
      }
      if (lineCount > 5) break;
    }
  } finally {
    rl.close();
  }
  return false;
}

/**
 * Watches the active session file for a project and calls back with any
 * file paths touched by tool_use blocks in newly-appended lines. Returns
 * a dispose function — callers MUST call it when the graph tab closes or
 * the workspace view unloads, or the fs.watch handle leaks (same class of
 * bug the orbit engine's rAF loop had to guard against in Phase 0/5).
 *
 * A new session starting after this watcher attaches won't be picked up —
 * this does one discovery pass at start, not continuous rediscovery.
 * Reopening the graph tab re-runs discovery, which is an acceptable v1
 * tradeoff given this is explicitly the highest-risk, last-built piece
 * of the plan.
 */
export function watchActiveSession(cwd: string, onFilesTouched: (absolutePaths: string[]) => void): () => void {
  let watcher: fs.FSWatcher | null = null;
  let lastSize = 0;
  let disposed = false;

  (async () => {
    const file = await findActiveSessionFile(cwd);
    if (!file || disposed) return;

    const stat = await fsp.stat(file).catch(() => null);
    lastSize = stat?.size ?? 0;

    watcher = fs.watch(file, { persistent: false }, () => {
      handleChange(file).catch(() => {
        // a transient read race (rotation/truncation mid-write) — skip this tick
      });
    });
  })();

  async function handleChange(file: string) {
    const stat = await fsp.stat(file).catch(() => null);
    if (!stat || stat.size <= lastSize) {
      if (stat) lastSize = stat.size;
      return;
    }
    const start = lastSize;
    lastSize = stat.size;

    const stream = fs.createReadStream(file, { start, end: stat.size - 1, encoding: 'utf8' });
    let buf = '';
    for await (const chunk of stream) buf += chunk;

    const touched: string[] = [];
    for (const rawLine of buf.split('\n')) {
      if (!rawLine.trim()) continue;
      for (const ref of extractToolUseFileRefs(rawLine)) touched.push(ref.filePath);
    }
    if (touched.length > 0) onFilesTouched(touched);
  }

  return () => {
    disposed = true;
    watcher?.close();
  };
}
