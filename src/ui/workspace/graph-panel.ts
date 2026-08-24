import { App, TFile } from 'obsidian';
import * as path from 'node:path';
import { parseGraphJson } from '../../adapters/graphify/graph-json';
import type { RegistryEntry } from '../../domain/project-registry';
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
 * Returns a dispose function — the caller (workspace-view.ts) MUST call
 * it when the tab/view closes, or the live-session file watcher leaks.
 */
export async function renderGraphPanel(container: HTMLElement, app: App, entry: RegistryEntry): Promise<() => void> {
  container.empty();

  if (!entry.graphPath) {
    container.createDiv({
      cls: 'cs-empty',
      text: 'No graphify graph generated for this project yet. Re-run "Codestellation: Import a project" from the ribbon to generate one.',
    });
    return () => {};
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
  const liveCanvasHost = container.createDiv();
  liveCanvasHost.style.width = '100%';
  liveCanvasHost.style.height = '420px';
  liveCanvasHost.style.marginTop = 'var(--cs-space-3)';
  liveCanvasHost.style.border = '1px solid var(--cs-chrome-border)';
  liveCanvasHost.style.borderRadius = 'var(--cs-chrome-radius-m)';
  liveCanvasHost.style.overflow = 'hidden';
  liveCanvasHost.style.position = 'relative';

  try {
    const graph = await parseGraphJson(path.join(entry.path, 'graphify-out', 'graph.json'));
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
