// Mirrors graphify's real graph.json output — a NetworkX node-link dump.
// Confirmed against /Users/repouser/Projects/Acme/graphify-out/graph.json
// (5511 nodes, 10843 links) during the implementation plan's research pass.

export interface GraphNode {
  id: string;
  label: string;
  norm_label?: string;
  community?: number;
  community_name?: string;
  file_type?: string;
  source_file?: string;
  source_location?: string;
  _origin?: string;
  _callable?: boolean;
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: string;
  confidence?: 'EXTRACTED' | 'INFERRED' | 'AMBIGUOUS';
  confidence_score?: number;
  context?: string;
  source_file?: string;
  source_location?: string;
  weight?: number;
}

export interface ParsedGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  nodesById: Map<string, GraphNode>;
}
