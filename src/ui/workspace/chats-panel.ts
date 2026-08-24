import { Notice } from 'obsidian';
import type { ChatSession } from '../../types';
import { claudeResumeCommand, codexResumeHint, startSessionWithGraphifyCommand } from '../../domain/chat-sessions';

type AgentFilter = 'all' | 'claude' | 'codex';

const PAGE_SIZE = 15;

function formatRelative(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days}d ago`;
}

async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
  new Notice('Copied to clipboard');
}

/**
 * Read-only transcript list + copy-to-resume, per the implementation
 * plan's C1 decision (§2): an Obsidian plugin can't embed the Claude/
 * Codex desktop chat UI, so "resume" hands off to the CLI instead of
 * trying to fake an in-pane chat. Copy-to-clipboard rather than
 * auto-launching a terminal, since spawning a terminal process
 * differs by OS and by which terminal app the user actually has —
 * guessing that would be the same kind of fabrication as inventing a
 * Windows graphify path.
 *
 * Paginated at PAGE_SIZE rather than one long scroll — a project with a
 * long Claude Code history can easily have hundreds of sessions, and
 * rendering all of them as DOM rows at once is both slow and makes the
 * list impossible to scan.
 */
export function renderChatsPanel(container: HTMLElement, sessions: ChatSession[], projectPath: string) {
  container.empty();

  let filter: AgentFilter = 'all';
  let page = 0;

  const startRow = container.createDiv({ cls: 'cs-filter-row' });
  const startBtn = startRow.createEl('button', { cls: 'cs-btn cs-btn-primary', text: 'Start new session here' });
  startBtn.addEventListener('click', () => copyToClipboard(startSessionWithGraphifyCommand(projectPath)));
  startRow.createSpan({ cls: 'cs-chat-meta', text: 'Copies a terminal command that cds into the project and starts Claude with a graphify reminder.' });

  const filterRow = container.createDiv({ cls: 'cs-filter-row' });
  const list = container.createDiv({ cls: 'cs-chat-list' });
  const pager = container.createDiv({ cls: 'cs-chat-pager' });

  const filters: { key: AgentFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'claude', label: 'Claude' },
    { key: 'codex', label: 'Codex' },
  ];
  const filterButtons = new Map<AgentFilter, HTMLElement>();
  for (const f of filters) {
    const btn = filterRow.createEl('button', { cls: `cs-filter${f.key === filter ? ' is-active' : ''}`, text: f.label });
    btn.addEventListener('click', () => {
      filter = f.key;
      page = 0;
      for (const [k, b] of filterButtons) b.classList.toggle('is-active', k === filter);
      renderList();
    });
    filterButtons.set(f.key, btn);
  }

  function renderList() {
    list.empty();
    pager.empty();
    const filtered = filter === 'all' ? sessions : sessions.filter((s) => s.agent === filter);

    if (filtered.length === 0) {
      list.createDiv({ cls: 'cs-empty', text: 'No sessions found for this project yet.' });
      return;
    }

    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    page = Math.min(page, pageCount - 1);
    const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    for (const session of pageItems) {
      const row = list.createDiv({ cls: 'cs-chat-row' });
      const main = row.createDiv({ cls: 'cs-chat-row-main' });
      main.createDiv({ cls: 'cs-chat-title', text: session.title });
      main.createDiv({ cls: 'cs-chat-meta', text: `${formatRelative(session.updatedAt)} · ${session.messageCount || '?'} messages` });

      const side = row.createDiv({ cls: 'cs-chat-row-side' });
      side.createSpan({ cls: `cs-badge cs-badge-${session.agent}`, text: session.agent });
      const resumeBtn = side.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: 'Copy resume command' });
      resumeBtn.addEventListener('click', (evt) => {
        evt.stopPropagation();
        const text = session.agent === 'claude' ? claudeResumeCommand(session.id) : codexResumeHint(session.id);
        copyToClipboard(text);
      });
    }

    if (pageCount > 1) {
      const prevBtn = pager.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: '< Prev' });
      prevBtn.disabled = page === 0;
      prevBtn.addEventListener('click', () => { page--; renderList(); });

      pager.createSpan({ cls: 'cs-chat-meta', text: `Page ${page + 1} of ${pageCount} (${filtered.length} sessions)` });

      const nextBtn = pager.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: 'Next >' });
      nextBtn.disabled = page >= pageCount - 1;
      nextBtn.addEventListener('click', () => { page++; renderList(); });
    }
  }

  renderList();
}
