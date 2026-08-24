import { describe, it, expect } from 'vitest';
import { estimateSavingsFromSizes } from './savings';

describe('estimateSavingsFromSizes', () => {
  it('estimates savings as baseline minus actual, using a consistent chars-per-token heuristic', () => {
    // actual context: 400 chars -> ~100 tokens
    // baseline: two files totaling 4000 bytes -> ~1000 tokens
    const result = estimateSavingsFromSizes(400, [2000, 2000]);
    expect(result.actualTokens).toBe(100);
    expect(result.baselineTokens).toBe(1000);
    expect(result.savedTokens).toBe(900);
  });

  it('never reports negative savings when the graphify context is larger than the "baseline"', () => {
    const result = estimateSavingsFromSizes(10000, [100]);
    expect(result.savedTokens).toBe(0);
  });

  it('handles an empty file list as zero baseline', () => {
    const result = estimateSavingsFromSizes(400, []);
    expect(result.baselineTokens).toBe(0);
    expect(result.savedTokens).toBe(0);
  });
});
