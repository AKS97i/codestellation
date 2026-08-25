import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('workspace layout styles', () => {
  it('clears the centered home-preview transform in document flow', () => {
    const css = readFileSync(new URL('../../../styles.css', import.meta.url), 'utf8');
    const workspaceRule = css.match(/\.cs-workspace-shell \.cs-hub-content\s*\{([^}]*)\}/)?.[1] ?? '';

    expect(workspaceRule).toContain('transform: none');
  });
});
