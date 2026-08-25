import { ItemView, WorkspaceLeaf, ViewStateResult } from 'obsidian';
import { VIEW_TYPE_WORKSPACE } from '../../constants';
import type CodestellationPlugin from '../../main';
import { loadRegistry, type RegistryEntry } from '../../domain/project-registry';
import { aggregateProjectStats } from '../../domain/session-aggregator';
import { discoverClaudeCodeProjects } from '../../adapters/claude-code/discover';
import { discoverCodexProjects } from '../../adapters/codex/discover';
import { loadCodexSessionTitles } from '../../adapters/codex/session-index';
import { listBranches, listProjectBranches } from '../../adapters/git/branches';
import { renderOverviewPanel } from '../workspace/overview-panel';
import { renderBranchesPanel } from '../workspace/branches-panel';
import { renderGraphPanel } from '../workspace/graph-panel';
import { renderChatsPanel } from '../workspace/chats-panel';
import { renderWorklogPanel } from '../workspace/worklog-panel';
import { claudeSessionsToChats, codexSessionsToChats, mergeChatsSortedByRecent } from '../../domain/chat-sessions';
import { logger } from '../../core/logger';
import { HelpModal } from '../help-modal';
import { GuideTour } from '../guide/guide-tour';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { applyCodestellationAppearance } from '../appearance';


async function findNestedGitRepos(root: string): Promise<string[]> {
  const entries = await fs.readdir(root, { withFileTypes: true }).catch(() => []);
  const found: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const hasGit = await fs.stat(path.join(root, entry.name, '.git')).then(() => true).catch(() => false);
    if (hasGit) found.push(entry.name);
  }
  return found;
}

const TABS = ['overview', 'chats', 'branches', 'graph', 'worklog'] as const;
type Tab = (typeof TABS)[number];

const TAB_LABEL: Record<Tab, string> = {
  overview: 'Overview',
  chats: 'Chats',
  branches: 'Branches',
  graph: 'Graph',
  worklog: 'Work Log',
};

interface WorkspaceViewState extends Record<string, unknown> {
  projectId: string | null;
}

export class WorkspaceView extends ItemView {
  private plugin: CodestellationPlugin;
  private projectId: string | null = null;
  private entry: RegistryEntry | null = null;
  private activeTab: Tab = 'overview';
  private disposeGraphPanel: (() => void) | null = null;

  constructor(leaf: WorkspaceLeaf, plugin: CodestellationPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return VIEW_TYPE_WORKSPACE;
  }

  getDisplayText(): string {
    return this.entry?.name ?? 'Codestellation workspace';
  }

  getIcon(): string {
    return 'orbit';
  }

  async setState(state: unknown, result: ViewStateResult): Promise<void> {
    const projectId = (state as WorkspaceViewState | undefined)?.projectId ?? null;
    this.projectId = projectId;
    await super.setState(state, result);
    await this.render();
  }

  getState(): WorkspaceViewState {
    return { projectId: this.projectId };
  }

  async onOpen() {
    await this.render();
  }

  private async render() {
    try {
      await this.renderUnsafe();
    } catch (e) {
      logger.error('workspace view failed to render', e);
      const container = this.containerEl.children[1] as HTMLElement;
      container.empty();
      container.createDiv({ cls: 'cs-empty', text: `Something went wrong opening this workspace: ${(e as Error).message ?? e}` });
    }
  }

  private async renderUnsafe() {
    const container = this.containerEl.children[1] as HTMLElement;
    container.empty();
    container.style.padding = '0';

    if (!this.projectId) {
      container.createDiv({ cls: 'cs-empty', text: 'No project selected. Open this from a planet’s Launch button.' });
      return;
    }

    const registry = await loadRegistry(this.app.vault);
    const entry = registry.find((e) => e.id === this.projectId) ?? null;
    this.entry = entry;

    if (!entry) {
      container.createDiv({ cls: 'cs-empty', text: `Project "${this.projectId}" isn't in the registry anymore (was it removed?).` });
      return;
    }

    const shell = container.createDiv({ cls: 'cs-shell cs-workspace-shell' });
    applyCodestellationAppearance(shell, this.plugin.settings);
    const hubContent = shell.createDiv({ cls: 'cs-hub-content cs-workspace-content is-visible' });
    hubContent.style.position = 'static';
    hubContent.style.width = '100%';
    hubContent.style.height = '100%';

    const header = hubContent.createDiv({ cls: 'cs-hub-header' });
    header.createDiv({ cls: 'cs-hub-title', text: entry.name });
    const helpBtn = header.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: '? Help' });

    hubContent.createDiv({
      cls: 'cs-wip-banner',
      text: 'Preview build · Codestellation is evolving in small steps. Expect occasional breakage and unfinished behavior.',
    });

    const tabBar = hubContent.createDiv({ cls: 'cs-tabs' });
    const tabButtons = new Map<Tab, HTMLElement>();
    for (const tab of TABS) {
      const btn = tabBar.createEl('button', { cls: `cs-tab${tab === this.activeTab ? ' is-active' : ''}`, text: TAB_LABEL[tab] });
      btn.addEventListener('click', () => this.switchTab(tab, tabButtons, panels));
      tabButtons.set(tab, btn);
    }

    const panels = new Map<Tab, HTMLElement>();
    for (const tab of TABS) {
      const panel = hubContent.createDiv({ cls: `cs-tab-panel${tab === this.activeTab ? ' is-active' : ''}` });
      panels.set(tab, panel);
    }

    // built here (not a module-level constant) so each step's onEnter can
    // actually switch tabs via the closures above — a tour that only
    // covered whatever tab happened to be open already wouldn't be much
    // of a tour, since four of the five tabs are `display: none` until
    // clicked
    const workspaceTourSteps = [
      {
        selector: '.cs-hub-title',
        title: 'Your project workspace',
        body: `Everything here is scoped to ${entry.name} specifically: real sessions, real git branches, real tokens used. Nothing on this page is a mockup.`,
      },
      {
        selector: '.cs-wip-banner',
        title: 'Still v0.1',
        body: 'Some of what follows is fully built, some is a deliberate stand-in for something not finished yet — this tour calls that out tab by tab rather than hiding it.',
      },
      {
        selector: '.cs-tabs',
        onEnter: () => this.switchTab('overview', tabButtons, panels),
        title: 'Overview',
        body: 'Session count, tokens used (with a per-model breakdown), an estimated time-spent figure, and branch count — all computed fresh from disk each time you open this tab, not cached.',
      },
      {
        selector: '.cs-tabs',
        onEnter: () => this.switchTab('chats', tabButtons, panels),
        title: 'Chats',
        body: 'Every Claude/Codex session found for this project, with real titles where available. "Copy resume command" hands off to your terminal — Obsidian can\'t embed an interactive chat. "Start new session here" copies a command that reminds Claude to use graphify instead of reading files raw.',
      },
      {
        selector: '.cs-tabs',
        onEnter: () => this.switchTab('branches', tabButtons, panels),
        title: 'Branches',
        body: 'Local/remote/both, with stale branches (30+ days) flagged. Pick two branches to compare: unique commits per side, plus a file-level diff. Projects that bundle multiple repos in one folder show each repo\'s branches separately.',
      },
      {
        selector: '.cs-tabs',
        onEnter: () => this.switchTab('graph', tabButtons, panels),
        title: 'Graph',
        body: 'If a graphify graph exists, this renders it as a live, pannable canvas — editing a file in an active Claude Code session for this project highlights its node here within a few seconds. If no graph exists yet, you can generate one right from this tab.',
      },
      {
        selector: '.cs-tabs',
        onEnter: () => this.switchTab('worklog', tabButtons, panels),
        title: 'Work Log',
        body: 'Pick a date, get real commits and session stats for that day. AI-written summaries are currently disabled (a permission-prompt bug when calling out to Claude from inside Obsidian) — you get a plain commit list instead for now.',
      },
    ];
    helpBtn.addEventListener('click', () => new HelpModal(this.app, () => new GuideTour(shell, workspaceTourSteps).start()).open());

    // fetch everything up front so switching tabs afterward is instant —
    // these are real filesystem/git scans (see the file-level note below),
    // so the workspace shows a loading state rather than blank panels
    for (const panel of panels.values()) {
      panel.createDiv({ cls: 'cs-empty', text: 'Loading…' });
    }

    // fetched once and shared — Overview and Chats both need the same
    // session scan, and there's no cache layer yet (see the note below)
    let claudeSessions: Awaited<ReturnType<typeof discoverClaudeCodeProjects>>[number]['sessions'] = [];
    let codexSessions: Awaited<ReturnType<typeof discoverCodexProjects>>[number]['sessions'] = [];
    try {
      const [claudeProjects, codexProjects] = await Promise.all([discoverClaudeCodeProjects(), discoverCodexProjects()]);
      claudeSessions = claudeProjects.find((p) => p.cwd === entry.path)?.sessions ?? [];
      codexSessions = codexProjects.find((p) => p.cwd === entry.path)?.sessions ?? [];
    } catch (e) {
      logger.error('failed to scan sessions', e);
    }

    await Promise.all([
      this.loadOverview(panels.get('overview')!, entry, claudeSessions, codexSessions),
      this.loadChats(panels.get('chats')!, entry, claudeSessions, codexSessions),
      this.loadBranches(panels.get('branches')!, entry),
      this.loadGraph(panels.get('graph')!, entry),
      this.loadWorklog(panels.get('worklog')!, entry),
    ]);
  }

  private async loadWorklog(panel: HTMLElement, entry: RegistryEntry) {
    try {
      renderWorklogPanel(panel, this.app.vault, entry);
    } catch (e) {
      logger.error('failed to load worklog panel', e);
      panel.empty();
      panel.createDiv({ cls: 'cs-empty', text: 'Could not load the work log panel.' });
    }
  }

  private switchTab(tab: Tab, buttons: Map<Tab, HTMLElement>, panels: Map<Tab, HTMLElement>) {
    this.activeTab = tab;
    for (const [t, btn] of buttons) btn.classList.toggle('is-active', t === tab);
    for (const [t, panel] of panels) panel.classList.toggle('is-active', t === tab);
  }

  /**
   * Stats come from scanning every Claude Code + Codex session on disk and
   * filtering to this project's cwd — there's no per-project cache yet
   * (Phase 3's planned cache.ts was never built), so this re-parses
   * everything on each workspace open. Fine for the session counts seen
   * during implementation (dozens of sessions); would need real caching
   * before this scales to hundreds.
   */
  private async loadOverview(
    panel: HTMLElement,
    entry: RegistryEntry,
    claudeSessions: Awaited<ReturnType<typeof discoverClaudeCodeProjects>>[number]['sessions'],
    codexSessions: Awaited<ReturnType<typeof discoverCodexProjects>>[number]['sessions']
  ) {
    try {
      const branches = await listProjectBranches(entry.path).catch(() => []);
      const stats = aggregateProjectStats(claudeSessions, codexSessions);
      renderOverviewPanel(panel, { entry, stats, branchCount: branches.length });
    } catch (e) {
      logger.error('failed to load overview stats', e);
      panel.empty();
      panel.createDiv({ cls: 'cs-empty', text: 'Could not load stats for this project.' });
    }
  }

  private async loadChats(
    panel: HTMLElement,
    entry: RegistryEntry,
    claudeSessions: Awaited<ReturnType<typeof discoverClaudeCodeProjects>>[number]['sessions'],
    codexSessions: Awaited<ReturnType<typeof discoverCodexProjects>>[number]['sessions']
  ) {
    try {
      const codexTitles = await loadCodexSessionTitles();
      const chats = mergeChatsSortedByRecent(claudeSessionsToChats(claudeSessions), codexSessionsToChats(codexSessions, codexTitles));
      renderChatsPanel(panel, chats, entry.path);
    } catch (e) {
      logger.error('failed to load chats', e);
      panel.empty();
      panel.createDiv({ cls: 'cs-empty', text: 'Could not load chat sessions for this project.' });
    }
  }

  private async loadBranches(panel: HTMLElement, entry: RegistryEntry) {
    try {
      const isRepo = await fs.stat(path.join(entry.path, '.git')).then(() => true).catch(() => false);
      if (isRepo) {
        const branches = await listBranches(entry.path);
        renderBranchesPanel(panel, [{ label: entry.name, repoPath: entry.path, branches }]);
        return;
      }

      // real case hit during testing: a "project" folder (e.g. a client
      // workspace with docs alongside the actual code) isn't itself a git
      // repo — the repos are one level down. Show branches for each repo
      // found instead of just naming them and giving up.
      const nestedRepoNames = await findNestedGitRepos(entry.path);
      if (nestedRepoNames.length === 0) {
        panel.empty();
        panel.createDiv({ cls: 'cs-empty', text: "This folder isn't a git repository (no .git found here or in its immediate subfolders)." });
        return;
      }

      const groups = await Promise.all(
        nestedRepoNames.map(async (name) => {
          const repoPath = path.join(entry.path, name);
          const branches = await listBranches(repoPath).catch(() => []);
          return { label: name, repoPath, branches };
        })
      );
      renderBranchesPanel(panel, groups);
    } catch (e) {
      logger.error('failed to load branches', e);
      panel.empty();
      panel.createDiv({ cls: 'cs-empty', text: 'Could not read branches (is this still a git repo at that path?).' });
    }
  }

  private async loadGraph(panel: HTMLElement, entry: RegistryEntry) {
    try {
      this.disposeGraphPanel?.();
      this.disposeGraphPanel = await renderGraphPanel(panel, this.app, entry, () => this.loadGraph(panel, entry));
    } catch (e) {
      logger.error('failed to load graph panel', e);
      panel.empty();
      panel.createDiv({ cls: 'cs-empty', text: 'Could not load the graph for this project.' });
    }
  }

  async onClose() {
    // the graph panel's live-session file watcher must be closed here, or
    // it leaks — same class of bug the orbit engine's rAF loop had to
    // guard against (see home-view.ts's onClose)
    this.disposeGraphPanel?.();
  }
}
