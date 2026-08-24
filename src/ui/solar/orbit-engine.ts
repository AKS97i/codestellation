// Ported from prototype/src/solar/orbit-engine.js (Phase 0), where this
// exact design — a single requestAnimationFrame clock with angle as
// explicit numeric state — was built specifically to fix a real bug: two
// independent CSS keyframe animations (a rotating track + a counter-
// rotating planet) would desync and snap to angle 0 whenever either was
// paused/resumed. Nothing here should reintroduce that pattern.

export interface OrbitPosition {
  id: string;
  angle: number;
  x: number;
  y: number;
}

interface OrbitBody {
  angle: number;
  radiusPx: number;
  speedRadPerSec: number;
  paused: boolean;
}

export class OrbitEngine {
  private bodies = new Map<string, OrbitBody>();
  private onTick?: (positions: OrbitPosition[]) => void;
  private raf: number | null = null;
  private lastT: number | null = null;

  constructor(opts: { onTick?: (positions: OrbitPosition[]) => void } = {}) {
    this.onTick = opts.onTick;
  }

  addBody(id: string, opts: { angle?: number; radiusPx: number; speedRadPerSec: number }) {
    this.bodies.set(id, { angle: opts.angle ?? 0, radiusPx: opts.radiusPx, speedRadPerSec: opts.speedRadPerSec, paused: false });
  }

  removeBody(id: string) {
    this.bodies.delete(id);
  }

  getAngle(id: string): number {
    return this.bodies.get(id)?.angle ?? 0;
  }

  setPaused(id: string, paused: boolean) {
    const b = this.bodies.get(id);
    if (b) b.paused = paused;
  }

  start() {
    if (this.raf !== null) return; // already running
    this.lastT = null;
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = (t: number) => {
      if (this.lastT === null) this.lastT = t;
      const dt = reduceMotion ? 0 : Math.min(0.05, (t - this.lastT) / 1000);
      this.lastT = t;

      const positions: OrbitPosition[] = [];
      for (const [id, b] of this.bodies) {
        if (!b.paused) b.angle = (b.angle + b.speedRadPerSec * dt) % (Math.PI * 2);
        positions.push({ id, angle: b.angle, x: Math.cos(b.angle) * b.radiusPx, y: Math.sin(b.angle) * b.radiusPx });
      }
      this.onTick?.(positions);
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  stop() {
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    this.raf = null;
    this.lastT = null;
  }
}
