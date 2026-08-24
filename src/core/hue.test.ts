import { describe, it, expect } from 'vitest';
import { hueFromId, hueToHex, hexToHue } from './hue';

describe('hueFromId', () => {
  it('is deterministic — same id always produces the same hue', () => {
    expect(hueFromId('acme-lms')).toBe(hueFromId('acme-lms'));
  });

  it('produces a value in the valid hue range', () => {
    for (const id of ['a', 'acme-lms', 'clinic-os', '', 'a-very-long-project-id-with-many-characters']) {
      const hue = hueFromId(id);
      expect(hue).toBeGreaterThanOrEqual(0);
      expect(hue).toBeLessThan(360);
    }
  });

  it('spreads distinct ids across different hues (not a constant)', () => {
    const hues = new Set(['acme-lms', 'clinic-os', 'neura-os', 'widget-portal', 'examplewebsite'].map(hueFromId));
    expect(hues.size).toBeGreaterThan(1);
  });
});

describe('hueToHex / hexToHue round trip', () => {
  it('round-trips within a couple degrees for known hues (rounding is lossy, not broken)', () => {
    for (const hue of [0, 60, 120, 180, 240, 300, 139]) {
      const hex = hueToHex(hue);
      const back = hexToHue(hex);
      const diff = Math.min(Math.abs(back - hue), 360 - Math.abs(back - hue));
      expect(diff).toBeLessThanOrEqual(2);
    }
  });

  it('produces a valid 6-digit hex string', () => {
    expect(hueToHex(139)).toMatch(/^#[0-9a-f]{6}$/);
  });
});
