import { describe, expect, it } from 'vitest';
import type { RegistryEntry } from '../../domain/project-registry';
import { createPlanetIdentity, planetRadiusFromGraph } from './planet-identity';

const tradefox: RegistryEntry = {
  id: 'tradefox',
  name: 'Tradefox',
  path: '/projects/Tradefox',
  hue: 24,
  graphPath: null,
  importedAt: '2026-08-25T00:00:00.000Z',
};

describe('createPlanetIdentity', () => {
  it('keeps a project visually stable across scene rebuilds', () => {
    expect(createPlanetIdentity(tradefox, 0)).toEqual(createPlanetIdentity(tradefox, 0));
  });

  it('assigns bounded celestial properties and separates neighboring orbit planes', () => {
    const first = createPlanetIdentity(tradefox, 0);
    const second = createPlanetIdentity({ ...tradefox, id: 'hr-portal', hue: 207 }, 1);

    expect(first.radius).toBeGreaterThanOrEqual(0.48);
    expect(first.radius).toBeLessThan(0.88);
    expect(first.orbitRadius).toBe(3.4);
    expect(second.orbitRadius).toBe(5.35);
    expect(first.orbitTilt).not.toBe(second.orbitTilt);
    expect(first.speed).toBeGreaterThan(0);
    expect(first.surfaceHue).toBe(24);
    expect(second.surfaceHue).toBe(207);
    expect(first.hasLife).toBe(false);
    expect(second.hasLife).toBe(true);
  });

  it('compresses graph node counts into visibly different planet sizes below the sun', () => {
    expect(planetRadiusFromGraph(10)).toBeCloseTo(0.5685, 3);
    expect(planetRadiusFromGraph(5_000)).toBeCloseTo(0.7944, 3);
    expect(planetRadiusFromGraph(100_000)).toBe(0.82);
    expect(createPlanetIdentity(tradefox, 0, 5_000).radius).toBeCloseTo(0.7944, 3);
  });

  it('derives different procedural seeds from different project ids', () => {
    const first = createPlanetIdentity(tradefox, 0);
    const second = createPlanetIdentity({ ...tradefox, id: 'hr-portal' }, 0);

    expect(first.seed).not.toBe(second.seed);
  });

  it('uses an explicit living-world choice instead of the default slot rule', () => {
    expect(createPlanetIdentity({ ...tradefox, hasLife: true }, 0).hasLife).toBe(true);
    expect(createPlanetIdentity({ ...tradefox, hasLife: false }, 1).hasLife).toBe(false);
  });
});
