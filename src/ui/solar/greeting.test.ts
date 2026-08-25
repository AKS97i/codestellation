import { afterEach, describe, it, expect, vi } from 'vitest';
import { finishOnTransitionOrTimeout, timeOfDayFor } from './greeting';

afterEach(() => vi.useRealTimers());

// Regression test for a real reported bug: 8:37 PM was classified as
// "night" (greeting said "Good night"), which read as too early for most
// people's sense of the word — sunset's window was too narrow.
describe('timeOfDayFor', () => {
  const at = (h: number, m = 0) => new Date(2026, 0, 1, h, m);

  it('classifies 8:37 PM as sunset/evening, not night', () => {
    expect(timeOfDayFor(at(20, 37))).toBe('sunset');
  });

  it('classifies the full expected range for each period', () => {
    expect(timeOfDayFor(at(6))).toBe('morning');
    expect(timeOfDayFor(at(13))).toBe('day');
    expect(timeOfDayFor(at(18))).toBe('sunset');
    expect(timeOfDayFor(at(20, 59))).toBe('sunset');
    expect(timeOfDayFor(at(21))).toBe('night');
    expect(timeOfDayFor(at(2))).toBe('night');
  });
});

describe('finishOnTransitionOrTimeout', () => {
  it('finishes through the fallback when a reduced-motion transition event is missed', () => {
    vi.useFakeTimers();
    const target = new EventTarget();
    const onDone = vi.fn();

    finishOnTransitionOrTimeout(target, onDone, 50);
    vi.advanceTimersByTime(50);

    expect(onDone).toHaveBeenCalledOnce();
  });
});
