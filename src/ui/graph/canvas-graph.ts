import type { ParsedGraph } from '../../adapters/graphify/types';
import { computeRadialLayout, type LayoutPoint } from './layout';
import { hueFromId } from '../../core/hue';

const NODE_RADIUS = 2.6;
const HIGHLIGHT_RADIUS = 8;
const HIGHLIGHT_DURATION_MS = 1400;

/** Same hash-to-hue approach as the planet colors, so a project's graph and its planet feel like one visual system rather than two unrelated pieces of UI. Community index (not node id) is the hash input, so every node in a community reads as one visual cluster. */
function communityColor(community: number | undefined, alpha: number): string {
  const hue = hueFromId(String(community ?? 'none'));
  return `hsla(${hue}, 70%, 68%, ${alpha})`;
}

interface HighlightState {
  nodeId: string;
  startedAt: number;
}

/**
 * A plain canvas 2D renderer — pan (drag) and zoom (wheel), a cheap
 * deterministic layout (see layout.ts for why not a physics sim), and a
 * highlight API for Phase 9's live-session hookup. Redraws only on
 * interaction or an active highlight animation, not a continuous rAF
 * loop, so an idle graph tab costs nothing (same "don't animate what
 * nobody's looking at" principle the orbit engine already follows).
 */
export class CanvasGraph {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private positions: Map<string, LayoutPoint>;
  private graph: ParsedGraph;
  private renderedCount: number;
  private totalCount: number;

  private offsetX = 0;
  private offsetY = 0;
  private scale = 1;
  private dragging = false;
  private lastDragX = 0;
  private lastDragY = 0;

  private highlights: HighlightState[] = [];
  private rafId: number | null = null;
  private disposed = false;
  private degreeCache: Map<string, number>;

  constructor(container: HTMLElement, graph: ParsedGraph) {
    this.graph = graph;
    const rect = container.getBoundingClientRect();
    const width = Math.max(rect.width, 300);
    const height = Math.max(rect.height, 300);

    this.canvas = container.createEl('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.cursor = 'grab';
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('canvas 2d context unavailable');
    this.ctx = ctx;

    const layout = computeRadialLayout(graph.nodes, { width, height });
    this.positions = layout.positions;
    this.renderedCount = layout.renderedCount;
    this.totalCount = layout.totalCount;

    // node size communicates degree (how connected it is) — a purely
    // cosmetic, one-time O(edges) pass, not a layout decision, so it
    // doesn't interact with the truncation logic in layout.ts
    this.degreeCache = new Map();
    for (const edge of graph.edges) {
      this.degreeCache.set(edge.source, (this.degreeCache.get(edge.source) ?? 0) + 1);
      this.degreeCache.set(edge.target, (this.degreeCache.get(edge.target) ?? 0) + 1);
    }

    this.bindInteraction();
    this.draw();
  }

  private bindInteraction() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.dragging = true;
      this.lastDragX = e.clientX;
      this.lastDragY = e.clientY;
      this.canvas.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', () => {
      this.dragging = false;
      this.canvas.style.cursor = 'grab';
    });
    window.addEventListener('mousemove', (e) => {
      if (!this.dragging) return;
      this.offsetX += e.clientX - this.lastDragX;
      this.offsetY += e.clientY - this.lastDragY;
      this.lastDragX = e.clientX;
      this.lastDragY = e.clientY;
      this.draw();
    });
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      this.scale = Math.min(8, Math.max(0.15, this.scale * factor));
      this.draw();
    }, { passive: false });
  }

  /** Truncation note for the panel to show above the canvas — never a silent drop. */
  getRenderStats() {
    return { renderedCount: this.renderedCount, totalCount: this.totalCount };
  }

  /** Pulses a node and its direct neighbors — called from the live-session watcher (see adapters/live-watch.ts) when a touched file resolves to a graph node. Silently no-ops for a node outside the rendered/truncated set, per the "no-match is silent, not wrong" rule from the implementation plan's Phase 9 section. */
  highlightNodes(nodeIds: string[]) {
    const now = Date.now();
    const neighborIds = new Set<string>();
    for (const id of nodeIds) {
      if (!this.positions.has(id)) continue;
      neighborIds.add(id);
      for (const edge of this.graph.edges) {
        if (edge.source === id) neighborIds.add(edge.target);
        if (edge.target === id) neighborIds.add(edge.source);
      }
    }
    for (const id of neighborIds) {
      if (this.positions.has(id)) this.highlights.push({ nodeId: id, startedAt: now });
    }
    if (neighborIds.size > 0) this.startAnimating();
  }

  private startAnimating() {
    if (this.rafId !== null) return;
    const tick = () => {
      const now = Date.now();
      this.highlights = this.highlights.filter((h) => now - h.startedAt < HIGHLIGHT_DURATION_MS);
      this.draw();
      if (this.highlights.length > 0 && !this.disposed) {
        this.rafId = requestAnimationFrame(tick);
      } else {
        this.rafId = null;
      }
    };
    this.rafId = requestAnimationFrame(tick);
  }

  private draw() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // a faint radial vignette instead of flat black — same "deep space"
    // language as the solar system, so the graph reads as part of one
    // visual system instead of a bare debug canvas
    const vignette = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.7
    );
    vignette.addColorStop(0, 'rgba(20,22,38,1)');
    vignette.addColorStop(1, 'rgba(5,6,15,1)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(this.offsetX, this.offsetY);
    ctx.scale(this.scale, this.scale);

    ctx.lineWidth = 0.6 / this.scale;
    for (const edge of this.graph.edges) {
      const a = this.positions.get(edge.source);
      const b = this.positions.get(edge.target);
      if (!a || !b) continue;
      ctx.strokeStyle = 'rgba(255,255,255,0.045)';
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    const highlightedIds = new Set(this.highlights.map((h) => h.nodeId));
    for (const node of this.graph.nodes) {
      const p = this.positions.get(node.id);
      if (!p) continue;
      if (highlightedIds.has(node.id)) continue; // drawn in the pass below, on top

      const degree = this.degreeCache.get(node.id) ?? 0;
      const radius = (NODE_RADIUS + Math.min(degree, 12) * 0.35) / this.scale;
      ctx.fillStyle = communityColor(node.community, 0.55);
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const now = Date.now();
    for (const h of this.highlights) {
      const p = this.positions.get(h.nodeId);
      if (!p) continue;
      const age = (now - h.startedAt) / HIGHLIGHT_DURATION_MS;
      const alpha = Math.max(0, 1 - age);
      const r = (HIGHLIGHT_RADIUS - age * 3) / this.scale;
      ctx.fillStyle = `rgba(255,201,120,${alpha})`;
      ctx.shadowColor = 'rgba(255,180,90,0.9)';
      ctx.shadowBlur = 12 / this.scale;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(r, 1), 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }

  destroy() {
    this.disposed = true;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }
}
