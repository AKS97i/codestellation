import type { ParsedGraph, GraphNode } from '../../adapters/graphify/types';
import { computeRadialLayout, type LayoutCommunity, type LayoutPoint } from './layout';
import { hueFromId } from '../../core/hue';

const NODE_RADIUS = 0.78;
const HIGHLIGHT_RADIUS = 6;
const HIGHLIGHT_DURATION_MS = 1400;
const VISIBLE_EDGE_BUDGET = 2200;
const VISIBLE_COMMUNITY_LABELS = 12;

function communityColor(community: number | undefined, alpha: number, lightness = 68): string {
  const hue = hueFromId(String(community ?? 'none'));
  return `hsla(${hue}, 76%, ${lightness}%, ${alpha})`;
}

interface HighlightState {
  nodeId: string;
  startedAt: number;
}

export class CanvasGraph {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly positions: Map<string, LayoutPoint>;
  private readonly communities: LayoutCommunity[];
  private readonly graph: ParsedGraph;
  private readonly renderedCount: number;
  private readonly totalCount: number;
  private readonly degreeCache = new Map<string, number>();
  private readonly tooltip: HTMLElement;
  private readonly width: number;
  private readonly height: number;
  private readonly pixelRatio: number;

  private offsetX = 0;
  private offsetY = 0;
  private scale = 1;
  private dragging = false;
  private lastDragX = 0;
  private lastDragY = 0;
  private hoveredNodeId: string | null = null;
  private selectedNodeId: string | null = null;
  private highlights: HighlightState[] = [];
  private rafId: number | null = null;
  private disposed = false;

  constructor(container: HTMLElement, graph: ParsedGraph) {
    this.graph = graph;
    container.classList.add('cs-graph-stage');
    const rect = container.getBoundingClientRect();
    this.width = Math.max(rect.width, 300);
    this.height = Math.max(rect.height, 300);
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas = container.createEl('canvas', { cls: 'cs-graph-canvas' });
    this.canvas.width = Math.round(this.width * this.pixelRatio);
    this.canvas.height = Math.round(this.height * this.pixelRatio);
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('canvas 2d context unavailable');
    this.ctx = ctx;

    const layout = computeRadialLayout(graph.nodes, { width: this.width, height: this.height });
    this.positions = layout.positions;
    this.communities = layout.communities;
    this.renderedCount = layout.renderedCount;
    this.totalCount = layout.totalCount;

    for (const edge of graph.edges) {
      this.degreeCache.set(edge.source, (this.degreeCache.get(edge.source) ?? 0) + 1);
      this.degreeCache.set(edge.target, (this.degreeCache.get(edge.target) ?? 0) + 1);
    }

    this.tooltip = container.createDiv({ cls: 'cs-graph-tooltip' });
    this.tooltip.hidden = true;
    const controls = container.createDiv({ cls: 'cs-graph-controls' });
    const zoomOut = controls.createEl('button', { cls: 'cs-graph-control', text: '−' });
    zoomOut.setAttribute('aria-label', 'Zoom graph out');
    const fit = controls.createEl('button', { cls: 'cs-graph-control cs-graph-control-fit', text: 'Fit' });
    fit.setAttribute('aria-label', 'Reset graph view');
    const zoomIn = controls.createEl('button', { cls: 'cs-graph-control', text: '+' });
    zoomIn.setAttribute('aria-label', 'Zoom graph in');
    zoomOut.addEventListener('click', () => this.zoomAround(this.width / 2, this.height / 2, 0.82));
    zoomIn.addEventListener('click', () => this.zoomAround(this.width / 2, this.height / 2, 1.2));
    fit.addEventListener('click', () => this.resetView());

    this.bindInteraction();
    this.draw();
  }

  private readonly onMouseUp = () => {
    this.dragging = false;
    this.canvas.classList.remove('is-dragging');
  };

  private readonly onMouseMove = (event: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (this.dragging) {
      this.offsetX += event.clientX - this.lastDragX;
      this.offsetY += event.clientY - this.lastDragY;
      this.lastDragX = event.clientX;
      this.lastDragY = event.clientY;
      this.hideTooltip();
      this.draw();
      return;
    }
    const node = this.findNodeAt(x, y);
    this.hoveredNodeId = node?.id ?? null;
    if (node) this.showTooltip(node, x, y);
    else this.hideTooltip();
    this.draw();
  };

  private bindInteraction() {
    this.canvas.addEventListener('mousedown', (event) => {
      this.dragging = true;
      this.lastDragX = event.clientX;
      this.lastDragY = event.clientY;
      this.canvas.classList.add('is-dragging');
    });
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mouseleave', () => {
      if (!this.dragging) {
        this.hoveredNodeId = null;
        this.hideTooltip();
        this.draw();
      }
    });
    this.canvas.addEventListener('click', (event) => {
      if (this.dragging) return;
      const rect = this.canvas.getBoundingClientRect();
      const node = this.findNodeAt(event.clientX - rect.left, event.clientY - rect.top);
      this.selectedNodeId = node?.id ?? null;
      if (node) this.highlightNodes([node.id]);
      this.draw();
    });
    this.canvas.addEventListener('dblclick', () => this.resetView());
    this.canvas.addEventListener('wheel', (event) => {
      event.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      this.zoomAround(event.clientX - rect.left, event.clientY - rect.top, event.deltaY < 0 ? 1.12 : 0.89);
    }, { passive: false });
  }

  getRenderStats() {
    return { renderedCount: this.renderedCount, totalCount: this.totalCount };
  }

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

  private zoomAround(screenX: number, screenY: number, factor: number) {
    const nextScale = Math.min(7, Math.max(0.35, this.scale * factor));
    const worldX = (screenX - this.offsetX) / this.scale;
    const worldY = (screenY - this.offsetY) / this.scale;
    this.offsetX = screenX - worldX * nextScale;
    this.offsetY = screenY - worldY * nextScale;
    this.scale = nextScale;
    this.draw();
  }

  private resetView() {
    this.offsetX = 0;
    this.offsetY = 0;
    this.scale = 1;
    this.draw();
  }

  private findNodeAt(screenX: number, screenY: number): GraphNode | null {
    const worldX = (screenX - this.offsetX) / this.scale;
    const worldY = (screenY - this.offsetY) / this.scale;
    let closest: { node: GraphNode; distance: number } | null = null;
    const threshold = 9 / this.scale;
    for (const node of this.graph.nodes) {
      const position = this.positions.get(node.id);
      if (!position) continue;
      const distance = Math.hypot(position.x - worldX, position.y - worldY);
      if (distance <= threshold && (!closest || distance < closest.distance)) closest = { node, distance };
    }
    return closest?.node ?? null;
  }

  private showTooltip(node: GraphNode, x: number, y: number) {
    this.tooltip.empty();
    this.tooltip.createDiv({ cls: 'cs-graph-tooltip-title', text: node.label || node.id });
    this.tooltip.createDiv({ cls: 'cs-graph-tooltip-meta', text: `${node.community_name || `Community ${node.community ?? '—'}`} · ${this.degreeCache.get(node.id) ?? 0} connections` });
    this.tooltip.style.left = `${Math.min(this.width - 220, x + 14)}px`;
    this.tooltip.style.top = `${Math.max(10, y - 12)}px`;
    this.tooltip.hidden = false;
  }

  private hideTooltip() {
    this.tooltip.hidden = true;
  }

  private startAnimating() {
    if (this.rafId !== null) return;
    const tick = () => {
      const now = Date.now();
      this.highlights = this.highlights.filter((highlight) => now - highlight.startedAt < HIGHLIGHT_DURATION_MS);
      this.draw();
      if (this.highlights.length > 0 && !this.disposed) this.rafId = requestAnimationFrame(tick);
      else this.rafId = null;
    };
    this.rafId = requestAnimationFrame(tick);
  }

  private draw() {
    const { ctx } = this;
    ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);

    const background = ctx.createRadialGradient(this.width * 0.48, this.height * 0.42, 0, this.width / 2, this.height / 2, Math.max(this.width, this.height) * 0.72);
    background.addColorStop(0, '#11162d');
    background.addColorStop(0.5, '#080b1c');
    background.addColorStop(1, '#03050e');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, this.width, this.height);

    for (let index = 0; index < 100; index++) {
      const x = ((index * 83.17) % 1) * this.width;
      const y = ((index * 47.63) % 1) * this.height;
      ctx.fillStyle = `rgba(196,211,255,${0.12 + (index % 5) * 0.035})`;
      ctx.fillRect(x, y, index % 11 === 0 ? 1.4 : 0.8, index % 11 === 0 ? 1.4 : 0.8);
    }

    ctx.save();
    ctx.translate(this.offsetX, this.offsetY);
    ctx.scale(this.scale, this.scale);

    for (let communityIndex = 0; communityIndex < this.communities.length; communityIndex++) {
      const community = this.communities[communityIndex];
      const halo = ctx.createRadialGradient(community.x, community.y, 0, community.x, community.y, community.radius * 1.18);
      halo.addColorStop(0, communityColor(community.id, 0.085, 62));
      halo.addColorStop(1, communityColor(community.id, 0, 50));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(community.x, community.y, community.radius * 1.18, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = communityColor(community.id, 0.2, 62);
      ctx.lineWidth = 0.75 / this.scale;
      ctx.setLineDash([3 / this.scale, 5 / this.scale]);
      ctx.stroke();
      ctx.setLineDash([]);
      if (this.scale >= 0.72 && communityIndex < VISIBLE_COMMUNITY_LABELS) {
        const fontSize = 8.5 / this.scale;
        const labelY = Math.max(14 / this.scale, community.y - community.radius + 11 / this.scale);
        ctx.font = `650 ${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.textAlign = 'center';
        const labelWidth = ctx.measureText(community.label).width;
        ctx.fillStyle = 'rgba(4, 7, 18, 0.78)';
        ctx.fillRect(
          community.x - labelWidth / 2 - 5 / this.scale,
          labelY - fontSize + 1 / this.scale,
          labelWidth + 10 / this.scale,
          fontSize + 6 / this.scale
        );
        ctx.fillStyle = communityColor(community.id, 0.82, 82);
        ctx.fillText(community.label, community.x, labelY);
      }
    }

    ctx.lineWidth = 0.42 / this.scale;
    const edgeStride = Math.max(1, Math.ceil(this.graph.edges.length / VISIBLE_EDGE_BUDGET));
    for (let edgeIndex = 0; edgeIndex < this.graph.edges.length; edgeIndex++) {
      const edge = this.graph.edges[edgeIndex];
      const a = this.positions.get(edge.source);
      const b = this.positions.get(edge.target);
      if (!a || !b) continue;
      const active = edge.source === this.hoveredNodeId || edge.target === this.hoveredNodeId || edge.source === this.selectedNodeId || edge.target === this.selectedNodeId;
      if (!active && edgeIndex % edgeStride !== 0) continue;
      ctx.strokeStyle = active ? 'rgba(143,168,255,0.48)' : 'rgba(180,195,238,0.035)';
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    const highlightedIds = new Set(this.highlights.map((highlight) => highlight.nodeId));
    for (const node of this.graph.nodes) {
      const position = this.positions.get(node.id);
      if (!position || highlightedIds.has(node.id)) continue;
      const degree = this.degreeCache.get(node.id) ?? 0;
      const active = node.id === this.hoveredNodeId || node.id === this.selectedNodeId;
      const radius = (active ? 4 : NODE_RADIUS + Math.min(1.8, Math.log2(degree + 1) * 0.3)) / this.scale;
      ctx.fillStyle = communityColor(node.community, active ? 0.98 : 0.72, active ? 82 : 68);
      if (active) {
        ctx.shadowColor = communityColor(node.community, 0.88, 68);
        ctx.shadowBlur = 13 / this.scale;
      }
      ctx.beginPath();
      ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    const now = Date.now();
    for (const highlight of this.highlights) {
      const position = this.positions.get(highlight.nodeId);
      if (!position) continue;
      const age = (now - highlight.startedAt) / HIGHLIGHT_DURATION_MS;
      const alpha = Math.max(0, 1 - age);
      const radius = (HIGHLIGHT_RADIUS - age * 2.5) / this.scale;
      ctx.fillStyle = `rgba(255,209,132,${alpha})`;
      ctx.shadowColor = 'rgba(255,174,76,0.9)';
      ctx.shadowBlur = 14 / this.scale;
      ctx.beginPath();
      ctx.arc(position.x, position.y, Math.max(radius, 1), 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }

  destroy() {
    this.disposed = true;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
  }
}
