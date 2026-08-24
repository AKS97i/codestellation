import * as fs from 'node:fs/promises';
import type { ParsedGraph, GraphNode, GraphEdge } from './types';

/**
 * Parses a graphify graph.json file. The real file can be several MB
 * (6.9MB / 5511 nodes on the Acme project observed during research),
 * so this reads it whole but builds the id-lookup map once here rather
 * than making every caller do their own O(n) scan.
 */
export async function parseGraphJson(filePath: string): Promise<ParsedGraph> {
  const raw = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(raw);

  const nodes: GraphNode[] = Array.isArray(data.nodes) ? data.nodes : [];
  const edges: GraphEdge[] = Array.isArray(data.links) ? data.links : [];
  const nodesById = new Map(nodes.map((n) => [n.id, n]));

  return { nodes, edges, nodesById };
}

/** Nodes belonging to a given community — the aggregation unit graphify itself uses above 5000 nodes (see Decision 6: community-level export by default). */
export function nodesByCommunity(graph: ParsedGraph, community: number): GraphNode[] {
  return graph.nodes.filter((n) => n.community === community);
}
