import { describe, it, expect } from 'vitest';
import { claudeSessionsToChats, codexSessionsToChats, mergeChatsSortedByRecent, startSessionWithGraphifyCommand } from './chat-sessions';
import type { ParsedSession } from '../adapters/claude-code/types';
import type { ParsedCodexSession } from '../adapters/codex/types';

function claudeSession(overrides: Partial<ParsedSession> = {}): ParsedSession {
  return {
    sessionId: 'abc12345',
    cwd: '/proj',
    customTitle: null,
    lastPrompt: null,
    firstTimestamp: '2026-08-20T10:00:00.000Z',
    lastTimestamp: '2026-08-20T11:00:00.000Z',
    messageCount: 4,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalCacheCreationTokens: 0,
    totalCacheReadTokens: 0,
    modelsUsed: [],
    tokensByModel: {},
    unparsedLineCount: 0,
    ...overrides,
  };
}

function codexSession(overrides: Partial<ParsedCodexSession> = {}): ParsedCodexSession {
  return {
    sessionId: 'def67890',
    cwd: '/proj',
    cliVersion: '0.77.0',
    model: 'gpt-5-codex',
    firstTimestamp: '2026-08-19T10:00:00.000Z',
    lastTimestamp: '2026-08-19T10:30:00.000Z',
    totalTokens: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    unparsedLineCount: 0,
    ...overrides,
  };
}

describe('claudeSessionsToChats / codexSessionsToChats', () => {
  it('drops sessions with no sessionId rather than showing a blank row', () => {
    expect(claudeSessionsToChats([claudeSession({ sessionId: '' })])).toHaveLength(0);
    expect(codexSessionsToChats([codexSession({ sessionId: null })])).toHaveLength(0);
  });

  it('tags each chat with its originating agent', () => {
    expect(claudeSessionsToChats([claudeSession()])[0].agent).toBe('claude');
    expect(codexSessionsToChats([codexSession()])[0].agent).toBe('codex');
  });

  it('falls back to firstTimestamp for updatedAt when lastTimestamp is missing', () => {
    const chat = claudeSessionsToChats([claudeSession({ lastTimestamp: null })])[0];
    expect(chat.updatedAt).toBe('2026-08-20T10:00:00.000Z');
  });

  it('prefers a real customTitle over any fallback', () => {
    const chat = claudeSessionsToChats([claudeSession({ customTitle: 'Fix login bug', lastPrompt: 'something else entirely' })])[0];
    expect(chat.title).toBe('Fix login bug');
  });

  it('falls back to the user\'s own first prompt when there is no customTitle', () => {
    const chat = claudeSessionsToChats([claudeSession({ customTitle: null, lastPrompt: 'How does the auth flow work here?' })])[0];
    expect(chat.title).toBe('How does the auth flow work here?');
  });

  it('truncates a very long prompt used as a fallback title', () => {
    const longPrompt = 'x'.repeat(200);
    const chat = claudeSessionsToChats([claudeSession({ customTitle: null, lastPrompt: longPrompt })])[0];
    expect(chat.title.length).toBeLessThan(longPrompt.length);
    expect(chat.title.endsWith('…')).toBe(true);
  });

  it('falls back to a session id/date label when neither customTitle nor lastPrompt exist', () => {
    const chat = claudeSessionsToChats([claudeSession({ customTitle: null, lastPrompt: null })])[0];
    expect(chat.title).toContain('Session');
  });

  it('uses session_index.jsonl thread_name for Codex sessions when available', () => {
    const titles = new Map([['def67890', 'Fix registration institutions error']]);
    const chat = codexSessionsToChats([codexSession()], titles)[0];
    expect(chat.title).toBe('Fix registration institutions error');
  });

  it('falls back to a session id/date label for a Codex session with no matching title', () => {
    const chat = codexSessionsToChats([codexSession()], new Map())[0];
    expect(chat.title).toContain('Session');
  });
});

describe('mergeChatsSortedByRecent', () => {
  it('sorts newest-first across both agents', () => {
    const claude = claudeSessionsToChats([claudeSession({ lastTimestamp: '2026-08-18T00:00:00.000Z' })]);
    const codex = codexSessionsToChats([codexSession({ lastTimestamp: '2026-08-22T00:00:00.000Z' })]);
    const merged = mergeChatsSortedByRecent(claude, codex);
    expect(merged[0].agent).toBe('codex');
    expect(merged[1].agent).toBe('claude');
  });
});

describe('startSessionWithGraphifyCommand', () => {
  it('cds into the project path and starts claude with a graphify-aware system prompt', () => {
    const cmd = startSessionWithGraphifyCommand('/Users/aks/Frag/Acme');
    expect(cmd).toContain('cd "/Users/aks/Frag/Acme"');
    expect(cmd).toContain('claude --append-system-prompt');
    expect(cmd).toContain('graphify');
  });
});
