import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { branchOrbitalObjects, capPlanetScaleForSun, clampPlanetScale, clampZoomDistance, focusCompositionTarget, galaxyAccentPalette, homeCameraDistance, initialPlanetAngle, orbitCameraPosition, projectOrbitalVisible, SceneLoop, sceneQualityProfile, rendererPixelRatio } from './galaxy-scene';

describe('rendererPixelRatio', () => {
  it('caps high-density displays while preserving lower ratios', () => {
    expect(rendererPixelRatio(1)).toBe(1);
    expect(rendererPixelRatio(2)).toBe(1.5);
    expect(rendererPixelRatio(0)).toBe(1);
  });
});

describe('homeCameraDistance', () => {
  it('keeps the full outer orbit in frame across wide and narrow panes', () => {
    expect(homeCameraDistance(6.2, 1.5)).toBeCloseTo(14.136);
    expect(homeCameraDistance(6.2, 0.7)).toBeCloseTo(16.43);
  });
});

describe('camera navigation', () => {
  it('clamps zoom so the camera cannot enter the sun or lose the system', () => {
    expect(clampZoomDistance(5, 6.2)).toBeCloseTo(7.44);
    expect(clampZoomDistance(50, 6.2)).toBeCloseTo(24.8);
  });

  it('orbits the camera around the system center', () => {
    expect(orbitCameraPosition(10, 0, 0).toArray()).toEqual([0, 0, 10]);
    const quarterTurn = orbitCameraPosition(10, Math.PI / 2, 0);
    expect(quarterTurn.x).toBeCloseTo(10);
    expect(quarterTurn.z).toBeCloseTo(0);
  });

  it('frames a focused planet to the left of the side inspector', () => {
    const planet = new THREE.Vector3(0, 0, 0);
    const camera = new THREE.Vector3(0, 0, 5);

    expect(focusCompositionTarget(planet, camera, 0.8).toArray()).toEqual([0.8, 0, 0]);
  });
});

describe('planet presentation', () => {
  it('keeps a foreground planet visually smaller than the sun', () => {
    expect(capPlanetScaleForSun(0.82, 8, 14, 1)).toBeCloseTo(0.5369, 3);
    expect(capPlanetScaleForSun(0.62, 18, 14, 1)).toBe(1);
  });

  it('starts a two-planet system to either side instead of directly in front of the sun', () => {
    expect(initialPlanetAngle(0, 2)).toBeCloseTo(-0.3);
    expect(initialPlanetAngle(1, 2)).toBeCloseTo(Math.PI - 0.3);
  });

  it('keeps manual planet resizing within the supported visual range', () => {
    expect(clampPlanetScale(0.2)).toBe(0.65);
    expect(clampPlanetScale(0.94)).toBe(0.94);
    expect(clampPlanetScale(2)).toBe(1.18);
  });
});

describe('branch orbitals', () => {
  it('uses moons for local branches and satellites for remote-only branches', () => {
    expect(branchOrbitalObjects([
      { name: 'main', location: 'both', stale: false },
      { name: 'feature/moons', location: 'local', stale: false },
      { name: 'origin/archive', location: 'remote', stale: true },
    ])).toEqual([
      expect.objectContaining({ name: 'main', kind: 'moon' }),
      expect.objectContaining({ name: 'feature/moons', kind: 'moon' }),
      expect.objectContaining({ name: 'origin/archive', kind: 'satellite' }),
    ]);
  });

  it('caps visual orbiters while reporting the complete branch count', () => {
    const branches = Array.from({ length: 18 }, (_, index) => ({
      name: `branch-${index}`,
      location: (index % 3 === 0 ? 'remote' : 'local') as 'remote' | 'local',
      stale: false,
    }));
    const objects = branchOrbitalObjects(branches);
    expect(objects).toHaveLength(12);
    expect(objects.every((object) => object.totalBranches === 18)).toBe(true);
  });

  it('resolves moon and satellite visibility independently for each planet', () => {
    const entry = {
      id: 'frontend', name: 'Frontend', path: '/work/frontend', hue: 220,
      graphPath: null, importedAt: '2026-08-25T00:00:00.000Z',
      showBranchMoons: false, showBranchSatellites: true,
    };

    expect(projectOrbitalVisible(entry, 'moon')).toBe(false);
    expect(projectOrbitalVisible(entry, 'satellite')).toBe(true);
    expect(projectOrbitalVisible({ ...entry, showBranchMoons: undefined }, 'moon')).toBe(true);
  });
});

describe('scene quality', () => {
  it('uses a materially lighter render profile in minimal mode', () => {
    const minimal = sceneQualityProfile('minimal');
    const cinematic = sceneQualityProfile('cinematic');
    expect(minimal.starCount).toBeLessThan(cinematic.starCount / 2);
    expect(minimal.planetSegments).toBeLessThan(cinematic.planetSegments);
    expect(minimal.nebulae).toBe(false);
    expect(minimal.shootingStars).toBe(false);
    expect(minimal.pixelRatioCap).toBe(1);
  });
});

describe('galaxy accent', () => {
  it('normalizes the chosen hue and derives coordinated scene colors', () => {
    expect(galaxyAccentPalette(390)).toEqual({ base: 30, dust: 48, nebulae: [30, 78, 342] });
  });
});

describe('SceneLoop', () => {
  it('starts once and cancels its pending frame when stopped', () => {
    const callbacks: FrameRequestCallback[] = [];
    const request = vi.fn((callback: FrameRequestCallback) => {
      callbacks.push(callback);
      return callbacks.length;
    });
    const cancel = vi.fn();
    const loop = new SceneLoop(request, cancel);
    const render = vi.fn();

    loop.start(render);
    loop.start(render);

    expect(request).toHaveBeenCalledTimes(1);
    callbacks[0](16);
    expect(render).toHaveBeenCalledWith(16);
    expect(request).toHaveBeenCalledTimes(2);

    loop.stop();
    expect(cancel).toHaveBeenCalledWith(2);
    expect(loop.isRunning()).toBe(false);
  });
});
