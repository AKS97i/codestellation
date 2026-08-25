import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('selected project layer styles', () => {
  it('places the active project layer and Back button above the top bar', () => {
    const css = readFileSync(new URL('../../../styles.css', import.meta.url), 'utf8');
    const topbarZ = Number(css.match(/\.cs-topbar\s*\{[^}]*z-index:\s*(\d+)/)?.[1] ?? 0);
    const stageZ = Number(css.match(/\.cs-hub-stage\.is-active\s*\{[^}]*z-index:\s*(\d+)/)?.[1] ?? 0);

    expect(stageZ).toBeGreaterThan(topbarZ);
  });
});
