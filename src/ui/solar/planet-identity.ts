import type { RegistryEntry } from '../../domain/project-registry';

export interface PlanetIdentity {
  seed: number;
  radius: number;
  orbitRadius: number;
  orbitTilt: number;
  speed: number;
  axialTilt: number;
  surfaceHue: number;
  atmosphereHue: number;
  hasRings: boolean;
  hasLife: boolean;
}

function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index++) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededUnit(seed: number, salt: number): number {
  let value = (seed + Math.imul(salt, 0x9e3779b9)) >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 0x21f0aaad);
  value ^= value >>> 15;
  value = Math.imul(value, 0x735a2d97);
  value ^= value >>> 15;
  return (value >>> 0) / 0xffffffff;
}

export function planetRadiusFromGraph(nodeCount: number): number {
  const normalized = Math.min(1, Math.log10(Math.max(0, nodeCount) + 1) / Math.log10(10_001));
  return Math.min(0.82, 0.48 + normalized * 0.34);
}

export function createPlanetIdentity(entry: RegistryEntry, index: number, graphNodeCount?: number): PlanetIdentity {
  const seed = hashString(entry.id);
  const safeIndex = Math.max(0, index);
  const surfaceHue = ((entry.hue % 360) + 360) % 360;

  return {
    seed,
    radius: graphNodeCount === undefined ? 0.48 + seededUnit(seed, 1) * 0.28 : planetRadiusFromGraph(graphNodeCount),
    orbitRadius: 3.4 + safeIndex * 1.95,
    orbitTilt: (-0.24 + (safeIndex % 3) * 0.2) + (seededUnit(seed, 2) - 0.5) * 0.08,
    speed: 0.055 + seededUnit(seed, 3) * 0.028,
    axialTilt: (seededUnit(seed, 4) - 0.5) * 0.72,
    surfaceHue,
    atmosphereHue: (surfaceHue + 18 + seededUnit(seed, 5) * 34) % 360,
    hasRings: seededUnit(seed, 6) > 0.63,
    hasLife: entry.hasLife ?? safeIndex % 3 === 1,
  };
}
