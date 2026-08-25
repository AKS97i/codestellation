import { describe, it, expect } from 'vitest';
import { aggregateProjectStats, SESSION_DURATION_CAP_HOURS } from './session-aggregator';
import type { ParsedSession } from '../adapters/claude-code/types';
import type { ParsedCodexSession } from '../adapters/codex/types';

function claudeSession(overrides: Partial<ParsedSession> = {}): ParsedSession {
  return {
    sessionId: 's1',
    cwd: '/proj',
    customTitle: null,
    lastPrompt: null,
    firstTimestamp: '2026-08-20T10:00:00.000Z',
    lastTimestamp: '2026-08-20T11:00:00.000Z',
    messageCount: 2,
    totalInputTokens: 100,
    totalOutputTokens: 200,
    totalCacheCreationTokens: 0,
    totalCacheReadTokens: 0,
    modelsUsed: ['claude-sonnet-5'],
    tokensByModel: { 'claude-sonnet-5': 300 },
    unparsedLineCount: 0,
    ...overrides,
  };
}

function codexSession(overrides: Partial<ParsedCodexSession> = {}): ParsedCodexSession {
  return {
    sessionId: 'c1',
    cwd: '/proj',
    cliVersion: '0.77.0',
    model: 'gpt-5-codex',
    firstTimestamp: '2026-08-20T10:00:00.000Z',
    lastTimestamp: '2026-08-20T10:30:00.000Z',
    totalTokens: 500,
    totalInputTokens: 400,
    totalOutputTokens: 100,
    unparsedLineCount: 0,
    ...overrides,
  };
}

describe('aggregateProjectStats', () => {
  it('sums tokens per model across both agents', () => {
    const stats = aggregateProjectStats([claudeSession()], [codexSession()]);
    expect(stats.sessionCount).toBe(2);
    expect(stats.tokensByModel).toEqual({ 'claude-sonnet-5': 300, 'gpt-5-codex': 500 });
    expect(stats.totalTokens).toBe(800);
  });

  it('caps a single session duration at SESSION_DURATION_CAP_HOURS instead of counting an all-night idle gap', () => {
    const overnight = claudeSession({
      firstTimestamp: '2026-08-20T09:00:00.000Z',
      lastTimestamp: '2026-08-21T09:00:00.000Z', // 24h span
    });
    const stats = aggregateProjectStats([overnight], []);
    expect(stats.timeSpentHoursEstimate).toBe(SESSION_DURATION_CAP_HOURS);
  });

  it('reports the most recent lastTimestamp across all sessions as lastActive', () => {
    const older = claudeSession({ lastTimestamp: '2026-08-19T00:00:00.000Z' });
    const newer = codexSession({ lastTimestamp: '2026-08-22T00:00:00.000Z' });
    const stats = aggregateProjectStats([older], [newer]);
    expect(stats.lastActive).toBe('2026-08-22T00:00:00.000Z');
  });

  it('handles no sessions at all without throwing', () => {
    const stats = aggregateProjectStats([], []);
    expect(stats.sessionCount).toBe(0);
    expect(stats.totalTokens).toBe(0);
    expect(stats.lastActive).toBeNull();
  });

  it('carries forward unparsed line counts rather than swallowing them', () => {
    const stats = aggregateProjectStats([claudeSession({ unparsedLineCount: 3 })], [codexSession({ unparsedLineCount: 2 })]);
    expect(stats.unparsedLineCount).toBe(5);
  });
});
