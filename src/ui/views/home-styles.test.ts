import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('selected project layer styles', () => {
  it('places the active project layer and Back button above the top bar', () => {
    const css = readFileSync(new URL('../../../styles.css', import.meta.url), 'utf8');
    const topbarZ = Number(css.match(/\.cs-topbar\s*\{[^}]*z-index:\s*(\d+)/)?.[1] ?? 0);
    const stageZ = Number(css.match(/\.cs-hub-stage\.is-active\s*\{[^}]*z-index:\s*(\d+)/)?.[1] ?? 0);

    expect(stageZ).toBeGreaterThan(topbarZ);
  });

  it('layers interactive project controls above the full-bleed WebGL canvas', () => {
    const css = readFileSync(new URL('../../../styles.css', import.meta.url), 'utf8');
    const canvasRule = css.match(/\.cs-galaxy-canvas\s*\{([^}]*)\}/)?.[1] ?? '';
    const labelRule = css.match(/\.cs-celestial-labels\s*\{([^}]*)\}/)?.[1] ?? '';
    const targetRule = css.match(/\.cs-celestial-target\s*\{([^}]*)\}/)?.[1] ?? '';

    expect(canvasRule).toContain('position: absolute');
    expect(canvasRule).toContain('inset: 0');
    expect(labelRule).toContain('pointer-events: none');
    expect(targetRule).toContain('pointer-events: auto');
  });

  it('uses a right-side translucent inspector instead of a centered modal', () => {
    const css = readFileSync(new URL('../../../styles.css', import.meta.url), 'utf8');
    const inspectorRule = css.match(/\.cs-hub-content\.cs-world-inspector\s*\{([^}]*)\}/)?.[1] ?? '';
    const visibleRule = css.match(/\.cs-hub-content\.cs-world-inspector\.is-visible\s*\{([^}]*)\}/)?.[1] ?? '';

    expect(inspectorRule).toContain('left: auto');
    expect(inspectorRule).toContain('right:');
    expect(inspectorRule).toContain('backdrop-filter: blur');
    expect(inspectorRule).toContain('translateX');
    expect(visibleRule).toContain('translateX(0)');
    expect(visibleRule).not.toContain('-50%');
  });

  it('keeps the galaxy at full brightness while the inspector is open', () => {
    const css = readFileSync(new URL('../../../styles.css', import.meta.url), 'utf8');
    const backgroundRule = css.match(/\.cs-galaxy-wrap\.is-backgrounded\s*\{([^}]*)\}/)?.[1] ?? '';
    const legacySolarRule = css.match(/\.cs-solar-wrap\.is-backgrounded\s*\{([^}]*)\}/)?.[1] ?? '';

    expect(backgroundRule).toContain('filter: none');
    expect(backgroundRule).not.toContain('brightness(');
    expect(legacySolarRule).toContain('filter: none');
    expect(legacySolarRule).not.toContain('brightness(');
  });
});
