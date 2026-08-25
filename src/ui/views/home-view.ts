import { ItemView, Notice, WorkspaceLeaf, Events } from 'obsidian';
import { VIEW_TYPE_HOME } from '../../constants';
import type CodestellationPlugin from '../../main';
import { loadRegistry, type RegistryEntry } from '../../domain/project-registry';
import { OrbitEngine } from '../solar/orbit-engine';
import { createPlanets, planetRadiusForIndex, positionPlanets } from '../solar/planet';
import { createSun } from '../solar/sun';
import { showGreeting } from '../solar/greeting';
import { createFlightController, type FlightController } from '../solar/fly-to-center';
import { OnboardingWizardModal } from '../onboarding/wizard-modal';
import { logger } from '../../core/logger';

export class HomeView extends ItemView {
  private plugin: CodestellationPlugin;
  private engine: OrbitEngine | null = null;
  private flight: FlightController | null = null;
  private disposeGreeting: (() => void) | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(leaf: WorkspaceLeaf, plugin: CodestellationPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return VIEW_TYPE_HOME;
  }

  getDisplayText(): string {
    return 'Codestellation';
  }

  getIcon(): string {
    return 'orbit';
  }

  async onOpen() {
    // codestellation:refresh-home isn't a built-in Obsidian workspace
    // event, so it's sent/received via a cast (see main.ts's
    // notifyProjectsChanged) — this is what makes a project imported
    // from the ribbon icon or command palette actually show up as a new
    // planet without the user having to close and reopen this pane.
    const eventBus = this.app.workspace as unknown as Events;
    this.registerEvent(eventBus.on('codestellation:refresh-home', () => this.reload()));
    await this.buildScene({ showGreetingAnim: true });
  }

  /** Re-renders in place after the project registry changes, skipping the greeting replay since the user is already looking at the pane. */
  private async reload() {
    this.teardown();
    await this.buildScene({ showGreetingAnim: false });
  }

  private async buildScene({ showGreetingAnim }: { showGreetingAnim: boolean }) {
    const container = this.containerEl.children[1] as HTMLElement;
    container.empty();
    container.style.padding = '0'; // .cs-shell owns its own spacing; Obsidian's default view padding fights the pane-filling layout

    const registry = await loadRegistry(this.app.vault);

    const shell = container.createDiv({ cls: 'cs-shell cs-home-shell' });
    const topbar = shell.createDiv({ cls: 'cs-topbar' });
    topbar.createDiv({ cls: 'cs-topbar-title', text: 'Codestellation' });
    const addBtn = topbar.createEl('button', { cls: 'cs-btn cs-btn-ghost cs-topbar-add', text: '+ Add project' });
    addBtn.addEventListener('click', () =>
      new OnboardingWizardModal(this.app, this.plugin, 'projects', () => this.reload()).open()
    );

    const solarWrap = shell.createDiv({ cls: 'cs-solar-wrap' });
    const intro = solarWrap.createDiv({ cls: 'cs-home-intro' });
    intro.createDiv({ cls: 'cs-home-eyebrow', text: 'Project constellation' });
    intro.createDiv({ cls: 'cs-home-title', text: 'Choose where to focus.' });
    intro.createDiv({
      cls: 'cs-home-subtitle',
      text: `${registry.length} project${registry.length === 1 ? '' : 's'} in orbit · select one to open its workspace`,
    });
    const hubStage = shell.createDiv({ cls: 'cs-hub-stage' });
    const hubBack = hubStage.createEl('button', { cls: 'cs-btn cs-btn-ghost cs-hub-back', text: '← Back' });
    hubBack.hidden = true;
    const hubHole = hubStage.createDiv({ cls: 'cs-hub-hole' });
    const hubContent = hubStage.createDiv({ cls: 'cs-hub-content' });

    if (registry.length === 0) {
      this.renderEmptyState(solarWrap);
      return;
    }

    const orbitRings = solarWrap.createDiv({ cls: 'cs-orbit-rings' });
    registry.forEach((_, index) => {
      const diameter = planetRadiusForIndex(index) * 2;
      const ring = orbitRings.createDiv({ cls: 'cs-orbit-ring' });
      ring.style.width = `${diameter}px`;
      ring.style.height = `${diameter}px`;
    });

    let flyingProjectId: string | null = null;
    const engine = new OrbitEngine({ onTick: (positions) => positionPlanets(planetElements, positions, { skipId: flyingProjectId }) });
    this.engine = engine;

    const { sun, label: sunLabel } = createSun(solarWrap, { name: this.plugin.settings.userName || 'You' });
    const flight = createFlightController({ shell, engine });
    this.flight = flight;

    let currentPlanetEl: HTMLElement | null = null;

    const planetElements = createPlanets(solarWrap, registry, engine, {
      onSelect: (entry, el) => onPlanetSelected(entry, el),
    });

    const onPlanetSelected = (entry: RegistryEntry, planetEl: HTMLElement) => {
      if (flight.getState() !== 'idle') return;
      currentPlanetEl = planetEl;
      flyingProjectId = entry.id;
      sun.classList.add('is-exiting');
      sunLabel.classList.add('is-exiting');
      hubStage.classList.add('is-active');
      solarWrap.classList.add('is-backgrounded');
      engine.stop();

      flight.flyIn(entry.id, planetEl, hubHole, {
        onFocused: () => {
          hubBack.hidden = false;
          hubContent.empty();
          const preview = hubContent.createDiv({ cls: 'cs-project-preview' });
          preview.createDiv({ cls: 'cs-home-eyebrow', text: 'Project workspace' });
          preview.createDiv({ cls: 'cs-planet-card-name', text: entry.name });
          preview.createDiv({ cls: 'cs-planet-card-sub', text: entry.path });
          preview.createDiv({
            cls: 'cs-project-preview-copy',
            text: 'Chats, branches, graph context, activity, and work logs—together in one focused view.',
          });
          const actionRow = preview.createDiv({ cls: 'cs-project-preview-actions' });
          const launchBtn = actionRow.createEl('button', { cls: 'cs-btn cs-btn-primary', text: 'Open workspace' });
          launchBtn.addEventListener('click', () => {
            // opening the workspace view is async and can throw (bad view
            // state, a leaf API change, etc.) — without this, a failure here
            // is completely silent: the button just looks like it did nothing
            this.plugin.activateWorkspaceView(entry.id).catch((e) => {
              logger.error('failed to open workspace view for', entry.id, e);
              new Notice(`Couldn't open the workspace for ${entry.name}: ${(e as Error).message ?? e}`);
            });
          });
          hubContent.classList.add('is-visible');
        },
      });
    };

    const returnToOrbit = () => {
      hubContent.classList.remove('is-visible');
      hubBack.hidden = true;
      flight.flyOut({
        onIdle: () => {
          sun.classList.remove('is-exiting');
          sunLabel.classList.remove('is-exiting');
          hubStage.classList.remove('is-active');
          solarWrap.classList.remove('is-backgrounded');
          currentPlanetEl = null;
          flyingProjectId = null;
          engine.start();
        },
      });
    };
    hubBack.addEventListener('click', returnToOrbit);

    // pause the whole orbit loop while the pane is hidden (a different tab
    // is focused, or the pane is scrolled out of a sidebar) — an ambient
    // rAF loop ticking on a view nobody can see is pure wasted CPU
    this.resizeObserver = new ResizeObserver((entries) => {
      const visible = entries[0]?.contentRect.width > 0 && entries[0]?.contentRect.height > 0;
      if (!visible) engine.stop();
      else if (flight.getState() === 'idle') engine.start();
    });
    this.resizeObserver.observe(shell);

    if (!showGreetingAnim) {
      engine.start();
      return;
    }

    solarWrap.style.opacity = '0';
    this.disposeGreeting = showGreeting(shell, {
      name: this.plugin.settings.userName || 'there',
      onDone: () => {
        solarWrap.style.transition = 'opacity 900ms ease';
        solarWrap.style.opacity = '1';
        engine.start();
      },
    });
  }

  private renderEmptyState(solarWrap: HTMLElement) {
    const empty = solarWrap.createDiv({ cls: 'cs-empty' });
    empty.style.textAlign = 'center';
    empty.createEl('p', { text: 'No projects imported yet.' });
    const btn = empty.createEl('button', { cls: 'cs-btn cs-btn-primary', text: 'Import a project' });
    btn.addEventListener('click', () => new OnboardingWizardModal(this.app, this.plugin, 'projects', () => this.reload()).open());
  }

  private teardown() {
    // the orbit engine's rAF loop must be stopped here, or it keeps
    // ticking (and repositioning DOM nodes that no longer exist) even
    // after the scene is torn down — exactly the kind of leak Phase 0/5
    // called out as a risk for a long-lived ambient animation
    this.engine?.stop();
    this.disposeGreeting?.();
    this.resizeObserver?.disconnect();
    this.engine = null;
    this.flight = null;
    this.disposeGreeting = null;
    this.resizeObserver = null;
  }

  async onClose() {
    this.teardown();
  }
}
