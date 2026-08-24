import { App, PluginSettingTab, Setting } from 'obsidian';
import type CodestellationPlugin from './main';

export class CodestellationSettingTab extends PluginSettingTab {
  plugin: CodestellationPlugin;

  constructor(app: App, plugin: CodestellationPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Codestellation' });
    containerEl.createEl('p', {
      text: 'v0.1, testing phase. Expect breaking changes between versions.',
      cls: 'setting-item-description',
    });

    new Setting(containerEl)
      .setName('Your name')
      .setDesc('Used for the greeting on the home screen.')
      .addText((text) =>
        text
          .setValue(this.plugin.settings.userName)
          .onChange(async (value) => {
            this.plugin.settings.userName = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Check-in target (hours)')
      .setDesc('You get a "time to head home?" prompt once you cross this after checking in.')
      .addText((text) =>
        text
          .setValue(String(this.plugin.settings.checkInTargetHours))
          .onChange(async (value) => {
            const n = Number(value);
            if (!Number.isFinite(n) || n <= 0) return;
            this.plugin.settings.checkInTargetHours = n;
            await this.plugin.saveSettings();
          })
      );
  }
}
