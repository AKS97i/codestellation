import type { ParsedSession } from '../adapters/claude-code/types';
import type { ParsedCodexSession } from '../adapters/codex/types';
import type { ChatSession } from '../types';

/** Only used when nothing better is available — a real custom-title, or (for Claude) the user's own first prompt, or (for Codex) session_index.jsonl's thread_name, all cover the common case now. */
function shortId(id: string | null, fallback: string): string {
  if (!id) return fallback;
  return id.length > 8 ? id.slice(0, 8) : id;
}

function formatDate(iso: string | null): string {
  if (!iso) return 'unknown date';
  return new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

const MAX_PROMPT_TITLE_LENGTH = 80;

/** Claude Code sets an explicit customTitle once a session has one (verified real field, see types.ts) — prefer it. Otherwise the user's own first prompt is a far better label than a bare session id. */
function claudeTitle(session: ParsedSession): string {
  if (session.customTitle) return session.customTitle;
  if (session.lastPrompt) {
    const trimmed = session.lastPrompt.trim();
    return trimmed.length > MAX_PROMPT_TITLE_LENGTH ? `${trimmed.slice(0, MAX_PROMPT_TITLE_LENGTH)}…` : trimmed;
  }
  return `Session ${shortId(session.sessionId, '?')}, ${formatDate(session.firstTimestamp)}`;
}

export function claudeSessionsToChats(sessions: ParsedSession[]): ChatSession[] {
  return sessions
    .filter((s) => s.sessionId)
    .map((s) => ({
      id: s.sessionId,
      title: claudeTitle(s),
      agent: 'claude' as const,
      updatedAt: s.lastTimestamp ?? s.firstTimestamp ?? new Date(0).toISOString(),
      messageCount: s.messageCount,
    }));
}

/** `titles` is session_index.jsonl's id -> thread_name map (see session-index.ts) — the real, human-written Codex session title. Falls back to the id/date label for sessions that predate that index or aren't in it. */
export function codexSessionsToChats(sessions: ParsedCodexSession[], titles: Map<string, string> = new Map()): ChatSession[] {
  return sessions
    .filter((s) => s.sessionId)
    .map((s) => ({
      id: s.sessionId as string,
      title: (s.sessionId && titles.get(s.sessionId)) || `Session ${shortId(s.sessionId, '?')}, ${formatDate(s.firstTimestamp)}`,
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

/**
 * `--append-system-prompt` is a real, documented Claude Code CLI flag
 * (verified via `claude --help` during this project's research). This is
 * a nudge, not a guarantee: whether Claude actually calls out to
 * graphify still depends on the graphify skill being installed in the
 * user's own Claude Code setup (separate from Codestellation, and
 * outside what a plugin invoking the CLI can control) — Claude Code
 * already auto-triggers that skill when a graphify-out/ folder is
 * present, so this system prompt is reinforcement for setups where that
 * isn't already wired up, not something that "attaches" data by itself.
 */
export function startSessionWithGraphifyCommand(projectPath: string): string {
  const prompt = 'This project has a graphify knowledge graph in graphify-out/. Use the graphify CLI (graphify query, graphify explain, graphify path) instead of reading files directly for structural questions about this codebase.';
  return `cd "${projectPath}" && claude --append-system-prompt "${prompt}"`;
}

/** Codex's resume flag wasn't verified during this project's research — surfacing the session id (real) rather than guessing a command that might be wrong. */
export function codexResumeHint(sessionId: string): string {
  return `Codex session id: ${sessionId} (check your Codex CLI's own --help for the resume flag)`;
}
