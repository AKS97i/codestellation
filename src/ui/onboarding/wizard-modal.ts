import { App, Modal, Setting, Notice, FileSystemAdapter } from 'obsidian';
import type CodestellationPlugin from '../../main';
import { detectAgentAvailability, detectGraphify, projectHasGraph } from '../../adapters/detect';
import { discoverAllProjects, type DiscoveredProject } from './discovered-project';
import { addImportedProject, loadRegistry, saveRegistry, slugify } from '../../domain/project-registry';
import { baseFolderPlan, projectFolderPlan, ensureFolders } from '../../vault/folders';
import { writeProjectOverview } from '../../vault/note-writer';
import { VAULT_PROJECTS_FOLDER } from '../../constants';
import { run } from '../../core/shell';
import { hueFromId, hueToHex, hexToHue } from '../../core/hue';
import { parseGraphJson } from '../../adapters/graphify/graph-json';
import { filterToTopCommunities } from '../../adapters/graphify/filter';
import { recolorCanvasGroups } from '../../adapters/graphify/canvas';
import { ensureGraphifyOutIgnored } from '../../adapters/git/gitignore';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import * as os from 'node:os';

// Above this node count, the "lite" export option (see ExportMode below)
// becomes worth offering — informational threshold only, never a block.
// A 5511-node real project tested during implementation exported 5876
// note files with a "full" export; the user wants that available as a
// real, explicit choice rather than a decision made silently for them.
const LARGE_GRAPH_NODE_THRESHOLD = 300;
const LITE_EXPORT_NODE_BUDGET = 300;

type ExportMode = 'full' | 'lite';

type Step = 'name' | 'detect' | 'projects' | 'graphify' | 'folders' | 'done';

/**
 * Wraps an async button handler so a thrown error surfaces as a visible
 * Notice instead of silently swallowing — an unguarded async onClick that
 * throws (e.g. writing to a folder that doesn't exist yet) just looks like
 * the button did nothing, which is exactly the bug this wizard shipped
 * with once already.
 */
function guarded(fn: () => Promise<void>): () => void {
  return () => {
    fn().catch((e) => {
      console.error('[Codestellation] onboarding step failed', e);
      new Notice(`Something went wrong: ${(e as Error).message ?? e}`);
    });
  };
}

const STEP_ORDER: Step[] = ['name', 'detect', 'projects', 'graphify', 'folders', 'done'];

/**
 * The first-run setup wizard: name -> detect Claude/Codex -> "we found
 * you were working on X, import it?" -> per-project graphify check ->
 * vault folder setup with visible progress. See design spec Steps 1-2.
 *
 * Resumable: if the modal is closed mid-wizard, re-opening it (the plugin
 * re-triggers this automatically while onboardingComplete is false)
 * starts over from step 0, but every step's actual work (registry writes,
 * folder creation) is idempotent, so nothing gets duplicated or corrupted
 * by a repeat run.
 */
export class OnboardingWizardModal extends Modal {
  plugin: CodestellationPlugin;
  private stepIndex = 0;
  private userName = '';
  private discovered: DiscoveredProject[] = [];
  private selected = new Set<string>(); // cwd values
  private colors = new Map<string, string>(); // cwd -> hex, defaults to the hash-derived color until the user picks their own
  private graphifyNeeded: DiscoveredProject[] = [];
  private graphifyChoices = new Map<string, boolean>(); // cwd -> generate?
  private exportMode: ExportMode = 'full';

  private onFinished?: () => void;

  /**
   * @param startAt - skip straight to a later step, e.g. 'projects' for "add more projects" without re-asking name/detect. Defaults to the full sequence from the start.
   * @param onFinished - called when the modal closes, however it closes (finished, cancelled, or dismissed) — the Home view uses this to refresh its planets, since a newly-imported project otherwise doesn't appear until the pane is reopened.
   */
  constructor(app: App, plugin: CodestellationPlugin, startAt: Step = 'name', onFinished?: () => void) {
    super(app);
    this.plugin = plugin;
    this.userName = plugin.settings.userName;
    this.stepIndex = STEP_ORDER.indexOf(startAt);
    this.onFinished = onFinished;
  }

  async onOpen() {
    // the registry write in renderProjects() (and the base folders shown
    // in renderFolders() later) both need Codestellation/_data to already
    // exist — ensure it silently up front rather than making every step
    // that persists something guard against a missing parent folder
    await ensureFolders(this.app.vault, baseFolderPlan());
    this.render();
  }

  onClose() {
    this.onFinished?.();
    this.contentEl.empty();
  }

  private get step(): Step {
    return STEP_ORDER[this.stepIndex];
  }

  private goto(step: Step) {
    this.stepIndex = STEP_ORDER.indexOf(step);
    this.render();
  }

  private next() {
    this.stepIndex = Math.min(this.stepIndex + 1, STEP_ORDER.length - 1);
    this.render();
  }

  private render() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h2', { text: 'Codestellation setup' });

    switch (this.step) {
      case 'name': return this.renderName();
      case 'detect': return this.renderDetect();
      case 'projects': return this.renderProjects();
      case 'graphify': return this.renderGraphify();
      case 'folders': return this.renderFolders();
      case 'done': return this.renderDone();
    }
  }

  private renderName() {
    const { contentEl } = this;
    contentEl.createEl('p', { text: "What should Codestellation call you? This is used for the greeting on the home screen." });
    new Setting(contentEl).addText((text) =>
      text.setPlaceholder('Your name').setValue(this.userName).onChange((v) => { this.userName = v; })
    );
    new Setting(contentEl).addButton((btn) =>
      btn.setButtonText('Next').setCta().onClick(guarded(async () => {
        this.plugin.settings.userName = this.userName.trim() || 'there';
        await this.plugin.saveSettings();
        this.next();
      }))
    );
  }

  private async renderDetect() {
    const { contentEl } = this;
    contentEl.createEl('p', { text: 'Checking for Claude Code and Codex…' });
    const availability = await detectAgentAvailability();

    contentEl.empty();
    contentEl.createEl('h2', { text: 'Codestellation setup' });
    contentEl.createEl('p', {
      text: `Claude Code: ${availability.claudeCode ? 'found ✓' : 'not found'}. Codex: ${availability.codex ? 'found ✓' : 'not found'}.`,
    });

    if (!availability.claudeCode && !availability.codex) {
      contentEl.createEl('p', {
        text: "Neither was found on this machine. Codestellation reads their local session history to discover your projects. Install and run at least one of them, then come back here.",
        cls: 'setting-item-description',
      });
      new Setting(contentEl).addButton((btn) =>
        btn.setButtonText('Check again').onClick(() => this.render())
      );
      return;
    }

    new Setting(contentEl).addButton((btn) =>
      btn.setButtonText('Next').setCta().onClick(() => this.next())
    );
  }

  private async renderProjects() {
    const { contentEl } = this;
    contentEl.createEl('p', { text: 'Looking through your local session history…' });
    const allDiscovered = await discoverAllProjects();
    const registry = await loadRegistry(this.app.vault);
    const alreadyImported = new Set(registry.map((e) => e.path));
    // filters out projects already in the registry — this step can now be
    // re-run any time via the "Import a project" command, not just once
    // during first-run setup, so it shouldn't re-offer what's already in
    this.discovered = allDiscovered.filter((p) => !alreadyImported.has(p.cwd));

    contentEl.empty();
    contentEl.createEl('h2', { text: 'Codestellation setup' });

    if (this.discovered.length === 0) {
      const text = registry.length > 0
        ? 'No new projects found, everything in your session history is already imported.'
        : 'No existing projects found in your session history yet. You can add one later from the home screen.';
      contentEl.createEl('p', { text });
      new Setting(contentEl).addButton((btn) => btn.setButtonText(registry.length > 0 ? 'Close' : 'Next').setCta().onClick(() => {
        if (registry.length > 0) this.close();
        else this.goto('folders');
      }));
      return;
    }

    contentEl.createEl('p', { text: 'We found you were working on these. Pick which ones to import, and their planet color:' });
    for (const project of this.discovered) {
      if (!this.colors.has(project.cwd)) {
        this.colors.set(project.cwd, hueToHex(hueFromId(slugify(project.cwd))));
      }
      new Setting(contentEl)
        .setName(project.name)
        .setDesc(`${project.cwd} · ${project.sessionCount} session${project.sessionCount === 1 ? '' : 's'}`)
        .addColorPicker((picker) =>
          picker.setValue(this.colors.get(project.cwd)!).onChange((hex) => this.colors.set(project.cwd, hex))
        )
        .addToggle((toggle) =>
          toggle.setValue(this.selected.has(project.cwd)).onChange((v) => {
            if (v) this.selected.add(project.cwd);
            else this.selected.delete(project.cwd);
          })
        );
    }

    new Setting(contentEl).addButton((btn) =>
      btn.setButtonText('Next').setCta().onClick(guarded(async () => {
        const registry = await loadRegistry(this.app.vault);
        let updated = registry;
        for (const project of this.discovered) {
          if (this.selected.has(project.cwd)) {
            const hex = this.colors.get(project.cwd);
            updated = addImportedProject(updated, { name: project.name, path: project.cwd, hue: hex ? hexToHue(hex) : undefined });
          }
        }
        await saveRegistry(this.app.vault, updated);
        this.next();
      }))
    );
  }

  private async renderGraphify() {
    const { contentEl } = this;
    const selectedProjects = this.discovered.filter((p) => this.selected.has(p.cwd));

    if (selectedProjects.length === 0) {
      this.goto('folders');
      return;
    }

    contentEl.createEl('p', { text: 'Checking for existing graphify graphs…' });
    const graphifyAvailable = await detectGraphify();
    this.graphifyNeeded = [];
    for (const project of selectedProjects) {
      const hasGraph = await projectHasGraph(project.cwd);
      if (!hasGraph) this.graphifyNeeded.push(project);
    }

    contentEl.empty();
    contentEl.createEl('h2', { text: 'Codestellation setup' });

    new Setting(contentEl)
      .setName('Vault export')
      .setDesc(`How much of each graph to export into the vault. "Full" writes one note per node (can be thousands of files for a large project). "Lighter" keeps only the largest ~${LITE_EXPORT_NODE_BUDGET} nodes' worth of communities.`)
      .addDropdown((dd) =>
        dd
          .addOption('full', 'Full export (all nodes)')
          .addOption('lite', `Lighter export (top ~${LITE_EXPORT_NODE_BUDGET} nodes)`)
          .setValue(this.exportMode)
          .onChange((v) => { this.exportMode = v as ExportMode; })
      );

    if (!graphifyAvailable.installed) {
      contentEl.createEl('p', { text: "graphify isn't installed, so graphs can't be generated right now. Imported projects without an existing graph will just show as ungraphed for now." });
      const GRAPHIFY_INSTALL_CMD = 'pip install graphifyy';
      const installRow = contentEl.createEl('p');
      installRow.createSpan({ text: 'Install it with: ' });
      installRow.createEl('code', { text: GRAPHIFY_INSTALL_CMD });
      const copyBtn = installRow.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: 'Copy' });
      copyBtn.style.marginLeft = '8px';
      copyBtn.addEventListener('click', async () => {
        await navigator.clipboard.writeText(GRAPHIFY_INSTALL_CMD);
        new Notice('Copied. Run it, then reopen this wizard.');
      });
      if (process.platform === 'win32') {
        contentEl.createEl('p', {
          cls: 'setting-item-description',
          text: 'Already installed it? On Windows, Obsidian only sees PATH changes from a full restart, not just reopening this wizard. Fully quit and reopen Obsidian, then try again.',
        });
      }
      new Setting(contentEl).addButton((btn) => btn.setButtonText('Next').setCta().onClick(guarded(async () => {
        // some selected projects may already have a graph even though graphify itself
        // isn't on PATH right now (e.g. it ran on another machine) — still worth exporting those
        const toExport = selectedProjects.filter((p) => !this.graphifyNeeded.includes(p));
        await this.runWithProgress('Setting things up…', (log) => this.exportGraphsIntoVault(toExport, log), toExport.length);
        this.next();
      })));
      return;
    }

    if (this.graphifyNeeded.length === 0) {
      contentEl.createEl('p', { text: 'Every selected project already has a graphify graph — nothing to generate.' });
      new Setting(contentEl).addButton((btn) => btn.setButtonText('Next').setCta().onClick(guarded(async () => {
        await this.runWithProgress(
          'Exporting graphs into your vault…',
          (log) => this.exportGraphsIntoVault(selectedProjects, log),
          selectedProjects.length
        );
        this.next();
      })));
      return;
    }

    contentEl.createEl('p', {
      text: "These projects don't have a graphify graph yet. Generating one uses more tokens up front than normal. Pick which ones to generate now (you can always do this later per-project):",
    });
    for (const project of this.graphifyNeeded) {
      new Setting(contentEl)
        .setName(project.name)
        .setDesc('No graphify graph found')
        .addToggle((toggle) =>
          toggle.setValue(false).onChange((v) => this.graphifyChoices.set(project.cwd, v))
        );
    }

    new Setting(contentEl).addButton((btn) =>
      btn.setButtonText('Next').setCta().onClick(guarded(async () => {
        const toGenerate = this.graphifyNeeded.filter((p) => this.graphifyChoices.get(p.cwd));
        await this.runWithProgress('Setting up graphify…', async (log) => {
          const graphifyBin = graphifyAvailable.bin ?? 'graphify';
          for (const project of toGenerate) {
            log(`⏳ Generating graph for ${project.name}… this can take a while`);
            try {
              await run(graphifyBin, [project.cwd, '--no-viz'], { timeoutMs: 10 * 60 * 1000 });
              await ensureGraphifyOutIgnored(project.cwd);
              log(`✓ Graph generated for ${project.name}`);
            } catch (e) {
              const message = (e as Error).message ?? String(e);
              // graphify needs an LLM key to semantically process non-code files
              // (docs/images/papers). Codestellation only cares about code, so
              // retrying with --code-only (no key required) is the right default
              // rather than just failing the whole project.
              if (/no LLM API key found/i.test(message)) {
                log(`ℹ No LLM API key configured, retrying ${project.name} as code-only (skips docs/images, needs no key)`);
                try {
                  await run(graphifyBin, [project.cwd, '--no-viz', '--code-only'], { timeoutMs: 10 * 60 * 1000 });
                  await ensureGraphifyOutIgnored(project.cwd);
                  log(`✓ Graph generated for ${project.name} (code-only)`);
                  continue;
                } catch (e2) {
                  log(`⚠ Failed to generate a graph for ${project.name} even as code-only: ${(e2 as Error).message}`);
                  continue;
                }
              }
              log(`⚠ Failed to generate a graph for ${project.name}: ${message}`);
              continue; // don't attempt to export a graph that failed to generate
            }
          }
          await this.exportGraphsIntoVault(selectedProjects, log);
        }, toGenerate.length + selectedProjects.length);
        this.next();
      }))
    );
  }

  /**
   * Clears the modal, shows a live-updating progress list while `work`
   * runs, then requires an explicit "Continue" click before moving on —
   * auto-advancing the instant the work finished was a real bug: on a
   * fast run the list would flash by unread, and on a failing run any
   * error line logged would get wiped out the moment the next step's
   * render cleared contentEl, making a failure look identical to success.
   */
  /**
   * `totalSteps`, when given, drives a live "N of M" counter in the
   * header rather than a static title that never changes while the work
   * runs — a multi-minute graphify build with no visible movement reads
   * as hung, not "still working."
   */
  private async runWithProgress(title: string, work: (log: (line: string) => void) => Promise<void>, totalSteps?: number): Promise<void> {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h2', { text: 'Codestellation setup' });

    const progressCard = contentEl.createDiv({ cls: 'cs-progress-card' });
    const statusRow = progressCard.createDiv({ cls: 'cs-progress-status' });
    const spinner = statusRow.createDiv({ cls: 'cs-spinner' });
    const status = statusRow.createSpan({ text: title });
    const list = progressCard.createDiv({ cls: 'cs-progress-list' });

    let completed = 0;
    let failed = false;
    const updateStatus = () => {
      if (totalSteps && totalSteps > 0) status.setText(`${title} (${Math.min(completed, totalSteps)}/${totalSteps})`);
    };
    const log = (line: string) => {
      const row = list.createDiv({ cls: 'cs-progress-row' });
      const isDone = /^[✓]/.test(line);
      const isWarn = /^[⚠✗]/.test(line);
      row.addClass(isDone ? 'is-done' : isWarn ? 'is-warn' : 'is-info');
      row.setText(line.replace(/^[✓⚠✗ℹ⏳]\s*/, ''));
      if (isDone || isWarn) { completed++; updateStatus(); }
      if (isWarn) failed = true;
    };

    try {
      await work(log);
    } catch (e) {
      log(`⚠ ${(e as Error).message ?? e}`);
    }

    spinner.remove();
    statusRow.addClass(failed ? 'is-warn' : 'is-done');
    status.setText(failed ? 'Finished with some errors, review before continuing' : 'Done');

    await new Promise<void>((resolve) => {
      new Setting(contentEl).addButton((btn) =>
        btn.setButtonText('Continue').setCta().onClick(() => resolve())
      );
    });
  }

  /**
   * Runs `graphify export obsidian --dir <vault>/Codestellation/projects/<slug>/graph`
   * for each project and records the resulting canvas path in the
   * registry. Confirmed against a real project during implementation:
   * this produces one .md note per graph node (frontmatter + wikilinked
   * "Connections" section) plus a ready-to-open graph.canvas grouped by
   * community — a stronger result than relying on Obsidian's generic
   * auto-linked Graph View alone.
   */
  private async exportGraphsIntoVault(projects: DiscoveredProject[], log?: (line: string) => void): Promise<void> {
    if (projects.length === 0) return;
    const adapter = this.app.vault.adapter;
    if (!(adapter instanceof FileSystemAdapter)) return; // isDesktopOnly guarantees this in practice
    const vaultBasePath = adapter.getBasePath();

    const graphifyBin = (await detectGraphify()).bin ?? 'graphify';
    let registry = await loadRegistry(this.app.vault);
    for (const project of projects) {
      const entry = registry.find((e) => e.path === project.cwd);
      if (!entry) continue;

      const nodeCount = await this.graphNodeCount(project.cwd);
      if (nodeCount !== null && nodeCount > LARGE_GRAPH_NODE_THRESHOLD) {
        log?.(`ℹ ${project.name}'s graph has ${nodeCount.toLocaleString()} nodes, using the "${this.exportMode}" export you selected.`);
      }
      // covers graphs that already existed before this import (e.g. built
      // on another machine) too, not just ones Codestellation just generated
      await ensureGraphifyOutIgnored(project.cwd);

      const graphFolder = `${vaultBasePath}/${VAULT_PROJECTS_FOLDER}/${entry.id}/graph`;
      log?.(`⏳ Exporting graph for ${project.name} into the vault…`);

      let graphOverridePath: string | null = null;
      try {
        if (this.exportMode === 'lite') {
          const graph = await parseGraphJson(path.join(project.cwd, 'graphify-out', 'graph.json'));
          const filtered = filterToTopCommunities(graph, LITE_EXPORT_NODE_BUDGET);
          graphOverridePath = path.join(os.tmpdir(), `codestellation-lite-${entry.id}-${Date.now()}.json`);
          await fs.writeFile(graphOverridePath, JSON.stringify(filtered));
          log?.(`  (filtered to ${filtered.nodes.length} nodes across its largest communities)`);
        }

        const args = ['export', 'obsidian', '--dir', graphFolder];
        if (graphOverridePath) args.push('--graph', graphOverridePath);
        await run(graphifyBin, args, { cwd: project.cwd, timeoutMs: 5 * 60 * 1000 });
        entry.graphPath = `${VAULT_PROJECTS_FOLDER}/${entry.id}/graph/graph.canvas`;

        // recolor the canvas's community groups to match the project's
        // chosen planet color, so the graph visually reads as "this
        // project" rather than graphify's own generic per-community palette
        const canvasFsPath = `${vaultBasePath}/${entry.graphPath}`;
        await recolorCanvasGroups(canvasFsPath, hueToHex(entry.hue));

        // the .md notes/canvas above are graphify's OWN transformation of
        // the graph for Obsidian; this is the raw graph.json itself (or
        // the lite-filtered version, if that's what was exported) so the
        // vault holds the actual source data, not just a derived view —
        // this is what the live canvas graph (Phase 9) and diagnostics
        // read, and it means the vault copy is the same data used to
        // build everything else, not a second, potentially-divergent one
        const rawGraphSource = graphOverridePath ?? path.join(project.cwd, 'graphify-out', 'graph.json');
        await fs.copyFile(rawGraphSource, `${graphFolder}/graph.json`).catch((e) => {
          log?.(`⚠ Couldn't copy graph.json into the vault for ${project.name}: ${(e as Error).message}`);
        });

        log?.(`✓ Exported graph for ${project.name}`);
      } catch (e) {
        log?.(`⚠ Couldn't export the graph for ${project.name}: ${(e as Error).message}`);
      } finally {
        if (graphOverridePath) await fs.unlink(graphOverridePath).catch(() => {});
      }
    }
    await saveRegistry(this.app.vault, registry);
  }

  private async graphNodeCount(projectCwd: string): Promise<number | null> {
    try {
      const graph = await parseGraphJson(path.join(projectCwd, 'graphify-out', 'graph.json'));
      return graph.nodes.length;
    } catch {
      return null; // couldn't read/parse it — don't block the export over a diagnostic failure
    }
  }

  private async renderFolders() {
    await this.runWithProgress('Setting things up…', async (log) => {
      await ensureFolders(this.app.vault, baseFolderPlan(), (f) => log(`✓ ${f}`));

      const registry = await loadRegistry(this.app.vault);
      for (const entry of registry) {
        await ensureFolders(this.app.vault, projectFolderPlan(entry.id), (f) => log(`✓ ${f}`));
        await writeProjectOverview(this.app.vault, entry);
        log(`✓ ${VAULT_PROJECTS_FOLDER}/${entry.id}/overview.md`);
      }
    });
    this.next();
  }

  private renderDone() {
    const { contentEl } = this;
    contentEl.createEl('p', { text: `All set, ${this.plugin.settings.userName}. Your vault is ready.` });
    new Setting(contentEl).addButton((btn) =>
      btn.setButtonText('Open Codestellation').setCta().onClick(guarded(async () => {
        this.plugin.settings.onboardingComplete = true;
        await this.plugin.saveSettings();
        this.close();
        await this.plugin.activateHomeView();
      }))
    );
  }
}
