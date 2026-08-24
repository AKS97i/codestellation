import { App, Modal, Notice, Setting } from 'obsidian';
import { buildDiagnosticsReport } from '../domain/diagnostics';
import { loadRegistry } from '../domain/project-registry';

export class DiagnosticsModal extends Modal {
  constructor(app: App) {
    super(app);
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.createEl('h2', { text: 'Codestellation diagnostics' });
    const pre = contentEl.createEl('pre', { text: 'Gathering…' });
    pre.style.whiteSpace = 'pre-wrap';
    pre.style.userSelect = 'text';
    pre.style.maxHeight = '60vh';
    pre.style.overflowY = 'auto';

    const registry = await loadRegistry(this.app.vault);
    const report = await buildDiagnosticsReport(registry);
    pre.setText(report);

    new Setting(contentEl).addButton((btn) =>
      btn.setButtonText('Copy to clipboard').setCta().onClick(async () => {
        await navigator.clipboard.writeText(report);
        new Notice('Copied. Paste this into your bug report.');
      })
    );
  }

  onClose() {
    this.contentEl.empty();
  }
}
