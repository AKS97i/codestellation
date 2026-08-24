import type { ParsedSession } from '../adapters/claude-code/types';
import type { ParsedCodexSession } from '../adapters/codex/types';
import type { ChatSession } from '../types';

/**
 * Claude Code's log format has a `custom-title` line type (seen during
 * research, see the implementation plan's environment facts) but its
 * actual field shape was never observed/verified, so this deliberately
 * does NOT guess at it — a wrong guess would either throw or silently
 * show garbage. Titles here are built from data the parsers already
 * verify: a short id plus the session's own timestamp, both real.
 */
function shortId(id: string | null, fallback: string): string {
  if (!id) return fallback;
  return id.length > 8 ? id.slice(0, 8) : id;
}

function formatDate(iso: string | null): string {
  if (!iso) return 'unknown date';
  return new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export function claudeSessionsToChats(sessions: ParsedSession[]): ChatSession[] {
  return sessions
    .filter((s) => s.sessionId)
    .map((s) => ({
      id: s.sessionId,
      title: `Session ${shortId(s.sessionId, '?')}, ${formatDate(s.firstTimestamp)}`,
      agent: 'claude' as const,
      updatedAt: s.lastTimestamp ?? s.firstTimestamp ?? new Date(0).toISOString(),
      messageCount: s.messageCount,
    }));
}

export function codexSessionsToChats(sessions: ParsedCodexSession[]): ChatSession[] {
  return sessions
    .filter((s) => s.sessionId)
    .map((s) => ({
      id: s.sessionId as string,
      title: `Session ${shortId(s.sessionId, '?')}, ${formatDate(s.firstTimestamp)}`,
      agent: 'codex' as const,
      updatedAt: s.lastTimestamp ?? s.firstTimestamp ?? new Date(0).toISOString(),
      messageCount: 0, // rollout logs don't expose a simple per-session message count the way Claude Code's assistant-line count does
    }));
}

export function mergeChatsSortedByRecent(claude: ChatSession[], codex: ChatSession[]): ChatSession[] {
  return [...claude, ...codex].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

/** Real, documented flag — https://docs.claude.com CLI reference. Codex's equivalent resume syntax was never verified in this project's research, so it isn't fabricated here (see resumeHint below). */
export function claudeResumeCommand(sessionId: string): string {
  return `claude --resume ${sessionId}`;
}

/** Codex's resume flag wasn't verified during this project's research — surfacing the session id (real) rather than guessing a command that might be wrong. */
export function codexResumeHint(sessionId: string): string {
  return `Codex session id: ${sessionId} (check your Codex CLI's own --help for the resume flag)`;
}
