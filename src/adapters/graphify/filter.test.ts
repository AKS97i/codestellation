import { describe, it, expect } from 'vitest';
import { filterToTopCommunities } from './filter';
import type { ParsedGraph } from './types';

function makeGraph(communitySizes: number[]): ParsedGraph {
  const nodes = [];
  let id = 0;
  for (let c = 0; c < communitySizes.length; c++) {
    for (let i = 0; i < communitySizes[c]; i++) {
      nodes.push({ id: `n${id++}`, label: `Node ${id}`, community: c });
    }
  }
  return { nodes, edges: [], nodesById: new Map(nodes.map((n) => [n.id, n])) };
}

describe('filterToTopCommunities', () => {
  it('keeps whole communities, largest first, until the node budget is used', () => {
    // communities of size 50, 30, 10, 5 — budget 90 should keep 50+30=80, stop before +10=90 exceeds? no 80+10=90 is exactly budget, keep it too
    const graph = makeGraph([50, 30, 10, 5]);
    const filtered = filterToTopCommunities(graph, 90);
    expect(filtered.nodes).toHaveLength(90); // 50 + 30 + 10
  });

  it('never splits a community even if the very first one exceeds the budget', () => {
    const graph = makeGraph([500, 10]);
    const filtered = filterToTopCommunities(graph, 100);
    expect(filtered.nodes).toHaveLength(500); // the single largest community, kept whole
  });

  it('drops edges whose endpoints are no longer both present', () => {
    const graph: ParsedGraph = {
      nodes: [
        { id: 'a', label: 'A', community: 0 },
        { id: 'b', label: 'B', community: 0 },
        { id: 'c', label: 'C', community: 1 },
      ],
      edges: [
        { source: 'a', target: 'b', relation: 'calls' }, // both kept
        { source: 'a', target: 'c', relation: 'calls' }, // c dropped -> edge dropped
      ],
      nodesById: new Map(),
    };
    const filtered = filterToTopCommunities(graph, 2); // budget only fits community 0
    expect(filtered.nodes.map((n) => n.id)).toEqual(['a', 'b']);
    expect(filtered.links).toHaveLength(1);
    expect(filtered.links[0]).toMatchObject({ source: 'a', target: 'b' });
  });
});
