import * as readline from 'node:readline';
import { createReadStream } from 'node:fs';
import type { ParsedSession, RawLine } from './types';

/**
 * Streams a Claude Code session .jsonl file line-by-line (never
 * JSON.parse-ing the whole file — some of these run to tens of MB) and
 * aggregates it into a single summary.
 *
 * Deliberately defensive: an unparsed line increments unparsedLineCount
 * and is skipped, rather than throwing and losing the whole file's data.
 * `cwd` is read from the first line that has it — never reconstructed
 * from the containing folder's slug, since slug decoding (`/` -> `-`) is
 * lossy for any real path that itself contains a `-` (e.g. "landing-page").
 */
export async function parseSessionFile(filePath: string): Promise<ParsedSession> {
  const result: ParsedSession = {
    sessionId: '',
    cwd: null,
    customTitle: null,
    lastPrompt: null,
    firstTimestamp: null,
    lastTimestamp: null,
    messageCount: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalCacheCreationTokens: 0,
    totalCacheReadTokens: 0,
    modelsUsed: [],
    tokensByModel: {},
    unparsedLineCount: 0,
  };

  const modelsSeen = new Set<string>();
  const rl = readline.createInterface({ input: createReadStream(filePath, 'utf8'), crlfDelay: Infinity });

  for await (const rawLine of rl) {
    if (!rawLine.trim()) continue;

    let line: RawLine;
    try {
      line = JSON.parse(rawLine);
    } catch {
      result.unparsedLineCount++;
      continue;
    }

    if (!result.sessionId && typeof line.sessionId === 'string') {
      result.sessionId = line.sessionId;
    }
    if (!result.cwd && typeof (line as any).cwd === 'string') {
      result.cwd = (line as any).cwd;
    }
    if (typeof line.timestamp === 'string') {
      if (!result.firstTimestamp || line.timestamp < result.firstTimestamp) result.firstTimestamp = line.timestamp;
      if (!result.lastTimestamp || line.timestamp > result.lastTimestamp) result.lastTimestamp = line.timestamp;
    }

    if (line.type === 'custom-title' && typeof (line as any).customTitle === 'string') {
      result.customTitle = (line as any).customTitle;
    }
    if (line.type === 'last-prompt' && typeof (line as any).lastPrompt === 'string') {
      result.lastPrompt = (line as any).lastPrompt;
    }

    if (line.type === 'assistant') {
      result.messageCount++;
      const usage = (line as any).message?.usage;
      const model = (line as any).message?.model;
      if (typeof model === 'string') modelsSeen.add(model);
      if (usage) {
        result.totalInputTokens += usage.input_tokens ?? 0;
        result.totalOutputTokens += usage.output_tokens ?? 0;
        result.totalCacheCreationTokens += usage.cache_creation_input_tokens ?? 0;
        result.totalCacheReadTokens += usage.cache_read_input_tokens ?? 0;
        const modelKey = typeof model === 'string' ? model : 'unknown';
        const tokensThisLine = (usage.input_tokens ?? 0) + (usage.output_tokens ?? 0);
        result.tokensByModel[modelKey] = (result.tokensByModel[modelKey] ?? 0) + tokensThisLine;
      }
    }
  }

  result.modelsUsed = Array.from(modelsSeen);
  return result;
}
