import type { RegistryEntry } from '../../domain/project-registry';
import type { ProjectStats } from '../../domain/session-aggregator';

export interface OverviewData {
  entry: RegistryEntry;
  stats: ProjectStats;
  branchCount: number;
}

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatHours(h: number): string {
  if (h < 1) return `${Math.round(h * 60)}m`;
  return `${h.toFixed(1)}h`;
}

function formatRelative(iso: string | null): string {
  if (!iso) return 'never';
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days} days ago`;
}

function stat(container: HTMLElement, label: string, value: string, sub?: string) {
  const tile = container.createDiv({ cls: 'cs-stat' });
  tile.createDiv({ cls: 'cs-stat-label', text: label });
  tile.createDiv({ cls: 'cs-stat-value', text: value });
  if (sub) tile.createDiv({ cls: 'cs-chat-meta', text: sub });
}

export function renderOverviewPanel(container: HTMLElement, data: OverviewData) {
  container.empty();
  const { entry, stats, branchCount } = data;

  const grid = container.createDiv({ cls: 'cs-stat-grid' });
  stat(grid, 'Sessions', String(stats.sessionCount));

  const modelBreakdown = Object.entries(stats.tokensByModel)
    .sort((a, b) => b[1] - a[1])
    .map(([model, tokens]) => `${model}: ${formatTokens(tokens)}`)
    .join(' · ');
  stat(grid, 'Tokens used', formatTokens(stats.totalTokens), modelBreakdown || undefined);

  stat(grid, 'Time spent', formatHours(stats.timeSpentHoursEstimate), `estimate, capped per session`);
  stat(grid, 'Branches', String(branchCount));
  stat(grid, 'Tokens saved', 'N/A', 'not tracked yet, needs a live query to measure against');
  stat(grid, 'Last active', formatRelative(stats.lastActive));

  if (stats.unparsedLineCount > 0) {
    container.createDiv({
      cls: 'cs-chat-meta',
      text: `⚠ ${stats.unparsedLineCount} log line${stats.unparsedLineCount === 1 ? '' : 's'} couldn't be parsed and were skipped, so numbers above may undercount slightly.`,
    });
  }

  const pathLine = container.createDiv({ cls: 'cs-chat-meta' });
  pathLine.style.marginTop = 'var(--cs-space-4)';
  pathLine.setText(entry.path);
}
