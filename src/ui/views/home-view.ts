import { Events, ItemView, Notice, WorkspaceLeaf } from 'obsidian';
import { VIEW_TYPE_HOME } from '../../constants';
import type CodestellationPlugin from '../../main';
import { loadRegistry, saveRegistry, type RegistryEntry } from '../../domain/project-registry';
import { GalaxyScene, type GalaxyProjectPosition } from '../solar/galaxy-scene';
import { createPlanetIdentity } from '../solar/planet-identity';
import { showGreeting } from '../solar/greeting';
import { OnboardingWizardModal } from '../onboarding/wizard-modal';
import { HelpModal } from '../help-modal';
import { GuideTour } from '../guide/guide-tour';
import { logger } from '../../core/logger';
import { applyCodestellationAppearance } from '../appearance';
import { listProjectBranches } from '../../adapters/git/branches';

const HOME_TOUR_STEPS = [
  {
    selector: '.cs-topbar-title',
    title: 'Welcome to Codestellation',
    body: 'This is your command center: a home screen for every coding project you\'ve imported, built from your real local Claude Code / Codex session history and git repos, not sample data.',
  },
  {
    selector: '.cs-star-identity',
    title: 'You are the command star',
    body: 'The name here comes from what you entered during setup. Everything orbiting around it is a project you\'ve imported.',
  },
  {
    selector: '.cs-celestial-target',
    title: 'Each target is one project',
    body: 'Hover one to highlight it, click to select it. Its color was either auto-generated or picked by you during import.',
  },
  {
    selector: '.cs-celestial-labels',
    title: 'Selecting a project',
    body: 'Clicking a project shows its name, path, and an "Open workspace" button in a card here. That workspace is where the real data lives: stats, chats, branches, graph, and work log, all specific to that one project. A "← Back to system" button appears in the top-left once you\'ve selected one.',
  },
  {
    selector: '.cs-topbar-add',
    title: 'Import more projects any time',
    body: 'This re-runs the project-discovery step of setup without making you redo your name or re-detect Claude/Codex — it just looks for anything new in your session history.',
  },
];

export class HomeView extends ItemView {
  private plugin: CodestellationPlugin;
  private galaxy: GalaxyScene | null = null;
  private disposeGreeting: (() => void) | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(leaf: WorkspaceLeaf, plugin: CodestellationPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string { return VIEW_TYPE_HOME; }
  getDisplayText(): string { return 'Codestellation'; }
  getIcon(): string { return 'orbit'; }

  async onOpen() {
    const eventBus = this.app.workspace as unknown as Events;
    this.registerEvent(eventBus.on('codestellation:refresh-home', () => this.reload()));
    await this.buildScene({ showGreetingAnim: true });
  }

  private async reload() {
    this.teardown();
    await this.buildScene({ showGreetingAnim: false });
  }

  private async buildScene({ showGreetingAnim }: { showGreetingAnim: boolean }) {
    const container = this.containerEl.children[1] as HTMLElement;
    container.empty();
    container.style.padding = '0';

    const allRegistry = await loadRegistry(this.app.vault);
    const registry = allRegistry.filter((entry) => !entry.hidden);
    const [graphNodeCounts, projectBranches] = await Promise.all([
      this.loadGraphNodeCounts(allRegistry),
      this.loadProjectBranches(allRegistry),
    ]);
    const shell = container.createDiv({ cls: 'cs-shell cs-home-shell cs-galaxy-shell' });
    applyCodestellationAppearance(shell, this.plugin.settings);
    const topbar = shell.createDiv({ cls: 'cs-topbar cs-galaxy-topbar' });
    topbar.createDiv({ cls: 'cs-topbar-title', text: 'Codestellation' });
    const topbarActions = topbar.createDiv({ cls: 'cs-topbar-actions' });
    const addBtn = topbarActions.createEl('button', { cls: 'cs-btn cs-btn-ghost cs-topbar-add', text: '+ Add project' });
    addBtn.addEventListener('click', () => new OnboardingWizardModal(this.app, this.plugin, 'projects', () => this.reload()).open());
    const manageBtn = topbarActions.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: 'Manage' });
    const helpBtn = topbarActions.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: '? Help' });
    helpBtn.addEventListener('click', () => new HelpModal(this.app, () => new GuideTour(shell, HOME_TOUR_STEPS).start()).open());

    const manager = shell.createDiv({ cls: 'cs-project-manager' });
    manager.hidden = true;
    manager.createDiv({ cls: 'cs-project-manager-title', text: 'Manage project worlds' });
    manager.createDiv({ cls: 'cs-project-manager-subtitle', text: 'Hide worlds temporarily or remove only their Codestellation registration.' });
    const appearanceControls = manager.createDiv({ cls: 'cs-project-manager-appearance' });
    const fontControl = appearanceControls.createEl('label', { cls: 'cs-manager-control' });
    fontControl.createSpan({ text: 'Interface font' });
    const fontSelect = fontControl.createEl('select', { cls: 'cs-filter' });
    [['obsidian', 'Obsidian'], ['system', 'System'], ['serif', 'Editorial serif'], ['mono', 'Monospace']].forEach(([value, text]) => fontSelect.createEl('option', { value, text }));
    fontSelect.value = this.plugin.settings.interfaceFont;
    fontSelect.addEventListener('change', () => {
      this.plugin.settings.interfaceFont = fontSelect.value as typeof this.plugin.settings.interfaceFont;
      applyCodestellationAppearance(shell, this.plugin.settings);
      this.plugin.saveSettings();
    });
    const accentControl = appearanceControls.createEl('label', { cls: 'cs-manager-control' });
    accentControl.createSpan({ text: 'Galaxy accent' });
    const accentSlider = accentControl.createEl('input', { cls: 'cs-manager-accent-slider', type: 'range' });
    accentSlider.min = '0';
    accentSlider.max = '359';
    accentSlider.value = String(this.plugin.settings.galaxyAccentHue);
    accentSlider.addEventListener('input', () => {
      this.plugin.settings.galaxyAccentHue = Number(accentSlider.value);
      applyCodestellationAppearance(shell, this.plugin.settings);
    });
    accentSlider.addEventListener('change', () => this.plugin.saveSettings().then(() => this.reload()));
    const intensityControl = appearanceControls.createEl('label', { cls: 'cs-manager-control' });
    intensityControl.createSpan({ text: 'Scene' });
    const intensitySelect = intensityControl.createEl('select', { cls: 'cs-filter' });
    intensitySelect.createEl('option', { value: 'minimal', text: 'Minimal · low-end PCs' });
    intensitySelect.createEl('option', { value: 'calm', text: 'Calm' });
    intensitySelect.createEl('option', { value: 'cinematic', text: 'Cinematic' });
    intensitySelect.value = this.plugin.settings.sceneIntensity;
    intensitySelect.addEventListener('change', () => {
      this.plugin.settings.sceneIntensity = intensitySelect.value as typeof this.plugin.settings.sceneIntensity;
      this.plugin.saveSettings().then(() => this.reload());
    });
    const managerList = manager.createDiv({ cls: 'cs-project-manager-list' });
    allRegistry.forEach((entry) => this.renderProjectManagerRow(managerList, entry, allRegistry));
    manageBtn.addEventListener('click', () => {
      manager.hidden = !manager.hidden;
      manageBtn.classList.toggle('is-active', !manager.hidden);
    });

    const solarWrap = shell.createDiv({ cls: 'cs-solar-wrap cs-galaxy-wrap' });
    const intro = solarWrap.createDiv({ cls: 'cs-home-intro cs-galaxy-intro' });
    intro.createDiv({ cls: 'cs-home-eyebrow', text: 'Live project system' });
    intro.createDiv({ cls: 'cs-home-title', text: 'Your work, in orbit.' });
    const hiddenCount = allRegistry.length - registry.length;
    intro.createDiv({ cls: 'cs-home-subtitle', text: `${registry.length} active project${registry.length === 1 ? '' : 's'}${hiddenCount ? ` · ${hiddenCount} hidden` : ''} · select a world to enter` });
    intro.createDiv({ cls: 'cs-home-preview-banner', text: 'Preview build · evolving in small steps · occasional breakage is expected' });

    const hubStage = shell.createDiv({ cls: 'cs-hub-stage' });
    const hubBack = hubStage.createEl('button', { cls: 'cs-btn cs-btn-ghost cs-hub-back', text: '← Back to system' });
    hubBack.hidden = true;
    const hubContent = hubStage.createDiv({ cls: 'cs-hub-content cs-galaxy-project-card cs-world-inspector' });

    if (registry.length === 0) {
      this.renderEmptyState(solarWrap, hiddenCount > 0 ? 'All project worlds are hidden. Use Manage to restore one.' : undefined);
      return;
    }

    const galaxyHost = solarWrap.createDiv({ cls: 'cs-galaxy-host' });
    const labels = solarWrap.createDiv({ cls: 'cs-celestial-labels' });
    const starIdentity = labels.createDiv({ cls: 'cs-star-identity' });
    starIdentity.createSpan({ cls: 'cs-star-identity-name', text: this.plugin.settings.userName || 'You' });
    starIdentity.createSpan({ cls: 'cs-star-identity-role', text: 'Command star' });
    const cameraControls = solarWrap.createDiv({ cls: 'cs-galaxy-controls' });
    const rotateLeft = cameraControls.createEl('button', { cls: 'cs-galaxy-control', text: '↺' });
    rotateLeft.setAttribute('aria-label', 'Rotate system left');
    const zoomOut = cameraControls.createEl('button', { cls: 'cs-galaxy-control', text: '−' });
    zoomOut.setAttribute('aria-label', 'Zoom out');
    const fitSystem = cameraControls.createEl('button', { cls: 'cs-galaxy-control cs-galaxy-control-fit', text: 'Fit' });
    fitSystem.setAttribute('aria-label', 'Fit all planets in view');
    const zoomIn = cameraControls.createEl('button', { cls: 'cs-galaxy-control', text: '+' });
    zoomIn.setAttribute('aria-label', 'Zoom in');
    const rotateRight = cameraControls.createEl('button', { cls: 'cs-galaxy-control', text: '↻' });
    rotateRight.setAttribute('aria-label', 'Rotate system right');
    cameraControls.createSpan({ cls: 'cs-galaxy-control-hint', text: 'Drag to rotate · scroll to zoom' });

    const projectTargets = new Map<string, HTMLButtonElement>();
    registry.forEach((entry, index) => {
      const target = labels.createEl('button', { cls: 'cs-celestial-target' });
      target.style.setProperty('--planet-hue', String(entry.hue));
      target.setAttribute('aria-label', `Open ${entry.name}`);
      target.dataset.projectId = entry.id;
      target.createSpan({ cls: 'cs-celestial-target-ring' });
      const copy = target.createSpan({ cls: 'cs-celestial-target-copy' });
      copy.createSpan({ cls: 'cs-celestial-target-name', text: entry.name });
      if (createPlanetIdentity(entry, index, graphNodeCounts.get(entry.id)).hasLife) {
        copy.createSpan({ cls: 'cs-celestial-life', text: '● Living world' });
      }
      copy.createSpan({ cls: 'cs-celestial-target-hint', text: 'Enter workspace' });
      projectTargets.set(entry.id, target);
    });

    let currentEntry: RegistryEntry | null = null;
    let galaxy: GalaxyScene | null = null;

    const updateTargetPosition = ({ id, x, y, depth, visible }: GalaxyProjectPosition) => {
      const target = projectTargets.get(id);
      if (!target) return;
      const depthScale = Math.max(0.82, Math.min(1.12, 1 - depth * 0.08));
      target.style.setProperty('--cs-project-x', `${x}px`);
      target.style.setProperty('--cs-project-y', `${y}px`);
      target.style.setProperty('--cs-project-scale', String(depthScale));
      target.style.zIndex = String(Math.round(20 - depth * 6));
      target.classList.toggle('is-behind', depth > 0.76 || !visible);
    };

    const renderProjectPreview = (entry: RegistryEntry) => {
      hubContent.empty();
      const preview = hubContent.createDiv({ cls: 'cs-project-preview' });
      preview.appendChild(hubBack);
      hubBack.hidden = false;
      preview.createDiv({ cls: 'cs-home-eyebrow', text: 'Selected world' });
      preview.createDiv({ cls: 'cs-planet-card-name', text: entry.name });
      preview.createDiv({ cls: 'cs-planet-card-sub', text: entry.path });
      const projectIndex = registry.findIndex((candidate) => candidate.id === entry.id);
      const identity = createPlanetIdentity(entry, projectIndex, graphNodeCounts.get(entry.id));
      const worldMeta = preview.createDiv({ cls: 'cs-world-meta' });
      const nodeCount = graphNodeCounts.get(entry.id);
      if (nodeCount !== undefined) worldMeta.createSpan({ cls: 'cs-world-chip', text: `${nodeCount.toLocaleString()} graph nodes` });
      const branchList = projectBranches.get(entry.id) ?? [];
      const branchCount = branchList.length;
      worldMeta.createSpan({ cls: 'cs-world-chip', text: `${branchCount} branch orbital${branchCount === 1 ? '' : 's'}` });
      let lifeChip: HTMLSpanElement | null = null;
      if (identity.hasLife) lifeChip = worldMeta.createSpan({ cls: 'cs-world-chip cs-world-chip-life', text: '● Living world' });
      preview.createDiv({ cls: 'cs-project-preview-copy', text: 'Chats, branches, graph context, activity, and work logs—together in one focused workspace.' });
      const appearance = preview.createDiv({ cls: 'cs-world-appearance' });
      appearance.style.setProperty('--world-hue', String(entry.hue));
      const appearanceHeader = appearance.createDiv({ cls: 'cs-world-appearance-header' });
      appearanceHeader.createSpan({ text: 'Planet color' });
      const colorValue = appearanceHeader.createSpan({ cls: 'cs-world-color-value', text: `${Math.round(entry.hue)}°` });
      const colorSlider = appearance.createEl('input', { cls: 'cs-world-color-slider', type: 'range' });
      colorSlider.min = '0';
      colorSlider.max = '359';
      colorSlider.step = '1';
      colorSlider.value = String(Math.round(entry.hue));
      colorSlider.setAttribute('aria-label', `Planet color for ${entry.name}`);
      colorSlider.style.setProperty('--world-hue', String(entry.hue));
      colorSlider.addEventListener('input', () => {
        const hue = Number(colorSlider.value);
        entry.hue = hue;
        colorValue.setText(`${hue}°`);
        appearance.style.setProperty('--world-hue', String(hue));
        projectTargets.get(entry.id)?.style.setProperty('--planet-hue', String(hue));
        galaxy?.setProjectHue(entry.id, hue);
      });
      colorSlider.addEventListener('change', () => {
        saveRegistry(this.app.vault, allRegistry).catch((error) => {
          logger.error('failed to save planet color for', entry.id, error);
          new Notice(`Couldn't save the planet color for ${entry.name}.`);
        });
      });
      const sizeHeader = appearance.createDiv({ cls: 'cs-world-appearance-header cs-world-size-header' });
      sizeHeader.createSpan({ text: 'Planet size' });
      const sizeValue = sizeHeader.createSpan({ cls: 'cs-world-size-value', text: `${Math.round((entry.planetScale ?? 1) * 100)}%` });
      const sizeSlider = appearance.createEl('input', { cls: 'cs-world-size-slider', type: 'range' });
      sizeSlider.min = '65';
      sizeSlider.max = '118';
      sizeSlider.step = '1';
      sizeSlider.value = String(Math.round((entry.planetScale ?? 1) * 100));
      sizeSlider.setAttribute('aria-label', `Planet size for ${entry.name}`);
      sizeSlider.addEventListener('input', () => {
        const scale = Number(sizeSlider.value) / 100;
        entry.planetScale = scale;
        sizeValue.setText(`${sizeSlider.value}%`);
        galaxy?.setProjectScale(entry.id, scale);
      });
      sizeSlider.addEventListener('change', () => {
        saveRegistry(this.app.vault, allRegistry).catch((error) => {
          logger.error('failed to save planet size for', entry.id, error);
          new Notice(`Couldn't save the planet size for ${entry.name}.`);
        });
      });
      const lifeToggle = appearance.createEl('label', { cls: 'cs-world-life-toggle' });
      const lifeInput = lifeToggle.createEl('input', { type: 'checkbox' });
      lifeInput.checked = identity.hasLife;
      const lifeCopy = lifeToggle.createSpan();
      lifeCopy.createSpan({ cls: 'cs-world-life-title', text: 'Living world' });
      lifeCopy.createSpan({ cls: 'cs-world-life-subtitle', text: 'Oceans, continents, clouds, and a biosphere glow' });
      lifeInput.addEventListener('change', () => {
        entry.hasLife = lifeInput.checked;
        galaxy?.setProjectLife(entry.id, lifeInput.checked);
        const targetCopy = projectTargets.get(entry.id)?.querySelector('.cs-celestial-target-copy');
        targetCopy?.querySelector('.cs-celestial-life')?.remove();
        if (lifeInput.checked && targetCopy) {
          const badge = document.createElement('span');
          badge.className = 'cs-celestial-life';
          badge.textContent = '● Living world';
          targetCopy.insertBefore(badge, targetCopy.querySelector('.cs-celestial-target-hint'));
          lifeChip ??= worldMeta.createSpan({ cls: 'cs-world-chip cs-world-chip-life', text: '● Living world' });
        } else {
          lifeChip?.remove();
          lifeChip = null;
        }
        saveRegistry(this.app.vault, allRegistry).catch((error) => {
          logger.error('failed to save living-world choice for', entry.id, error);
          new Notice(`Couldn't save the living-world choice for ${entry.name}.`);
        });
      });
      const moonCount = branchList.filter((branch) => branch.location !== 'remote').length;
      const satelliteCount = branchList.filter((branch) => branch.location === 'remote').length;
      const orbitals = appearance.createDiv({ cls: 'cs-world-orbitals' });
      const orbitalsHeading = orbitals.createDiv({ cls: 'cs-world-orbitals-heading' });
      orbitalsHeading.createSpan({ text: 'Branch orbitals' });
      orbitalsHeading.createSpan({ cls: 'cs-world-orbitals-total', text: `${branchCount} branches` });
      const addOrbitalToggle = (kind: 'moon' | 'satellite', label: string, count: number, checked: boolean) => {
        const toggle = orbitals.createEl('label', { cls: 'cs-world-orbital-toggle' });
        const input = toggle.createEl('input', { type: 'checkbox' });
        input.checked = checked;
        const copy = toggle.createSpan();
        copy.createSpan({ cls: 'cs-world-orbital-title', text: label });
        copy.createSpan({ cls: 'cs-world-orbital-subtitle', text: `${count} ${kind === 'moon' ? 'local/shared branches' : 'remote-only branches'}` });
        input.addEventListener('change', () => {
          if (kind === 'moon') entry.showBranchMoons = input.checked;
          else entry.showBranchSatellites = input.checked;
          galaxy?.setProjectOrbitalVisible(entry.id, kind, input.checked);
          saveRegistry(this.app.vault, allRegistry).catch((error) => {
            logger.error('failed to save branch orbital visibility for', entry.id, error);
            new Notice(`Couldn't save branch orbital visibility for ${entry.name}.`);
          });
        });
      };
      addOrbitalToggle('moon', 'Show moons', moonCount, entry.showBranchMoons !== false);
      addOrbitalToggle('satellite', 'Show satellites', satelliteCount, entry.showBranchSatellites !== false);
      const actionRow = preview.createDiv({ cls: 'cs-project-preview-actions' });
      const launchBtn = actionRow.createEl('button', { cls: 'cs-btn cs-btn-primary', text: 'Open workspace →' });
      launchBtn.addEventListener('click', () => {
        this.plugin.activateWorkspaceView(entry.id).catch((error) => {
          logger.error('failed to open workspace view for', entry.id, error);
          new Notice(`Couldn't open the workspace for ${entry.name}: ${(error as Error).message ?? error}`);
        });
      });
      const hideBtn = actionRow.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: 'Hide' });
      hideBtn.addEventListener('click', () => {
        entry.hidden = true;
        saveRegistry(this.app.vault, allRegistry).then(() => this.reload()).catch((error) => {
          logger.error('failed to hide project', entry.id, error);
          new Notice(`Couldn't hide ${entry.name}.`);
        });
      });
      const removeBtn = actionRow.createEl('button', { cls: 'cs-btn cs-btn-danger-ghost', text: 'Remove…' });
      this.bindRegistryRemoval(removeBtn, entry, allRegistry);
      hubContent.classList.add('is-visible');
    };

    const selectProject = (entry: RegistryEntry) => {
      if (currentEntry) return;
      currentEntry = entry;
      hubStage.classList.add('is-active');
      solarWrap.classList.add('is-backgrounded');
      projectTargets.forEach((target, id) => target.classList.toggle('is-selected', id === entry.id));
      galaxy?.focusProject(entry.id, () => renderProjectPreview(entry));
      if (!galaxy) renderProjectPreview(entry);
    };

    projectTargets.forEach((target, id) => {
      const entry = registry.find((candidate) => candidate.id === id);
      if (!entry) return;
      target.addEventListener('mouseenter', () => galaxy?.setHighlightedProject(id));
      target.addEventListener('mouseleave', () => galaxy?.setHighlightedProject(null));
      target.addEventListener('focus', () => galaxy?.setHighlightedProject(id));
      target.addEventListener('blur', () => galaxy?.setHighlightedProject(null));
      target.addEventListener('click', () => selectProject(entry));
    });

    const returnToSystem = () => {
      if (!currentEntry) return;
      hubContent.classList.remove('is-visible');
      hubBack.hidden = true;
      const finish = () => {
        hubStage.classList.remove('is-active');
        solarWrap.classList.remove('is-backgrounded');
        projectTargets.forEach((target) => target.classList.remove('is-selected'));
        currentEntry = null;
      };
      galaxy?.returnToSystem(finish);
      if (!galaxy) finish();
    };
    hubBack.addEventListener('click', returnToSystem);
    rotateLeft.addEventListener('click', () => galaxy?.rotateBy(-0.22, 0));
    rotateRight.addEventListener('click', () => galaxy?.rotateBy(0.22, 0));
    zoomOut.addEventListener('click', () => galaxy?.zoomBy(1.18));
    zoomIn.addEventListener('click', () => galaxy?.zoomBy(0.84));
    fitSystem.addEventListener('click', () => galaxy?.fitSystem());
    shell.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && currentEntry) {
        event.preventDefault();
        returnToSystem();
      }
    });

    try {
      galaxy = new GalaxyScene({
        container: galaxyHost,
        entries: registry,
        graphNodeCounts,
        projectBranches,
        sceneIntensity: this.plugin.settings.sceneIntensity,
        galaxyAccentHue: this.plugin.settings.galaxyAccentHue,
        onProjectPosition: updateTargetPosition,
      });
      this.galaxy = galaxy;
    } catch (error) {
      logger.error('3D galaxy initialization failed; using accessible project list', error);
      galaxyHost.remove();
      labels.classList.add('is-fallback');
      projectTargets.forEach((target) => target.classList.add('is-fallback'));
    }

    this.resizeObserver = new ResizeObserver((entries) => {
      const visible = entries[0]?.contentRect.width > 0 && entries[0]?.contentRect.height > 0;
      if (!visible) galaxy?.stop();
      else {
        galaxy?.resize();
        galaxy?.start();
      }
    });
    this.resizeObserver.observe(shell);

    if (!showGreetingAnim) {
      galaxy?.start();
      return;
    }

    solarWrap.style.opacity = '0';
    this.disposeGreeting = showGreeting(shell, {
      name: this.plugin.settings.userName || 'there',
      onDone: () => {
        solarWrap.style.transition = 'opacity 900ms ease';
        solarWrap.style.opacity = '1';
        galaxy?.start();
      },
    });
  }

  private renderProjectManagerRow(container: HTMLElement, entry: RegistryEntry, allRegistry: RegistryEntry[]) {
    const row = container.createDiv({ cls: 'cs-project-manager-row' });
    const copy = row.createDiv({ cls: 'cs-project-manager-copy' });
    copy.createDiv({ cls: 'cs-project-manager-name', text: entry.name });
    copy.createDiv({ cls: 'cs-project-manager-path', text: entry.path });
    const actions = row.createDiv({ cls: 'cs-project-manager-actions' });
    const visibilityBtn = actions.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: entry.hidden ? 'Show' : 'Hide' });
    visibilityBtn.addEventListener('click', () => {
      entry.hidden = !entry.hidden;
      saveRegistry(this.app.vault, allRegistry).then(() => this.reload()).catch((error) => {
        logger.error('failed to update project visibility', entry.id, error);
        new Notice(`Couldn't ${entry.hidden ? 'hide' : 'show'} ${entry.name}.`);
      });
    });
    const removeBtn = actions.createEl('button', { cls: 'cs-btn cs-btn-danger-ghost', text: 'Remove…' });
    this.bindRegistryRemoval(removeBtn, entry, allRegistry);
  }

  private bindRegistryRemoval(button: HTMLButtonElement, entry: RegistryEntry, allRegistry: RegistryEntry[]) {
    let armed = false;
    let resetTimer: number | null = null;
    button.addEventListener('click', () => {
      if (!armed) {
        armed = true;
        button.setText('Confirm remove');
        button.classList.add('is-armed');
        resetTimer = window.setTimeout(() => {
          armed = false;
          button.setText('Remove…');
          button.classList.remove('is-armed');
        }, 5000);
        return;
      }
      if (resetTimer !== null) window.clearTimeout(resetTimer);
      const index = allRegistry.findIndex((candidate) => candidate.id === entry.id);
      if (index >= 0) allRegistry.splice(index, 1);
      saveRegistry(this.app.vault, allRegistry).then(() => {
        new Notice(`${entry.name} was removed from Codestellation. Project files were not touched.`);
        return this.reload();
      }).catch((error) => {
        logger.error('failed to remove project registration', entry.id, error);
        new Notice(`Couldn't remove ${entry.name} from Codestellation.`);
      });
    });
  }

  private renderEmptyState(solarWrap: HTMLElement, message = 'No project worlds yet.') {
    const empty = solarWrap.createDiv({ cls: 'cs-empty' });
    empty.createEl('p', { text: message });
    const btn = empty.createEl('button', { cls: 'cs-btn cs-btn-primary', text: 'Import a project' });
    btn.addEventListener('click', () => new OnboardingWizardModal(this.app, this.plugin, 'projects', () => this.reload()).open());
  }

  private async loadGraphNodeCounts(registry: RegistryEntry[]): Promise<Map<string, number>> {
    const counts = new Map<string, number>();
    await Promise.all(registry.map(async (entry) => {
      if (!entry.graphPath) return;
      const graphFolder = entry.graphPath.replace(/\/graph\.canvas$/, '');
      try {
        const listing = await this.app.vault.adapter.list(graphFolder);
        const graphNotes = listing.files.filter((file) => file.endsWith('.md')).length;
        if (graphNotes > 0) counts.set(entry.id, graphNotes);
      } catch (error) {
        logger.debug('could not count graph nodes for planet sizing', entry.id, error);
      }
    }));
    return counts;
  }

  private async loadProjectBranches(registry: RegistryEntry[]) {
    const branches = new Map<string, Awaited<ReturnType<typeof listProjectBranches>>>();
    await Promise.all(registry.map(async (entry) => {
      try {
        branches.set(entry.id, await listProjectBranches(entry.path));
      } catch (error) {
        logger.debug('could not load git branches for orbital objects', entry.id, error);
        branches.set(entry.id, []);
      }
    }));
    return branches;
  }

  private teardown() {
    this.galaxy?.dispose();
    this.disposeGreeting?.();
    this.resizeObserver?.disconnect();
    this.galaxy = null;
    this.disposeGreeting = null;
    this.resizeObserver = null;
  }

  async onClose() {
    this.teardown();
  }
}
