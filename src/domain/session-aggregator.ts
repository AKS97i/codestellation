import type { ParsedSession } from '../adapters/claude-code/types';
import type { ParsedCodexSession } from '../adapters/codex/types';

export interface ProjectStats {
  sessionCount: number;
  totalTokens: number;
  tokensByModel: Record<string, number>;
  /**
   * Hours estimate, not a measurement. Each session's span is
   * (lastTimestamp - firstTimestamp), capped at SESSION_DURATION_CAP_HOURS
   * per session — a session log spans however long the file sits on disk
   * between its first and last line, and an editor left open overnight
   * would otherwise report a 10-hour "work session". There is no
   * per-message timestamp history to do real idle-gap detection against
   * (only first/last per session is parsed), so the cap is the honest
   * stand-in: it bounds the overcount without claiming precision the
   * data doesn't support. Surfaced in the UI as an estimate, same as
   * the token-savings number.
   */
  timeSpentHoursEstimate: number;
  lastActive: string | null;
  unparsedLineCount: number;
}

export const SESSION_DURATION_CAP_HOURS = 4;

function sessionDurationHours(first: string | null, last: string | null): number {
  if (!first || !last) return 0;
  const ms = new Date(last).getTime() - new Date(first).getTime();
  if (!Number.isFinite(ms) || ms <= 0) return 0;
  return Math.min(ms / (1000 * 60 * 60), SESSION_DURATION_CAP_HOURS);
}

function latestOf(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return a > b ? a : b;
}

/**
 * Combines Claude Code + Codex sessions already attributed to one project
 * (by the adapters' own cwd/workspace_roots matching — see discover.ts in
 * each adapter) into the numbers the workspace overview panel shows.
 */
export function aggregateProjectStats(claudeSessions: ParsedSession[], codexSessions: ParsedCodexSession[]): ProjectStats {
  const tokensByModel: Record<string, number> = {};
  let totalTokens = 0;
  let timeSpentHoursEstimate = 0;
  let lastActive: string | null = null;
  let unparsedLineCount = 0;

  for (const session of claudeSessions) {
    for (const [model, tokens] of Object.entries(session.tokensByModel)) {
      tokensByModel[model] = (tokensByModel[model] ?? 0) + tokens;
      totalTokens += tokens;
    }
    timeSpentHoursEstimate += sessionDurationHours(session.firstTimestamp, session.lastTimestamp);
    lastActive = latestOf(lastActive, session.lastTimestamp);
    unparsedLineCount += session.unparsedLineCount;
  }

  for (const session of codexSessions) {
    const model = session.model ?? 'unknown';
    const tokens = session.totalInputTokens + session.totalOutputTokens;
    tokensByModel[model] = (tokensByModel[model] ?? 0) + tokens;
    totalTokens += tokens;
    timeSpentHoursEstimate += sessionDurationHours(session.firstTimestamp, session.lastTimestamp);
    lastActive = latestOf(lastActive, session.lastTimestamp);
    unparsedLineCount += session.unparsedLineCount;
  }

  return {
    sessionCount: claudeSessions.length + codexSessions.length,
    totalTokens,
    tokensByModel,
    timeSpentHoursEstimate,
    lastActive,
    unparsedLineCount,
  };
}
