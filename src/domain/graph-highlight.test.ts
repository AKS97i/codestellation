import { describe, it, expect } from 'vitest';
import { resolveTouchedFileToNodeIds } from './graph-highlight';
import type { ParsedGraph } from '../adapters/graphify/types';

function graph(nodes: { id: string; source_file?: string }[]): ParsedGraph {
  return { nodes: nodes.map((n) => ({ id: n.id, label: n.id, source_file: n.source_file })), edges: [], nodesById: new Map() };
}

describe('resolveTouchedFileToNodeIds', () => {
  it('matches a node whose source_file equals the path relative to the project root', () => {
    const g = graph([{ id: 'n1', source_file: 'src/foo.ts' }]);
    expect(resolveTouchedFileToNodeIds(g, '/proj', '/proj/src/foo.ts')).toEqual(['n1']);
  });

  it('returns every node backed by the same file', () => {
    const g = graph([{ id: 'n1', source_file: 'src/foo.ts' }, { id: 'n2', source_file: 'src/foo.ts' }, { id: 'n3', source_file: 'src/bar.ts' }]);
    expect(resolveTouchedFileToNodeIds(g, '/proj', '/proj/src/foo.ts').sort()).toEqual(['n1', 'n2']);
  });

  it('returns nothing for a file outside the project root', () => {
    const g = graph([{ id: 'n1', source_file: 'src/foo.ts' }]);
    expect(resolveTouchedFileToNodeIds(g, '/proj', '/somewhere/else/foo.ts')).toEqual([]);
  });

  it('returns nothing when no node matches', () => {
    const g = graph([{ id: 'n1', source_file: 'src/foo.ts' }]);
    expect(resolveTouchedFileToNodeIds(g, '/proj', '/proj/src/unrelated.ts')).toEqual([]);
  });
});
