import { describe, it, expect } from 'vitest';
import { buildWorklogPrompt } from './worklog';

describe('buildWorklogPrompt', () => {
  it('lists each commit subject as a bullet', () => {
    const prompt = buildWorklogPrompt({
      projectName: 'Acme',
      date: '2026-08-20',
      commits: [
        { hash: 'a', author: 'AKS', subject: 'Fix login bug' },
        { hash: 'b', author: 'AKS', subject: 'Add dashboard widget' },
      ],
      sessionCount: 2,
      totalTokens: 1000,
      timeSpentHoursEstimate: 1.5,
    });
    expect(prompt).toContain('- Fix login bug');
    expect(prompt).toContain('- Add dashboard widget');
    expect(prompt).toContain('Acme');
    expect(prompt).toContain('2026-08-20');
  });

  it('says explicitly when there are no commits, rather than an empty list', () => {
    const prompt = buildWorklogPrompt({
      projectName: 'Acme',
      date: '2026-08-20',
      commits: [],
      sessionCount: 0,
      totalTokens: 0,
      timeSpentHoursEstimate: 0,
    });
    expect(prompt).toContain('(no commits on this date)');
  });
});
