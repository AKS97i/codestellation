import { Plugin, WorkspaceLeaf, Events } from 'obsidian';
import { VIEW_TYPE_HOME, VIEW_TYPE_WORKSPACE } from './constants';
import { HomeView } from './ui/views/home-view';
import { WorkspaceView } from './ui/views/workspace-view';
import { CodestellationSettingTab } from './settings';
import { DEFAULT_SETTINGS, CodestellationSettings } from './types';
import { logger } from './core/logger';
import { OnboardingWizardModal } from './ui/onboarding/wizard-modal';
import { CheckInBar } from './ui/components/checkin-bar';
import { DiagnosticsModal } from './ui/diagnostics-modal';
import { ResetDataModal } from './ui/reset-data-modal';

export default class CodestellationPlugin extends Plugin {
  settings: CodestellationSettings = DEFAULT_SETTINGS;
  private checkInBar: CheckInBar | null = null;

  async onload() {
    await this.loadSettings();

    this.checkInBar = new CheckInBar(this.addStatusBarItem(), this.app.vault, () => this.settings);
    await this.checkInBar.init();

    this.registerView(VIEW_TYPE_HOME, (leaf) => new HomeView(leaf, this));
    this.registerView(VIEW_TYPE_WORKSPACE, (leaf) => new WorkspaceView(leaf, this));

    this.addRibbonIcon('orbit', 'Open Codestellation', () => {
      this.activateHomeView();
    });

    this.addRibbonIcon('folder-plus', 'Codestellation: Import a project', () => {
      new OnboardingWizardModal(this.app, this, 'projects', () => this.notifyProjectsChanged()).open();
    });

    this.addCommand({
      id: 'open-home',
      name: 'Open home',
      callback: () => this.activateHomeView(),
    });

    this.addCommand({
      id: 'run-onboarding',
      name: 'Run setup wizard',
      callback: () => new OnboardingWizardModal(this.app, this, 'name', () => this.notifyProjectsChanged()).open(),
    });

    this.addCommand({
      id: 'import-project',
      name: 'Import a project',
      // skips straight to the project-discovery step — this is the fix for
      // "I closed the wizard by accident and there's no way back in without
      // redoing the whole thing": re-running the full sequence just to
      // import one more project was real friction, not just a missing exit
      callback: () => new OnboardingWizardModal(this.app, this, 'projects', () => this.notifyProjectsChanged()).open(),
    });

    this.addCommand({
      id: 'show-diagnostics',
      name: 'Show diagnostics',
      callback: () => new DiagnosticsModal(this.app).open(),
    });

    this.addCommand({
      id: 'reset-data',
      name: 'Reset plugin data',
      callback: () => new ResetDataModal(this.app, this).open(),
    });

    this.addSettingTab(new CodestellationSettingTab(this.app, this));

    if (!this.settings.onboardingComplete) {
      // deferred so the modal doesn't fight the workspace layout while
      // Obsidian is still restoring panes from the previous session
      this.app.workspace.onLayoutReady(() =>
        new OnboardingWizardModal(this.app, this, 'name', () => this.notifyProjectsChanged()).open()
      );
    }

    logger.info('loaded v0.1.0');
  }

  onunload() {
    this.checkInBar?.destroy();
    logger.info('unloaded');
  }

  async activateHomeView() {
    const { workspace } = this.app;
    let leaf: WorkspaceLeaf | null = workspace.getLeavesOfType(VIEW_TYPE_HOME)[0] ?? null;
    if (!leaf) {
      leaf = workspace.getLeaf('tab');
      await leaf.setViewState({ type: VIEW_TYPE_HOME, active: true });
    }
    workspace.revealLeaf(leaf);
  }

  /** Opens (or reuses) the workspace view for one project — "Launch" from the home screen's planet card. */
  async activateWorkspaceView(projectId: string) {
    const { workspace } = this.app;
    const existing = workspace.getLeavesOfType(VIEW_TYPE_WORKSPACE).find((l) => (l.getViewState().state as { projectId?: string } | undefined)?.projectId === projectId);
    const leaf = existing ?? workspace.getLeaf('tab');
    if (!existing) {
      await leaf.setViewState({ type: VIEW_TYPE_WORKSPACE, active: true, state: { projectId } });
    }
    workspace.revealLeaf(leaf);
  }

  /**
   * Broadcasts that the project registry may have changed, so any open
   * Home view can re-render its planets. Without this, importing a
   * project while the Home pane is already open left it showing the
   * stale set until the pane was closed and reopened — the registry
   * write happened, the planet just never appeared.
   *
   * `codestellation:refresh-home` isn't one of Obsidian's built-in
   * workspace events, so its typings don't have an overload for it —
   * the cast is the standard, accepted way plugins send their own
   * custom events over the same Workspace event bus.
   */
  notifyProjectsChanged() {
    (this.app.workspace as unknown as Events).trigger('codestellation:refresh-home');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
