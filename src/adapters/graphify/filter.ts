import type { ParsedGraph, GraphNode, GraphEdge } from './types';

export interface FilteredGraph {
  directed: boolean;
  multigraph: boolean;
  graph: Record<string, unknown>;
  nodes: GraphNode[];
  links: GraphEdge[];
  hyperedges: unknown[];
}

/**
 * Keeps whole communities (largest first) until adding the next one would
 * exceed `maxNodes` — never splits a community in half, since a partial
 * community would be more confusing than a smaller-but-coherent graph.
 * Verified against real graphify output that `graphify export obsidian
 * --graph <filtered.json>` accepts this exact node-link shape.
 */
export function filterToTopCommunities(graph: ParsedGraph, maxNodes: number): FilteredGraph {
  const sizeByCommunity = new Map<number, number>();
  for (const node of graph.nodes) {
    const c = node.community ?? -1;
    sizeByCommunity.set(c, (sizeByCommunity.get(c) ?? 0) + 1);
  }

  const communitiesLargestFirst = Array.from(sizeByCommunity.entries()).sort((a, b) => b[1] - a[1]);

  const keptCommunities = new Set<number>();
  let total = 0;
  for (const [community, size] of communitiesLargestFirst) {
    if (total > 0 && total + size > maxNodes) break; // always keep at least one community, even if it alone exceeds maxNodes
    keptCommunities.add(community);
    total += size;
  }

  const keptNodes = graph.nodes.filter((n) => keptCommunities.has(n.community ?? -1));
  const keptIds = new Set(keptNodes.map((n) => n.id));
  const keptEdges = graph.edges.filter((e) => keptIds.has(e.source) && keptIds.has(e.target));

  return { directed: true, multigraph: false, graph: {}, nodes: keptNodes, links: keptEdges, hyperedges: [] };
}
