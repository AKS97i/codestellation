import { Notice, type Vault } from 'obsidian';
import { loadCheckIn, saveCheckIn, elapsedHours, hasCrossedTarget, formatElapsed } from '../../domain/checkin';
import type { CheckIn, CodestellationSettings } from '../../types';

const TICK_MS = 30_000;

/**
 * Lives in Obsidian's status bar (app-wide, not tied to any one pane) since
 * check-in is a whole-session thing, not a per-view one. Elapsed time is
 * always recomputed from the persisted wall-clock `startedAt` on every
 * tick — never accumulated — so app restarts, sleep/wake, and timezone
 * changes can't drift it (see the implementation plan's Phase 8 risk note).
 * An un-closed check-in found on startup is resumed rather than silently
 * discarded or auto-closed — the persisted start time is still valid wall
 * clock, so there's no reason to lose it.
 */
export class CheckInBar {
  private el: HTMLElement;
  private vault: Vault;
  private getSettings: () => CodestellationSettings;
  private current: CheckIn | null = null;
  private intervalId: number | null = null;
  private notifiedThisCheckIn = false;

  constructor(el: HTMLElement, vault: Vault, getSettings: () => CodestellationSettings) {
    this.el = el;
    this.vault = vault;
    this.getSettings = getSettings;
    this.el.addClass('cs-checkin-bar');
  }

  async init() {
    this.current = await loadCheckIn(this.vault);
    this.render();
    this.intervalId = window.setInterval(() => this.tick(), TICK_MS);
  }

  destroy() {
    if (this.intervalId !== null) window.clearInterval(this.intervalId);
  }

  private tick() {
    if (!this.current) return;
    this.render();
    if (!this.notifiedThisCheckIn && hasCrossedTarget(this.current, Date.now())) {
      this.notifiedThisCheckIn = true;
      this.showTargetNotice();
    }
  }

  private showTargetNotice() {
    const fragment = document.createDocumentFragment();
    fragment.appendText(`You've hit your ${this.current!.targetHours}h target. Time to head home?`);
    const row = fragment.createDiv({ cls: 'cs-filter-row' });
    const stopBtn = row.createEl('button', { cls: 'cs-btn cs-btn-primary', text: 'Check out' });
    const keepGoingBtn = row.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: 'Keep going' });
    const notice = new Notice(fragment, 0); // 0 = stays until dismissed or a button is clicked
    stopBtn.addEventListener('click', () => {
      notice.hide();
      this.checkOut();
    });
    keepGoingBtn.addEventListener('click', () => notice.hide());
  }

  private async checkIn() {
    this.current = { projectId: null, startedAt: new Date().toISOString(), targetHours: this.getSettings().checkInTargetHours };
    this.notifiedThisCheckIn = false;
    await saveCheckIn(this.vault, this.current);
    this.render();
  }

  private async checkOut() {
    this.current = null;
    await saveCheckIn(this.vault, null);
    this.render();
  }

  private render() {
    this.el.empty();
    if (!this.current) {
      const btn = this.el.createEl('span', { cls: 'cs-checkin-toggle', text: 'Check in' });
      btn.addEventListener('click', () => this.checkIn());
      return;
    }
    const hours = elapsedHours(this.current, Date.now());
    const label = this.el.createEl('span', { text: `⏱ ${formatElapsed(hours)}` });
    label.addClass('cs-checkin-elapsed');
    const btn = this.el.createEl('span', { cls: 'cs-checkin-toggle', text: 'Check out' });
    btn.style.marginLeft = '8px';
    btn.addEventListener('click', () => this.checkOut());
  }
}
