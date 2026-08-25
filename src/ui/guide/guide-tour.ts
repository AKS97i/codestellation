export interface GuideStep {
  /** CSS selector, resolved against the view's own root element at the moment this step is shown — resolved lazily (not all target elements exist for every step, e.g. tabs only exist once a project is launched). */
  selector: string;
  title: string;
  body: string;
  /** Runs synchronously right before this step is positioned/highlighted — e.g. switching to the tab the step is about, so a tour can walk through content that's normally hidden behind `.cs-tab-panel { display: none }` rather than only covering whatever happens to be on-screen already. */
  onEnter?: () => void;
}

const PADDING = 8;

/**
 * A minimal, dependency-free spotlight tour: a dark backdrop with a
 * cutout around the target element (the classic "huge box-shadow"
 * technique — no SVG mask needed) plus a callout card with Back/Next/Skip.
 * Scoped to one root element (a specific view) rather than the whole
 * document, so a Home-view tour and a Workspace-view tour can't target
 * each other's DOM by accident.
 */
export class GuideTour {
  private root: HTMLElement;
  private steps: GuideStep[];
  private index = 0;
  private overlay: HTMLElement | null = null;
  private onResize = () => this.render();

  constructor(root: HTMLElement, steps: GuideStep[]) {
    this.root = root;
    this.steps = steps;
  }

  start() {
    if (this.steps.length === 0) return;
    this.index = 0;
    window.addEventListener('resize', this.onResize);
    this.render();
  }

  private stop() {
    window.removeEventListener('resize', this.onResize);
    this.overlay?.remove();
    this.overlay = null;
  }

  private render() {
    this.overlay?.remove();
    const step = this.steps[this.index];
    step.onEnter?.();
    const target = this.root.querySelector(step.selector) as HTMLElement | null;

    const overlay = document.createElement('div');
    overlay.className = 'cs-guide-overlay';
    this.root.appendChild(overlay);
    this.overlay = overlay;

    const highlight = overlay.createDiv({ cls: 'cs-guide-highlight' });
    if (target) {
      const rect = target.getBoundingClientRect();
      const rootRect = this.root.getBoundingClientRect();
      highlight.style.left = `${rect.left - rootRect.left - PADDING}px`;
      highlight.style.top = `${rect.top - rootRect.top - PADDING}px`;
      highlight.style.width = `${rect.width + PADDING * 2}px`;
      highlight.style.height = `${rect.height + PADDING * 2}px`;
    } else {
      // target not present in the current view state — center the card
      // instead of pointing at nothing, rather than skipping the content
      highlight.style.display = 'none';
    }

    const card = overlay.createDiv({ cls: 'cs-guide-card' });
    if (target) {
      const rect = target.getBoundingClientRect();
      const rootRect = this.root.getBoundingClientRect();
      const spaceBelow = rootRect.bottom - rect.bottom;
      if (spaceBelow > 160) {
        card.style.top = `${rect.bottom - rootRect.top + PADDING + 12}px`;
      } else {
        card.style.top = `${Math.max(12, rect.top - rootRect.top - 12)}px`;
        card.style.transform = 'translateY(-100%)';
      }
      card.style.left = `${Math.max(12, rect.left - rootRect.left)}px`;
    } else {
      card.addClass('cs-guide-card-centered');
    }

    card.createDiv({ cls: 'cs-guide-step-count', text: `${this.index + 1} / ${this.steps.length}` });
    card.createEl('h3', { text: step.title });
    card.createEl('p', { text: step.body });

    const actions = card.createDiv({ cls: 'cs-guide-actions' });
    const skipBtn = actions.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: 'Skip' });
    skipBtn.addEventListener('click', () => this.stop());

    if (this.index > 0) {
      const backBtn = actions.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: 'Back' });
      backBtn.addEventListener('click', () => { this.index--; this.render(); });
    }

    const isLast = this.index === this.steps.length - 1;
    const nextBtn = actions.createEl('button', { cls: 'cs-btn cs-btn-primary', text: isLast ? 'Done' : 'Next' });
    nextBtn.addEventListener('click', () => {
      if (isLast) { this.stop(); return; }
      this.index++;
      this.render();
    });
  }
}
