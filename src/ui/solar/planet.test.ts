import { describe, expect, it } from 'vitest';
import { planetAngleForIndex, projectMark } from './planet';

describe('projectMark', () => {
  it('creates a compact two-letter mark from a project name', () => {
    expect(projectMark('Tradefox')).toBe('TR');
    expect(projectMark('HR Portal')).toBe('HP');
    expect(projectMark('agentic-os')).toBe('AO');
  });
});

describe('planetAngleForIndex', () => {
  it('spaces projects evenly around the orbit', () => {
    expect(planetAngleForIndex(0, 2)).toBeCloseTo(-Math.PI / 2);
    expect(planetAngleForIndex(1, 2)).toBeCloseTo(Math.PI / 2);
  });
});
