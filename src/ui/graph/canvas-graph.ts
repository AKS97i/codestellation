import type { ParsedGraph } from '../../adapters/graphify/types';
import { computeRadialLayout, type LayoutPoint } from './layout';

const NODE_RADIUS = 3;
const HIGHLIGHT_RADIUS = 7;
const HIGHLIGHT_DURATION_MS = 1400;

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
    ctx.save();
    ctx.translate(this.offsetX, this.offsetY);
    ctx.scale(this.scale, this.scale);

    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1 / this.scale;
    for (const edge of this.graph.edges) {
      const a = this.positions.get(edge.source);
      const b = this.positions.get(edge.target);
      if (!a || !b) continue;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    const highlightedIds = new Set(this.highlights.map((h) => h.nodeId));
    ctx.fillStyle = 'rgba(224,71,44,0.85)';
    for (const node of this.graph.nodes) {
      const p = this.positions.get(node.id);
      if (!p) continue;
      if (highlightedIds.has(node.id)) continue; // drawn in the pass below, on top
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, NODE_RADIUS / this.scale, 0, Math.PI * 2);
      ctx.fill();
    }

    const now = Date.now();
    for (const h of this.highlights) {
      const p = this.positions.get(h.nodeId);
      if (!p) continue;
      const age = (now - h.startedAt) / HIGHLIGHT_DURATION_MS;
      const alpha = Math.max(0, 1 - age);
      ctx.fillStyle = `rgba(224,71,44,${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, HIGHLIGHT_RADIUS / this.scale, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  destroy() {
    this.disposed = true;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }
}
