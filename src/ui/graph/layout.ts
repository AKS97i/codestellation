import type { GraphNode } from '../../adapters/graphify/types';

export interface LayoutPoint {
  x: number;
  y: number;
}

export interface LayoutResult {
  positions: Map<string, LayoutPoint>;
  communities: LayoutCommunity[];
  renderedCount: number;
  totalCount: number;
}

export interface LayoutCommunity extends LayoutPoint {
  id: number;
  radius: number;
  nodeCount: number;
  label: string;
}

// The golden angle. Placing point i at (angle = i * GOLDEN_ANGLE, radius =
// sqrt(i)) is the standard "sunflower seed" construction for an even but
// organic-looking fill of a disk, with no two points ever landing on the
// same ray from the center. Used for filling each community's own disk.
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

export function compactCommunityLabel(label: string, maxLength = 20): string {
  const leaf = (label.split(/[\\/]/).pop() || label).replace(/\.[a-z0-9]+$/i, '');
  const words = leaf
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'Community';
  let result = words[0];
  for (const word of words.slice(1)) {
    if (`${result} ${word}`.length > maxLength) return `${result}…`;
    result += ` ${word}`;
  }
  return result.length > maxLength ? `${result.slice(0, maxLength - 1)}…` : result;
}

/**
 * A real force-directed simulation over thousands of nodes needs level-
 * of-detail engineering to hold 60fps (see the implementation plan's R12)
 * — that's a much bigger undertaking than fits alongside everything else
 * built this pass. This is the honest, cheaper alternative: a
 * deterministic O(n) layout.
 *
 * First version placed community centers on a spiral whose radius grew
 * with sqrt(community index), while each community's own disk radius
 * grew with sqrt(node count) independently. Those two scales weren't
 * related to each other at all — a handful of large communities near the
 * spiral's center had disks far bigger than the gap between them, so
 * everything overlapped into one shapeless blob (exactly what showed up
 * in testing). This version fixes that by deriving both from the same
 * budget: lay communities out on a grid sized to fit them all, then cap
 * each community's own disk radius to what actually fits in its cell,
 * so clusters can never bleed into their neighbors regardless of size.
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
  const layoutCommunities: LayoutCommunity[] = [];
  if (communities.length === 0) return { positions, communities: layoutCommunities, renderedCount: 0, totalCount };

  // The grid must be sized to how many communities will ACTUALLY get a
  // node rendered under maxNodes, not the full community count. Sizing it
  // from `communities.length` (e.g. 365 on a real 5511-node graph) when
  // the largest ~25 communities alone already exhaust a 1500-node cap
  // meant almost the entire grid went unused — everything landed in the
  // first row or two, which is exactly the squashed horizontal smear that
  // showed up in testing.
  let includedCommunities = 0;
  let budget = maxNodes;
  for (const [, communityNodes] of communities) {
    if (budget <= 0) break;
    includedCommunities++;
    budget -= communityNodes.length;
  }

  const cols = Math.ceil(Math.sqrt(includedCommunities));
  const rows = Math.ceil(includedCommunities / cols);
  const cellW = opts.width / cols;
  const cellH = opts.height / rows;
  // the cap that keeps a community's own fill from reaching its cell edge
  const maxDiskRadius = Math.min(cellW, cellH) * 0.42;

  let rendered = 0;
  outer: for (let ci = 0; ci < communities.length; ci++) {
    const [communityId, communityNodes] = communities[ci];
    const col = ci % cols;
    const row = Math.floor(ci / cols);
    const stagger = row % 2 === 1 ? Math.min(cellW * 0.12, 18) : 0;
    const communityCx = Math.min(opts.width - cellW * 0.45, cellW * (col + 0.5) + stagger);
    const communityCy = cellH * (row + 0.5);

    // sqrt-scaled toward the cap, so a 5-node community sits tight and a
    // 500-node community fills its whole cell, but neither ever exceeds it
    const fillFraction = Math.min(1, Math.sqrt(communityNodes.length) / 12);
    const diskRadius = Math.max(4, maxDiskRadius * fillFraction);
    layoutCommunities.push({
      id: communityId,
      x: communityCx,
      y: communityCy,
      radius: diskRadius,
      nodeCount: communityNodes.length,
      label: compactCommunityLabel(communityNodes[0]?.community_name || `Community ${communityId}`),
    });

    for (let ni = 0; ni < communityNodes.length; ni++) {
      if (rendered >= maxNodes) break outer;
      const angle = ni * GOLDEN_ANGLE;
      const t = Math.sqrt((ni + 1) / communityNodes.length); // 0..1, sunflower radial term
      const radius = diskRadius * t;
      positions.set(communityNodes[ni].id, {
        x: communityCx + Math.cos(angle) * radius,
        y: communityCy + Math.sin(angle) * radius,
      });
      rendered++;
    }
  }

  return { positions, communities: layoutCommunities, renderedCount: rendered, totalCount };
}
