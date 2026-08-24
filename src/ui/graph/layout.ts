import type { GraphNode } from '../../adapters/graphify/types';

export interface LayoutPoint {
  x: number;
  y: number;
}

export interface LayoutResult {
  positions: Map<string, LayoutPoint>;
  renderedCount: number;
  totalCount: number;
}

/**
 * A real force-directed simulation over thousands of nodes needs level-
 * of-detail engineering to hold 60fps (see the implementation plan's R12)
 * — that's a much bigger undertaking than fits alongside everything else
 * built this pass. This is the honest, cheaper alternative: a
 * deterministic O(n) radial layout, communities arranged on an outer
 * ring and each community's own nodes on an inner ring around its
 * center. No iteration, no jitter, same result every render — cheap
 * enough that the only remaining cap is a hard node-count ceiling for
 * render performance, which is surfaced to the caller (renderedCount vs
 * totalCount) rather than silently dropped.
 */
export function computeRadialLayout(nodes: GraphNode[], opts: { width: number; height: number; maxNodes?: number }): LayoutResult {
  const maxNodes = opts.maxNodes ?? 1500;
  const totalCount = nodes.length;

  const byCommunity = new Map<number, GraphNode[]>();
  for (const node of nodes) {
    const c = node.community ?? -1;
    const list = byCommunity.get(c) ?? [];
    list.push(node);
    byCommunity.set(c, list);
  }

  // largest communities first, so truncation drops the long tail of tiny
  // communities rather than gutting the graph's largest, most-visited areas
  const communities = Array.from(byCommunity.entries()).sort((a, b) => b[1].length - a[1].length);

  const positions = new Map<string, LayoutPoint>();
  const cx = opts.width / 2;
  const cy = opts.height / 2;
  const outerRadius = Math.min(opts.width, opts.height) * 0.4;

  let rendered = 0;
  outer: for (let ci = 0; ci < communities.length; ci++) {
    const [, communityNodes] = communities[ci];
    const communityAngle = (ci / communities.length) * Math.PI * 2;
    const communityCx = cx + Math.cos(communityAngle) * outerRadius;
    const communityCy = cy + Math.sin(communityAngle) * outerRadius;
    const innerRadius = 12 + Math.sqrt(communityNodes.length) * 6;

    for (let ni = 0; ni < communityNodes.length; ni++) {
      if (rendered >= maxNodes) break outer;
      const angle = (ni / communityNodes.length) * Math.PI * 2;
      positions.set(communityNodes[ni].id, {
        x: communityCx + Math.cos(angle) * innerRadius,
        y: communityCy + Math.sin(angle) * innerRadius,
      });
      rendered++;
    }
  }

  return { positions, renderedCount: rendered, totalCount };
}
