import { Notice } from 'obsidian';
import type { ChatSession } from '../../types';
import { claudeResumeCommand, codexResumeHint } from '../../domain/chat-sessions';

type AgentFilter = 'all' | 'claude' | 'codex';

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
 */
export function renderChatsPanel(container: HTMLElement, sessions: ChatSession[]) {
  container.empty();

  let filter: AgentFilter = 'all';
  const filterRow = container.createDiv({ cls: 'cs-filter-row' });
  const list = container.createDiv({ cls: 'cs-chat-list' });

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
      for (const [k, b] of filterButtons) b.classList.toggle('is-active', k === filter);
      renderList();
    });
    filterButtons.set(f.key, btn);
  }

  function renderList() {
    list.empty();
    const filtered = filter === 'all' ? sessions : sessions.filter((s) => s.agent === filter);
    if (filtered.length === 0) {
      list.createDiv({ cls: 'cs-empty', text: 'No sessions found for this project yet.' });
      return;
    }
    for (const session of filtered) {
      const row = list.createDiv({ cls: 'cs-chat-row' });
      const title = row.createDiv({ cls: 'cs-chat-title' });
      title.setText(session.title);
      title.createSpan({ cls: 'cs-badge', text: session.agent });
      row.createDiv({ cls: 'cs-chat-meta', text: `${formatRelative(session.updatedAt)} · ${session.messageCount || '?'} messages` });

      const resumeBtn = row.createEl('button', { cls: 'cs-btn cs-btn-ghost', text: 'Copy resume command' });
      resumeBtn.addEventListener('click', (evt) => {
        evt.stopPropagation();
        const text = session.agent === 'claude' ? claudeResumeCommand(session.id) : codexResumeHint(session.id);
        copyToClipboard(text);
      });
    }
  }

  renderList();
}
