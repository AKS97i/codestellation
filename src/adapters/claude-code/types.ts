// Shapes reflect the real, undocumented Claude Code session log format —
// observed directly from ~/.claude/projects/*/*.jsonl on this machine
// (Claude Code 2.1.237). This is an internal log format with no stability
// guarantee, so every field here is optional except what parse-session.ts
// actually depends on, and parsing must degrade gracefully on drift.

export interface RawUsage {
  input_tokens?: number;
  output_tokens?: number;
  cache_creation_input_tokens?: number;
  cache_read_input_tokens?: number;
  // `iterations[]` duplicates the top-level counts above — summing both
  // would double-count, so usage.ts intentionally never reads this array
  iterations?: unknown[];
}

export interface RawAssistantLine {
  type: 'assistant';
  uuid?: string;
  timestamp?: string;
  cwd?: string;
  sessionId?: string;
  gitBranch?: string;
  message?: {
    model?: string;
    usage?: RawUsage;
  };
}

export interface RawUserLine {
  type: 'user';
  timestamp?: string;
  cwd?: string;
  sessionId?: string;
}

export interface RawOtherLine {
  type: string;
  timestamp?: string;
  sessionId?: string;
  [key: string]: unknown;
}

export type RawLine = RawAssistantLine | RawUserLine | RawOtherLine;

export interface ParsedSession {
  sessionId: string;
  cwd: string | null; // read from line content — never reconstructed from the slug, see discover.ts
  firstTimestamp: string | null;
  lastTimestamp: string | null;
  messageCount: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCacheCreationTokens: number;
  totalCacheReadTokens: number;
  modelsUsed: string[];
  /** input+output tokens per model — a session can use more than one model, so the flat totals above alone can't drive a per-model breakdown in the UI */
  tokensByModel: Record<string, number>;
  unparsedLineCount: number; // surfaced to diagnostics rather than silently swallowed
}
