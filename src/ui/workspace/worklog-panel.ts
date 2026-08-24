import { Notice, Vault } from 'obsidian';
import type { RegistryEntry } from '../../domain/project-registry';
import { commitsOnDate } from '../../adapters/git/commits';
import { generateWorklogSummary } from '../../domain/worklog';
import { discoverClaudeCodeProjects } from '../../adapters/claude-code/discover';
import { discoverCodexProjects } from '../../adapters/codex/discover';
import { aggregateProjectStats } from '../../domain/session-aggregator';
import { VAULT_PROJECTS_FOLDER } from '../../constants';
import { logger } from '../../core/logger';

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function isSameDate(iso: string | null, dateISO: string): boolean {
  if (!iso) return false;
  return iso.slice(0, 10) === dateISO;
}

export function renderWorklogPanel(container: HTMLElement, vault: Vault, entry: RegistryEntry) {
  container.empty();

  const dateInput = container.createEl('input', { cls: 'cs-date-input', type: 'date' });
  dateInput.value = todayISO();
  const generateBtn = container.createEl('button', { cls: 'cs-btn cs-btn-primary', text: 'Generate work log' });
  const out = container.createDiv({ cls: 'cs-worklog-out' });
  out.setText('Pick a date and generate a work log for it.');

  generateBtn.addEventListener('click', async () => {
    const date = dateInput.value;
    if (!date) {
      new Notice('Pick a date first.');
      return;
    }
    generateBtn.disabled = true;
    out.setText('Generating…');
    try {
      const [commits, claudeProjects, codexProjects] = await Promise.all([
        commitsOnDate(entry.path, date).catch(() => []),
        discoverClaudeCodeProjects(),
        discoverCodexProjects(),
      ]);
      const claudeSessions = (claudeProjects.find((p) => p.cwd === entry.path)?.sessions ?? []).filter((s) => isSameDate(s.firstTimestamp, date));
      const codexSessions = (codexProjects.find((p) => p.cwd === entry.path)?.sessions ?? []).filter((s) => isSameDate(s.firstTimestamp, date));
      const stats = aggregateProjectStats(claudeSessions, codexSessions);

      const result = await generateWorklogSummary({
        projectName: entry.name,
        date,
        commits,
        sessionCount: stats.sessionCount,
        totalTokens: stats.totalTokens,
        timeSpentHoursEstimate: stats.timeSpentHoursEstimate,
      });

      const header = `${entry.name}, ${date}\n${stats.sessionCount} session(s) · ${stats.totalTokens.toLocaleString()} tokens · ~${stats.timeSpentHoursEstimate.toFixed(1)}h\n${result.generatedByAi ? '' : '(plain commit list for now, AI-written summaries are still being worked on)\n'}\n`;
      out.setText(header + result.summary);

      const notePath = `${VAULT_PROJECTS_FOLDER}/${entry.id}/worklogs/${date}.md`;
      await vault.adapter.write(notePath, `# ${entry.name}, ${date}\n\n${header}\n${result.summary}\n`);
      new Notice(`Saved to ${notePath}`);
    } catch (e) {
      logger.error('failed to generate worklog', e);
      out.setText(`Could not generate a work log: ${(e as Error).message ?? e}`);
    } finally {
      generateBtn.disabled = false;
    }
  });
}
