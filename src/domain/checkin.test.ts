import { describe, it, expect } from 'vitest';
import { elapsedHours, hasCrossedTarget, formatElapsed } from './checkin';
import type { CheckIn } from '../types';

function checkIn(overrides: Partial<CheckIn> = {}): CheckIn {
  return { projectId: null, startedAt: '2026-08-20T10:00:00.000Z', targetHours: 8, ...overrides };
}

describe('elapsedHours', () => {
  it('computes hours from wall-clock start to now, not accumulated ticks', () => {
    const now = new Date('2026-08-20T12:30:00.000Z').getTime();
    expect(elapsedHours(checkIn(), now)).toBeCloseTo(2.5, 5);
  });

  it('never goes negative even if `now` is somehow before startedAt (clock skew)', () => {
    const now = new Date('2026-08-20T09:00:00.000Z').getTime();
    expect(elapsedHours(checkIn(), now)).toBe(0);
  });
});

describe('hasCrossedTarget', () => {
  it('is false before the target and true at/after it', () => {
    const started = new Date('2026-08-20T10:00:00.000Z').getTime();
    const target = checkIn({ targetHours: 1 });
    expect(hasCrossedTarget(target, started + 59 * 60_000)).toBe(false);
    expect(hasCrossedTarget(target, started + 60 * 60_000)).toBe(true);
  });
});

describe('formatElapsed', () => {
  it('formats sub-hour durations as minutes only', () => {
    expect(formatElapsed(0.5)).toBe('30m');
  });

  it('formats multi-hour durations as hours and minutes', () => {
    expect(formatElapsed(2.25)).toBe('2h 15m');
  });
});
