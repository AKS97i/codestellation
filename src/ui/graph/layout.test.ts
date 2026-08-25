import { describe, it, expect } from 'vitest';
import { compactCommunityLabel, computeRadialLayout } from './layout';
import type { GraphNode } from '../../adapters/graphify/types';

function node(id: string, community: number): GraphNode {
  return { id, label: id, community };
}

describe('computeRadialLayout', () => {
  it('positions every node when under the cap', () => {
    const nodes = [node('a', 0), node('b', 0), node('c', 1)];
    const result = computeRadialLayout(nodes, { width: 400, height: 400 });
    expect(result.renderedCount).toBe(3);
    expect(result.totalCount).toBe(3);
    expect(result.positions.size).toBe(3);
    expect(result.communities).toHaveLength(2);
    expect(result.communities.every((community) => community.radius > 0)).toBe(true);
  });

  it('caps rendered nodes and reports the true total when over the cap', () => {
    const nodes = Array.from({ length: 10 }, (_, i) => node(`n${i}`, 0));
    const result = computeRadialLayout(nodes, { width: 400, height: 400, maxNodes: 4 });
    expect(result.renderedCount).toBe(4);
    expect(result.totalCount).toBe(10);
    expect(result.positions.size).toBe(4);
  });

  it('gives every rendered node a finite, distinct-ish position', () => {
    const nodes = [node('a', 0), node('b', 1), node('c', 2)];
    const result = computeRadialLayout(nodes, { width: 400, height: 400 });
    for (const p of result.positions.values()) {
      expect(Number.isFinite(p.x)).toBe(true);
      expect(Number.isFinite(p.y)).toBe(true);
    }
  });

  it('renders the largest communities first when truncating', () => {
    const nodes = [
      ...Array.from({ length: 2 }, (_, i) => node(`big${i}`, 0)),
      ...Array.from({ length: 5 }, (_, i) => node(`small${i}`, 1)),
    ];
    // community 1 (5 nodes) sorts before community 0 (2 nodes); cap at 5
    // should fully include community 1 and drop community 0 entirely
    const result = computeRadialLayout(nodes, { width: 400, height: 400, maxNodes: 5 });
    expect(result.positions.has('small0')).toBe(true);
    expect(result.positions.has('big0')).toBe(false);
  });
});

describe('compactCommunityLabel', () => {
  it('turns long generated community names into short readable labels', () => {
    expect(compactCommunityLabel('SetupSubscriptionStepsJsonInstituteController')).toBe('Setup Subscription…');
    expect(compactCommunityLabel('src/controllers/PaymentsController.ts')).toBe('Payments Controller');
  });

  it('keeps already concise names intact', () => {
    expect(compactCommunityLabel('RootState')).toBe('Root State');
  });
});
