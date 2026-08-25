// Ported from prototype/src/solar/planet.js. Data-driven: one real DOM
// node per project, positioned every frame from OrbitEngine's angle
// state (never via CSS keyframe animations — see orbit-engine.ts).
import type { OrbitEngine, OrbitPosition } from './orbit-engine';
import type { RegistryEntry } from '../../domain/project-registry';

const MIN_RADIUS_PX = 116;
const RADIUS_STEP_PX = 72;
const BASE_SPEED_RAD_PER_SEC = (Math.PI * 2) / 54;
const SPEED_VARIATION = 0.08;

export function planetRadiusForIndex(index: number): number {
  return MIN_RADIUS_PX + index * RADIUS_STEP_PX;
}

const DEFAULT_PLANET_SIZE_PX = 56;

export function projectMark(name: string): string {
  const words = name.trim().split(/[\s_-]+/).filter(Boolean);
  if (words.length > 1) return `${words[0][0]}${words[1][0]}`.toUpperCase();
  return (words[0] ?? '?').slice(0, 2).toUpperCase();
}

export function planetAngleForIndex(index: number, total: number): number {
  return -Math.PI / 2 + (Math.PI * 2 * index) / Math.max(total, 1);
}

// The prototype (Phase 0) sized planets by mock session count. The real
// RegistryEntry doesn't carry session counts — that's live adapter data,
// wired up in Phase 6's project workspace, not stored in the registry
// itself — so every planet is the same size here for now. Revisit once
// Phase 6 exposes a cheap way to get a per-project session count without
// fully parsing every session file just to render the home screen.
function planetSizePx(_entry: RegistryEntry): number {
  return DEFAULT_PLANET_SIZE_PX;
}

export function createPlanets(
  wrap: HTMLElement,
  entries: RegistryEntry[],
  engine: OrbitEngine,
  opts: { onSelect?: (entry: RegistryEntry, el: HTMLElement) => void } = {}
): Map<string, HTMLElement> {
  const elements = new Map<string, HTMLElement>();

  entries.forEach((entry, index) => {
    const radiusPx = planetRadiusForIndex(index);
    const sizePx = planetSizePx(entry);
    const speed = BASE_SPEED_RAD_PER_SEC * (1 - SPEED_VARIATION / 2 + Math.random() * SPEED_VARIATION);
    const startAngle = planetAngleForIndex(index, entries.length);

    engine.addBody(entry.id, { angle: startAngle, radiusPx, speedRadPerSec: speed });

    const el = document.createElement('div');
    el.className = 'cs-planet';
    el.style.width = sizePx + 'px';
    el.style.height = sizePx + 'px';
    el.style.setProperty('--planet-hue', String(entry.hue));
    el.dataset.projectId = entry.id;
    el.dataset.baseSize = String(sizePx);
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', entry.name);

    const mark = document.createElement('div');
    mark.className = 'cs-planet-mark';
    mark.textContent = projectMark(entry.name);
    el.appendChild(mark);

    const label = document.createElement('div');
    label.className = 'cs-planet-label';
    const labelName = document.createElement('span');
    labelName.className = 'cs-planet-label-name';
    labelName.textContent = entry.name;
    const labelHint = document.createElement('span');
    labelHint.className = 'cs-planet-label-hint';
    labelHint.textContent = 'Open workspace';
    label.append(labelName, labelHint);
    el.appendChild(label);

    el.addEventListener('mouseenter', () => {
      engine.setPaused(entry.id, true);
      el.classList.add('is-focused');
    });
    el.addEventListener('mouseleave', () => {
      engine.setPaused(entry.id, false);
      el.classList.remove('is-focused');
    });
    el.addEventListener('click', () => opts.onSelect?.(entry, el));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        opts.onSelect?.(entry, el);
      }
    });

    wrap.appendChild(el);
    elements.set(entry.id, el);
  });

  return elements;
}

export function positionPlanets(elements: Map<string, HTMLElement>, positions: OrbitPosition[], opts: { skipId?: string | null } = {}) {
  for (const { id, x, y } of positions) {
    if (id === opts.skipId) continue;
    const el = elements.get(id);
    if (!el) continue;
    const half = el.offsetWidth / 2;
    el.style.transform = `translate(${x - half}px, ${y - half}px)`;
  }
}
