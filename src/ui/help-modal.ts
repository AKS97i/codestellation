import { App, Modal, Setting } from 'obsidian';

/**
 * Plain-language explanation of what's actually happening under the hood
 * right now — written to answer the exact questions that came up
 * building this: where does the graph live, why two copies, what does
 * Claude actually see. Kept honest and specific rather than marketing
 * copy, same spirit as the README's "what's estimated or missing"
 * section — update this alongside that file when the mechanics change,
 * or it'll rot into being wrong.
 */
export class HelpModal extends Modal {
  private onStartTour?: () => void;

  /** @param onStartTour - when provided, adds a "Start guided tour" button that closes this modal and hands off to a view-specific spotlight walkthrough (see guide/guide-tour.ts) — the highlighted, click-through version of this same explanation, scoped to whichever view opened it. */
  constructor(app: App, onStartTour?: () => void) {
    super(app);
    this.onStartTour = onStartTour;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.addClass('cs-modal');
    contentEl.addClass('cs-help-modal');
    contentEl.createEl('h2', { text: 'How Codestellation actually works' });

    section(contentEl, 'Importing a project', [
      'Codestellation reads your local Claude Code / Codex session history to find projects you\'ve actually worked in, then writes a registry entry plus an overview note into this vault under Codestellation/.',
      'This only imports metadata (name, path, color) — it does not copy your source code into the vault.',
    ]);

    section(contentEl, 'The graphify graph — where it actually lives', [
      'graphify always builds its output as graphify-out/ inside your real project folder. That\'s graphify\'s own behavior, not something this plugin controls, and it can\'t be redirected elsewhere.',
      'Codestellation copies the raw graph.json from there into this vault too (Codestellation/projects/<slug>/graph/graph.json), alongside a graphify-generated .canvas file and per-node notes.',
      'These are two different things for two different jobs: the project folder copy is what graphify\'s own CLI (query/explain/path) actually reads. The vault copy only feeds this plugin\'s own Graph tab canvas — nothing outside Codestellation reads the vault copy.',
    ]);

    section(contentEl, 'How this actually helps Claude', [
      'Separately from this plugin, if you have the graphify skill installed in your own Claude Code setup, Claude auto-detects graphify-out/ in a project folder and queries the graph instead of reading files one by one for structural questions — cheaper and faster than raw file reads.',
      'The "Start new session here" button (Chats tab) copies a command that cds into the project and starts Claude with a system-prompt reminder to use graphify. That\'s a nudge, not a guarantee: it only works if you have graphify (and ideally the graphify skill) installed on your own machine — this plugin can\'t install or configure that for you.',
    ]);

    section(contentEl, 'Chats', [
      'Lists real Claude Code / Codex sessions found for this project. Titles come from Claude\'s own custom-title (or your first prompt as a fallback), and from Codex\'s session_index.jsonl.',
      '"Copy resume command" copies claude --resume <id> to your clipboard — Obsidian can\'t embed an interactive chat, so resuming happens in your own terminal.',
    ]);

    section(contentEl, 'Branches, Work Log, Check-in', [
      'Branches and the branch comparator read directly from git — always current, nothing cached.',
      'Work Log AI summaries are currently disabled (a permission-prompt bug when shelling out from inside Obsidian) — it shows a plain commit list instead.',
      'Check-in is a manual status-bar timer you start yourself — nothing here tracks time automatically.',
    ]);

    contentEl.createEl('p', {
      cls: 'setting-item-description',
      text: 'Full, current list of what\'s estimated, faked, or not built yet is in the README on GitHub.',
    });

    if (this.onStartTour) {
      new Setting(contentEl).addButton((btn) =>
        btn.setButtonText('Start guided tour').setCta().onClick(() => {
          this.close();
          this.onStartTour?.();
        })
      );
    }
  }

  onClose() {
    this.contentEl.empty();
  }
}

function section(container: HTMLElement, title: string, paragraphs: string[]) {
  container.createEl('h3', { text: title });
  for (const text of paragraphs) container.createEl('p', { text });
}
