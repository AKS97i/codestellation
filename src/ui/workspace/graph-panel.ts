import { App, TFile, FileSystemAdapter, Notice } from 'obsidian';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { parseGraphJson } from '../../adapters/graphify/graph-json';
import { detectGraphify } from '../../adapters/detect';
import { run } from '../../core/shell';
import { ensureGraphifyOutIgnored } from '../../adapters/git/gitignore';
import { recolorCanvasGroups } from '../../adapters/graphify/canvas';
import { hueToHex } from '../../core/hue';
import { loadRegistry, saveRegistry, type RegistryEntry } from '../../domain/project-registry';
import { VAULT_PROJECTS_FOLDER } from '../../constants';
import { CanvasGraph } from '../graph/canvas-graph';
import { watchActiveSession } from '../../adapters/live-watch';
import { resolveTouchedFileToNodeIds } from '../../domain/graph-highlight';
import { logger } from '../../core/logger';

/**
 * Two static entry points into existing artifacts (the exported `.canvas`
 * file and native Graph View — see the file-level comment history) plus,
 * as of Phase 9, a real interactive canvas rendering of graph.json with
 * live highlighting: editing a file in a live Claude Code session for
 * this project lights up its node and neighbors within a few seconds.
 * See canvas-graph.ts for why this is a deterministic radial layout
 * rather than a physics simulation, and live-watch.ts for the session-
 * file-tailing mechanics.
 *
 * A project that skipped graph generation during onboarding (or never
 * had graphify installed yet) gets a "Generate graph now" button here
 * instead of only being able to re-run the whole import wizard — this
 * is that project's one-shot equivalent of the wizard's graphify step.
 *
 * Returns a dispose function — the caller (workspace-view.ts) MUST call
 * it when the tab/view closes, or the live-session file watcher leaks.
 */
export async function renderGraphPanel(container: HTMLElement, app: App, entry: RegistryEntry, onRegenerated?: () => void): Promise<() => void> {
  container.empty();

  if (!entry.graphPath) {
    return renderGenerateGraphState(container, app, entry, onRegenerated);
  }

  const graphPath = entry.graphPath;
  const actions = container.createDiv({ cls: 'cs-filter-row' });

  const openCanvasBtn = actions.createEl('button', { cls: 'cs-btn cs-btn-primary', text: 'Open graph canvas' });
  openCanvasBtn.addEventListener('click', async () => {
    const file = app.vault.getAbstractFileByPath(graphPath);
    if (!(file instanceof TFile)) {
      logger.warn('graph canvas file missing at', graphPath);
      return;
    }
    await app.workspace.getLeaf('tab').openFile(file);
  });

  const openGraphViewBtn = actions.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: 'Open native graph view' });
  openGraphViewBtn.addEventListener('click', () => {
    const commands = (app as unknown as { commands?: { executeCommandById?: (id: string) => void } }).commands;
    commands?.executeCommandById?.('graph:open');
  });

  const meta = container.createDiv({ cls: 'cs-chat-meta' });
  const liveCanvasHost = container.createDiv({ cls: 'cs-graph-host' });
  liveCanvasHost.style.width = '100%';

  try {
    // prefer the copy in the vault — that's the actual source of truth
    // per the user's own decision that graphify output should live in
    // the vault, not just be re-derived from the project folder every
    // time — falling back to the project folder only for projects
    // imported before that copy step existed
    const adapter = app.vault.adapter;
    const vaultGraphJsonPath = adapter instanceof FileSystemAdapter
      ? path.join(adapter.getBasePath(), graphPath.replace(/graph\.canvas$/, 'graph.json'))
      : null;
    const graphJsonPath = vaultGraphJsonPath && (await fs.stat(vaultGraphJsonPath).then(() => true).catch(() => false))
      ? vaultGraphJsonPath
      : path.join(entry.path, 'graphify-out', 'graph.json');

    const graph = await parseGraphJson(graphJsonPath);
    const canvasGraph = new CanvasGraph(liveCanvasHost, graph);
    const stats = canvasGraph.getRenderStats();
    meta.setText(
      stats.renderedCount < stats.totalCount
        ? `${stats.renderedCount.toLocaleString()} of ${stats.totalCount.toLocaleString()} nodes shown (largest communities only, see graph.json for the full set) · ${graph.edges.length.toLocaleString()} links`
        : `${stats.totalCount.toLocaleString()} nodes · ${graph.edges.length.toLocaleString()} links`
    );

    const disposeWatch = watchActiveSession(entry.path, (touchedPaths) => {
      const nodeIds = touchedPaths.flatMap((p) => resolveTouchedFileToNodeIds(graph, entry.path, p));
      if (nodeIds.length > 0) canvasGraph.highlightNodes(nodeIds);
    });

    return () => {
      disposeWatch();
      canvasGraph.destroy();
    };
  } catch {
    // graph.json may have moved or been deleted since the vault export ran —
    // the exported canvas/native graph view buttons above still work either way
    meta.setText('Live canvas unavailable (graph.json not found on disk).');
    return () => {};
  }
}

async function renderGenerateGraphState(container: HTMLElement, app: App, entry: RegistryEntry, onRegenerated?: () => void): Promise<() => void> {
  container.createDiv({ cls: 'cs-empty', text: 'No graphify graph generated for this project yet.' });

  const graphify = await detectGraphify();
  if (!graphify.installed) {
    const GRAPHIFY_INSTALL_CMD = 'pip install graphifyy';
    const installRow = container.createEl('p');
    installRow.createSpan({ text: 'Install graphify with: ' });
    installRow.createEl('code', { text: GRAPHIFY_INSTALL_CMD });
    const copyBtn = installRow.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: 'Copy' });
    copyBtn.style.marginLeft = '8px';
    copyBtn.addEventListener('click', async () => {
      await navigator.clipboard.writeText(GRAPHIFY_INSTALL_CMD);
      new Notice('Copied. Run it, then reopen this tab.');
    });
    return () => {};
  }

  const generateBtn = container.createEl('button', { cls: 'cs-btn cs-btn-primary', text: 'Generate graph now' });
  const status = container.createDiv({ cls: 'cs-chat-meta' });

  generateBtn.addEventListener('click', async () => {
    generateBtn.disabled = true;
    status.setText('Generating… this can take a while for a large project.');
    try {
      await generateAndExportGraph(app, entry, graphify.bin ?? 'graphify', (line) => status.setText(line));
      new Notice(`Graph generated for ${entry.name}.`);
      onRegenerated?.();
    } catch (e) {
      status.setText(`Couldn't generate a graph: ${(e as Error).message ?? e}`);
      generateBtn.disabled = false;
    }
  });

  return () => {};
}

/** Single-project equivalent of the onboarding wizard's graphify step — generate, export into the vault, recolor, gitignore, and persist the registry entry's graphPath. Shared logic with the wizard wasn't extracted given the wizard's version is entangled with its own multi-project batch progress UI; this is the standalone path for "I skipped this during import and want it later." */
async function generateAndExportGraph(app: App, entry: RegistryEntry, graphifyBin: string, log: (line: string) => void): Promise<void> {
  const adapter = app.vault.adapter;
  if (!(adapter instanceof FileSystemAdapter)) throw new Error('vault adapter is not a real filesystem');
  const vaultBasePath = adapter.getBasePath();

  try {
    await run(graphifyBin, [entry.path, '--no-viz'], { timeoutMs: 10 * 60 * 1000 });
  } catch (e) {
    const message = (e as Error).message ?? String(e);
    if (/no LLM API key found/i.test(message)) {
      log('No LLM API key configured, retrying as code-only…');
      await run(graphifyBin, [entry.path, '--no-viz', '--code-only'], { timeoutMs: 10 * 60 * 1000 });
    } else {
      throw e;
    }
  }
  await ensureGraphifyOutIgnored(entry.path);

  const graphFolder = `${vaultBasePath}/${VAULT_PROJECTS_FOLDER}/${entry.id}/graph`;
  log('Exporting into the vault…');
  await run(graphifyBin, ['export', 'obsidian', '--dir', graphFolder], { cwd: entry.path, timeoutMs: 5 * 60 * 1000 });

  const registry = await loadRegistry(app.vault);
  const registryEntry = registry.find((e) => e.id === entry.id);
  if (!registryEntry) throw new Error('project no longer in the registry');
  registryEntry.graphPath = `${VAULT_PROJECTS_FOLDER}/${entry.id}/graph/graph.canvas`;

  await recolorCanvasGroups(`${vaultBasePath}/${registryEntry.graphPath}`, hueToHex(registryEntry.hue));
  await fs.copyFile(path.join(entry.path, 'graphify-out', 'graph.json'), `${graphFolder}/graph.json`).catch(() => {
    // non-fatal — the exported canvas/notes still work without the raw copy
  });

  await saveRegistry(app.vault, registry);
  entry.graphPath = registryEntry.graphPath; // update the caller's in-memory copy too, not just the persisted registry
}
