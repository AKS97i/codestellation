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

    new Setting(containerEl)
      .setName('Interface font')
      .setDesc('Applied to Codestellation home and workspace views.')
      .addDropdown((dropdown) => dropdown
        .addOption('obsidian', 'Obsidian default')
        .addOption('system', 'System')
        .addOption('serif', 'Editorial serif')
        .addOption('mono', 'Monospace')
        .setValue(this.plugin.settings.interfaceFont)
        .onChange(async (value) => {
          this.plugin.settings.interfaceFont = value as typeof this.plugin.settings.interfaceFont;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Galaxy accent hue')
      .setDesc('0–359. Changes the accent used across the solar system and workspaces.')
      .addSlider((slider) => slider
        .setLimits(0, 359, 1)
        .setDynamicTooltip()
        .setValue(this.plugin.settings.galaxyAccentHue)
        .onChange(async (value) => {
          this.plugin.settings.galaxyAccentHue = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Scene intensity')
      .setDesc('Minimal reduces geometry, effects, and GPU load. Calm and Cinematic progressively add detail.')
      .addDropdown((dropdown) => dropdown
        .addOption('minimal', 'Minimal (low-end PCs)')
        .addOption('calm', 'Calm')
        .addOption('cinematic', 'Cinematic')
        .setValue(this.plugin.settings.sceneIntensity)
        .onChange(async (value) => {
          this.plugin.settings.sceneIntensity = value as typeof this.plugin.settings.sceneIntensity;
          await this.plugin.saveSettings();
        }));

  }
}
