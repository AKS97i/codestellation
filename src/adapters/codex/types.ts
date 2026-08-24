// Reflects the real Codex CLI rollout log format, observed directly from
// ~/.codex/sessions/**/*.jsonl on this machine (cli_version 0.77.0 seen).
// Same caveat as claude-code/types.ts: undocumented internal format, no
// stability guarantee — parse defensively.

export interface TokenUsageSnapshot {
  input_tokens?: number;
  cached_input_tokens?: number;
  output_tokens?: number;
  reasoning_output_tokens?: number;
  total_tokens?: number;
}

export interface RawSessionMetaLine {
  type: 'session_meta';
  timestamp?: string;
  payload?: {
    id?: string;
    cwd?: string;
    originator?: string;
    cli_version?: string;
  };
}

export interface RawTurnContextLine {
  type: 'turn_context';
  timestamp?: string;
  payload?: {
    cwd?: string;
    workspace_roots?: string[];
    model?: string;
  };
}

export interface RawEventMsgLine {
  type: 'event_msg';
  timestamp?: string;
  payload?: {
    type?: string;
    // present when payload.type === 'token_count'; total_token_usage is a
    // CUMULATIVE snapshot as of this event, not a per-turn delta — the
    // session total is the LAST such event seen, never a sum across events
    info?: { total_token_usage?: TokenUsageSnapshot };
  };
}

export interface RawOtherLine {
  type: string;
  timestamp?: string;
  [key: string]: unknown;
}

export type RawRolloutLine = RawSessionMetaLine | RawTurnContextLine | RawEventMsgLine | RawOtherLine;

export interface ParsedCodexSession {
  sessionId: string | null;
  cwd: string | null; // preference order: latest turn_context.workspace_roots[0], then turn_context.cwd, then session_meta.cwd
  cliVersion: string | null;
  model: string | null; // from the last turn_context seen — a session can in principle switch models mid-way, so "last" rather than "first" reflects what the totals were actually run under most recently
  firstTimestamp: string | null;
  lastTimestamp: string | null;
  totalTokens: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  unparsedLineCount: number;
}
