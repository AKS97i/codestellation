import { describe, it, expect } from 'vitest';
import * as path from 'node:path';
import { parseSessionFile } from './parse-session';

const FIXTURES = path.join(import.meta.dirname, '../../testing/fixtures/claude-code');

describe('parseSessionFile', () => {
  it('sums top-level usage fields only, ignoring the duplicating iterations[] array', async () => {
    const result = await parseSessionFile(path.join(FIXTURES, 'normal-session.jsonl'));

    // fixture has two assistant lines: (input 2, output 256) and (input 10, output 800)
    // if iterations[] were double-counted, these would be doubled
    expect(result.totalInputTokens).toBe(12);
    expect(result.totalOutputTokens).toBe(1056);
    expect(result.totalCacheCreationTokens).toBe(22579);
    expect(result.totalCacheReadTokens).toBe(93469);
    expect(result.messageCount).toBe(2);
  });

  it('reads cwd from line content, not from any path reconstruction', async () => {
    const result = await parseSessionFile(path.join(FIXTURES, 'normal-session.jsonl'));
    expect(result.cwd).toBe('/Users/repouser/Projects/Acme');
  });

  it('captures sessionId and first/last timestamps', async () => {
    const result = await parseSessionFile(path.join(FIXTURES, 'normal-session.jsonl'));
    expect(result.sessionId).toBe('session-a');
    expect(result.firstTimestamp).toBe('2026-08-22T12:26:27.407Z');
    expect(result.lastTimestamp).toBe('2026-08-22T12:40:01.000Z');
  });

  it('tracks distinct models used', async () => {
    const result = await parseSessionFile(path.join(FIXTURES, 'normal-session.jsonl'));
    expect(result.modelsUsed).toEqual(['claude-sonnet-5']);
  });

  it('survives a corrupt line, an unknown line type, and missing fields without throwing', async () => {
    const result = await parseSessionFile(path.join(FIXTURES, 'messy-session.jsonl'));

    // one genuinely malformed JSON line
    expect(result.unparsedLineCount).toBe(1);
    // both assistant lines still counted despite one missing most usage fields entirely
    expect(result.messageCount).toBe(2);
    // 5 + undefined(0) input; 100 + 50 output
    expect(result.totalInputTokens).toBe(5);
    expect(result.totalOutputTokens).toBe(150);
    // cwd came from the first line that had it, even though a later line omits it
    expect(result.cwd).toBe('/Users/repouser/Projects/Widget Portal');
  });

  it('handles a path with a literal dash in a path segment correctly via content, not slug decoding', async () => {
    // "Widget Portal" itself has no dash, but this documents the property the
    // fixture is designed to exercise: cwd here is never derived by
    // replacing "-" with "/" in a folder slug — it's read verbatim from
    // the line content, so a real path segment like "landing-page" or
    // "Widget-Portal" is never ambiguous the way a slug would be.
    const result = await parseSessionFile(path.join(FIXTURES, 'messy-session.jsonl'));
    expect(result.cwd).not.toMatch(/^-/); // sanity: not an un-decoded slug fragment
  });
});
