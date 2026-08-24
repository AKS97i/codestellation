// Ported from prototype/src/solar/fly-to-center.js. See that file's
// header comment for the three defects this design specifically fixes
// (reentrancy, stale coordinates on resize, DOM reparenting) — all
// verified against a real browser during Phase 0, not just written once
// and assumed correct.
import type { OrbitEngine } from './orbit-engine';

type FlightState = 'idle' | 'flyingIn' | 'focused' | 'flyingOut';

export interface FlightController {
  flyIn(id: string, planetEl: HTMLElement, holeEl: HTMLElement, opts?: { onFocused?: () => void }): void;
  flyOut(opts?: { onIdle?: () => void }): void;
  getState(): FlightState;
}

export function createFlightController(opts: { shell: HTMLElement; engine: OrbitEngine }): FlightController {
  let state: FlightState = 'idle';
  let current: { id: string; el: HTMLElement; startRect: DOMRect } | null = null;
  let resizeObserver: ResizeObserver | null = null;

  function pinFixed(el: HTMLElement, rect: DOMRect) {
    el.style.transform = ''; // clear any leftover orbit transform — see planet.ts / positionPlanets
    el.style.position = 'fixed';
    el.style.left = rect.left + 'px';
    el.style.top = rect.top + 'px';
    el.style.width = rect.width + 'px';
    el.style.height = rect.height + 'px';
    el.style.zIndex = '50';
  }

  function flightTransition(): string {
    const styles = getComputedStyle(document.documentElement);
    const dur = styles.getPropertyValue('--cs-dur-flight').trim() || '650ms';
    const ease = styles.getPropertyValue('--cs-ease-out-expo').trim() || 'cubic-bezier(0.22,1,0.36,1)';
    return ['left', 'top', 'width', 'height'].map((p) => `${p} ${dur} ${ease}`).join(', ');
  }

  function animateTo(el: HTMLElement, rect: DOMRect, onDone: () => void) {
    el.style.transition = flightTransition();
    void el.offsetWidth;
    el.style.left = rect.left + 'px';
    el.style.top = rect.top + 'px';
    el.style.width = rect.width + 'px';
    el.style.height = rect.height + 'px';
    const done = () => {
      el.removeEventListener('transitionend', done);
      onDone();
    };
    el.addEventListener('transitionend', done);
  }

  function reanchorIfActive(holeEl: HTMLElement) {
    if ((state === 'flyingIn' || state === 'focused') && current) {
      const rect = holeEl.getBoundingClientRect();
      current.el.style.left = rect.left + 'px';
      current.el.style.top = rect.top + 'px';
      current.el.style.width = rect.width + 'px';
      current.el.style.height = rect.height + 'px';
    }
  }

  return {
    getState: () => state,

    flyIn(id, planetEl, holeEl, opts2 = {}) {
      if (state !== 'idle') return;
      state = 'flyingIn';

      const startRect = planetEl.getBoundingClientRect();
      const holeRect = holeEl.getBoundingClientRect();
      current = { id, el: planetEl, startRect };

      opts.engine.setPaused(id, true);
      pinFixed(planetEl, startRect);
      planetEl.classList.add('is-flying');

      resizeObserver = new ResizeObserver(() => reanchorIfActive(holeEl));
      resizeObserver.observe(opts.shell);

      animateTo(planetEl, holeRect, () => {
        state = 'focused';
        opts2.onFocused?.();
      });
    },

    flyOut(opts2 = {}) {
      if (state !== 'focused' || !current) return;
      state = 'flyingOut';
      const { id, el, startRect } = current;

      animateTo(el, startRect, () => {
        el.classList.remove('is-flying');
        el.style.position = '';
        el.style.left = '';
        el.style.top = '';
        const baseSize = el.dataset.baseSize;
        el.style.width = baseSize ? baseSize + 'px' : '';
        el.style.height = baseSize ? baseSize + 'px' : '';
        el.style.zIndex = '';
        el.style.transition = '';
        opts.engine.setPaused(id, false);
        resizeObserver?.disconnect();
        resizeObserver = null;
        state = 'idle';
        current = null;
        opts2.onIdle?.();
      });
    },
  };
}
