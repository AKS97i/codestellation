import * as readline from 'node:readline';
import { createReadStream } from 'node:fs';
import type { ParsedCodexSession, RawRolloutLine } from './types';

/**
 * Streams a Codex rollout .jsonl file. Two things this deliberately gets
 * right that a naive implementation would not:
 *
 * 1. `cwd` prefers `turn_context.payload.workspace_roots[0]` over
 *    `session_meta.payload.cwd` / `turn_context.payload.cwd` — Codex often
 *    runs with `cwd` pointed at a per-session scratch directory (e.g.
 *    `~/Documents/Codex/2026-08-21/some-task-3`), while workspace_roots
 *    names the actual project folder being worked on.
 * 2. Token totals come from the LAST `token_count` event's
 *    `total_token_usage`, not a sum across all such events — each
 *    snapshot is already cumulative for the whole session, so summing
 *    them would multiply the real total by however many events fired.
 */
export async function parseRolloutFile(filePath: string): Promise<ParsedCodexSession> {
  const result: ParsedCodexSession = {
    sessionId: null,
    cwd: null,
    cliVersion: null,
    model: null,
    firstTimestamp: null,
    lastTimestamp: null,
    totalTokens: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    unparsedLineCount: 0,
  };

  let sessionMetaCwd: string | null = null;
  let turnContextCwd: string | null = null;
  let workspaceRootCwd: string | null = null;

  const rl = readline.createInterface({ input: createReadStream(filePath, 'utf8'), crlfDelay: Infinity });

  for await (const rawLine of rl) {
    if (!rawLine.trim()) continue;

    let line: RawRolloutLine;
    try {
      line = JSON.parse(rawLine);
    } catch {
      result.unparsedLineCount++;
      continue;
    }

    if (typeof line.timestamp === 'string') {
      if (!result.firstTimestamp || line.timestamp < result.firstTimestamp) result.firstTimestamp = line.timestamp;
      if (!result.lastTimestamp || line.timestamp > result.lastTimestamp) result.lastTimestamp = line.timestamp;
    }

    if (line.type === 'session_meta') {
      const payload = (line as any).payload;
      if (payload?.id) result.sessionId = payload.id;
      if (payload?.cli_version) result.cliVersion = payload.cli_version;
      if (typeof payload?.cwd === 'string') sessionMetaCwd = payload.cwd;
    } else if (line.type === 'turn_context') {
      const payload = (line as any).payload;
      if (typeof payload?.cwd === 'string') turnContextCwd = payload.cwd;
      if (Array.isArray(payload?.workspace_roots) && payload.workspace_roots.length > 0) {
        workspaceRootCwd = payload.workspace_roots[0];
      }
      if (typeof payload?.model === 'string') result.model = payload.model;
    } else if (line.type === 'event_msg') {
      const payload = (line as any).payload;
      if (payload?.type === 'token_count' && payload.info?.total_token_usage) {
        const usage = payload.info.total_token_usage;
        result.totalInputTokens = usage.input_tokens ?? result.totalInputTokens;
        result.totalOutputTokens = usage.output_tokens ?? result.totalOutputTokens;
        result.totalTokens = usage.total_tokens ?? result.totalTokens;
      }
    }
  }

  result.cwd = workspaceRootCwd ?? turnContextCwd ?? sessionMetaCwd;
  return result;
}
