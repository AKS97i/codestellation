import { App, Modal, Notice, Setting } from 'obsidian';
import type CodestellationPlugin from '../main';
import { saveRegistry } from '../domain/project-registry';
import { saveCheckIn } from '../domain/checkin';

/**
 * Resets the plugin's own state (project registry, active check-in,
 * onboarding flag) so the wizard runs again from scratch. Deliberately
 * does NOT touch anything already written into the vault as real notes
 * (project overviews, graph exports, work logs) — those are the user's
 * vault content at that point, not plugin-internal state, and deleting
 * vault files without being asked is exactly the kind of destructive
 * action that needs its own explicit, separate confirmation.
 */
export class ResetDataModal extends Modal {
  private plugin: CodestellationPlugin;

  constructor(app: App, plugin: CodestellationPlugin) {
    super(app);
    this.plugin = plugin;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.addClass('cs-modal');
    contentEl.createEl('h2', { text: 'Reset Codestellation data?' });
    contentEl.createEl('p', {
      text: 'This clears the imported-project registry, any active check-in, and re-triggers the setup wizard on next launch. It does NOT delete any notes, graphs, or work logs already written into your vault.',
    });

    new Setting(contentEl)
      .addButton((btn) => btn.setButtonText('Cancel').onClick(() => this.close()))
      .addButton((btn) =>
        btn.setButtonText('Reset').setWarning().onClick(async () => {
          await saveRegistry(this.app.vault, []);
          await saveCheckIn(this.app.vault, null);
          this.plugin.settings.onboardingComplete = false;
          await this.plugin.saveSettings();
          new Notice('Codestellation data reset. Reopen the home view or reload Obsidian to re-run setup.');
          this.close();
        })
      );
  }

  onClose() {
    this.contentEl.empty();
  }
}
