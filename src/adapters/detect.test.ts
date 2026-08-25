import { beforeEach, describe, expect, it, vi } from 'vitest';

const { runMock } = vi.hoisted(() => ({ runMock: vi.fn() }));

vi.mock('../core/shell', () => ({ run: runMock }));
vi.mock('../core/paths', () => ({
  PATHS: { claudeCodeProjects: '/missing/claude', codexSessions: '/missing/codex' },
  graphifyCandidates: () => ['graphify'],
  claudeCliCandidates: () => ['claude'],
}));

import { clearGraphifyDetectionCache, detectGraphify } from './detect';

describe('Graphify detection refresh', () => {
  beforeEach(() => {
    runMock.mockReset();
    clearGraphifyDetectionCache();
  });

  it('automatically detects a newly installed binary after an earlier negative result', async () => {
    runMock.mockRejectedValue(new Error('not installed'));
    expect((await detectGraphify()).installed).toBe(false);
    const initialAttempts = runMock.mock.calls.length;

    runMock.mockResolvedValue({ stdout: 'graphify 0.9.47\n', stderr: '' });
    const refreshed = await detectGraphify();
    expect(refreshed).toEqual({ installed: true, version: '0.9.47', bin: 'graphify' });
    expect(runMock).toHaveBeenCalledTimes(initialAttempts + 1);
  });
});
