import { describe, it, expect } from 'vitest';
import * as path from 'node:path';
import { parseRolloutFile } from './parse-rollout';

const FIXTURES = path.join(import.meta.dirname, '../../testing/fixtures/codex');

describe('parseRolloutFile', () => {
  it('takes the LAST token_count event as the session total, never summing across events', async () => {
    const result = await parseRolloutFile(path.join(FIXTURES, 'normal-rollout.jsonl'));

    // fixture has 3 token_count events with cumulative totals 1050, 5300, 9600
    // a naive sum would produce 1050+5300+9600 = 15950, which is wrong
    expect(result.totalTokens).toBe(9600);
    expect(result.totalInputTokens).toBe(9000);
    expect(result.totalOutputTokens).toBe(600);
  });

  it('prefers workspace_roots over the scratch-directory cwd', async () => {
    const result = await parseRolloutFile(path.join(FIXTURES, 'normal-rollout.jsonl'));
    // session_meta/turn_context both say a scratch dir; workspace_roots says the real project
    expect(result.cwd).toBe('/Users/repouser/Projects/Acme');
  });

  it('captures session id and cli version from session_meta', async () => {
    const result = await parseRolloutFile(path.join(FIXTURES, 'normal-rollout.jsonl'));
    expect(result.sessionId).toBe('codex-session-1');
    expect(result.cliVersion).toBe('0.77.0');
  });
});
