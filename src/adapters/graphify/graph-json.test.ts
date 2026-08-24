import { describe, it, expect } from 'vitest';
import * as path from 'node:path';
import { parseGraphJson, nodesByCommunity } from './graph-json';

const FIXTURE = path.join(import.meta.dirname, '../../testing/fixtures/graphify/small-graph.json');

describe('parseGraphJson', () => {
  it('parses nodes and links (as edges) matching the real graphify schema', async () => {
    const graph = await parseGraphJson(FIXTURE);
    expect(graph.nodes).toHaveLength(3);
    expect(graph.edges).toHaveLength(2);
  });

  it('builds a working id lookup map', async () => {
    const graph = await parseGraphJson(FIXTURE);
    expect(graph.nodesById.get('a_foo')?.label).toBe('Foo');
    expect(graph.nodesById.get('nonexistent')).toBeUndefined();
  });

  it('groups nodes by community', async () => {
    const graph = await parseGraphJson(FIXTURE);
    expect(nodesByCommunity(graph, 0)).toHaveLength(2);
    expect(nodesByCommunity(graph, 1)).toHaveLength(1);
  });
});
