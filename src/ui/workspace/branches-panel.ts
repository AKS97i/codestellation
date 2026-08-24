import type { Branch } from '../../types';
import { diffBetweenRefs, commitsUniqueTo, type FileDiffEntry } from '../../adapters/git/diff';

const LOCATION_LABEL: Record<Branch['location'], string> = {
  local: 'local',
  remote: 'remote',
  both: 'local + remote',
};

const DIFF_STATUS_LABEL: Record<FileDiffEntry['status'], string> = {
  added: 'added',
  removed: 'removed',
  modified: 'changed',
};

export interface BranchesPanelDeps {
  repoPath: string;
}

export function renderBranchesPanel(container: HTMLElement, branches: Branch[], deps: BranchesPanelDeps) {
  container.empty();

  if (branches.length === 0) {
    container.createDiv({ cls: 'cs-empty', text: 'No branches found (or this isn’t a git repo).' });
    return;
  }

  const sorted = [...branches].sort((a, b) => Number(a.stale) - Number(b.stale) || a.name.localeCompare(b.name));

  const list = container.createDiv();
  for (const branch of sorted) {
    const row = list.createDiv({ cls: `cs-branch-row${branch.stale ? ' is-stale' : ''}` });
    row.createDiv({ cls: 'cs-branch-dot' });
    row.createSpan({ text: branch.name });
    row.createSpan({ cls: 'cs-badge', text: LOCATION_LABEL[branch.location] });
    if (branch.stale) row.createSpan({ cls: 'cs-badge', text: 'stale (30d+)' });
  }

  if (sorted.length < 2) return; // nothing to compare against

  container.createDiv({ cls: 'cs-section-label', text: 'Compare two branches' });
  const pickerRow = container.createDiv({ cls: 'cs-filter-row' });
  const selectA = pickerRow.createEl('select', { cls: 'cs-filter' });
  const selectB = pickerRow.createEl('select', { cls: 'cs-filter' });
  for (const branch of sorted) {
    selectA.createEl('option', { value: branch.name, text: branch.name });
    selectB.createEl('option', { value: branch.name, text: branch.name });
  }
  selectA.value = sorted[0].name;
  selectB.value = sorted[1].name;
  const compareBtn = pickerRow.createEl('button', { cls: 'cs-btn cs-btn-primary', text: 'Compare' });

  const resultEl = container.createDiv();

  compareBtn.addEventListener('click', async () => {
    const refA = selectA.value;
    const refB = selectB.value;
    if (refA === refB) {
      resultEl.empty();
      resultEl.createDiv({ cls: 'cs-empty', text: 'Pick two different branches to compare.' });
      return;
    }
    resultEl.empty();
    resultEl.createDiv({ cls: 'cs-empty', text: 'Comparing…' });
    try {
      const [onlyA, onlyB, fileDiff] = await Promise.all([
        commitsUniqueTo(deps.repoPath, refA, refB),
        commitsUniqueTo(deps.repoPath, refB, refA),
        diffBetweenRefs(deps.repoPath, refA, refB),
      ]);
      renderCompareResult(resultEl, { refA, refB, onlyA, onlyB, fileDiff });
    } catch (e) {
      resultEl.empty();
      resultEl.createDiv({ cls: 'cs-empty', text: `Could not compare these branches: ${(e as Error).message ?? e}` });
    }
  });
}

function renderCompareResult(
  container: HTMLElement,
  data: {
    refA: string;
    refB: string;
    onlyA: { hash: string; subject: string }[];
    onlyB: { hash: string; subject: string }[];
    fileDiff: FileDiffEntry[];
  }
) {
  container.empty();

  const lanes = container.createDiv({ cls: 'cs-stat-grid' });
  renderLane(lanes, `Only on ${data.refA}`, data.onlyA);
  renderLane(lanes, `Only on ${data.refB}`, data.onlyB);

  container.createDiv({ cls: 'cs-section-label', text: `Files changed (${data.refA} → ${data.refB})` });
  if (data.fileDiff.length === 0) {
    container.createDiv({ cls: 'cs-empty', text: 'No file differences.' });
    return;
  }
  for (const entry of data.fileDiff) {
    const row = container.createDiv({ cls: 'cs-branch-row' });
    row.createSpan({ text: entry.path });
    row.createSpan({ cls: 'cs-badge', text: DIFF_STATUS_LABEL[entry.status] });
  }
}

function renderLane(container: HTMLElement, label: string, commits: { hash: string; subject: string }[]) {
  const tile = container.createDiv({ cls: 'cs-stat' });
  tile.createDiv({ cls: 'cs-stat-label', text: label });
  if (commits.length === 0) {
    tile.createDiv({ cls: 'cs-chat-meta', text: 'none' });
    return;
  }
  for (const c of commits) {
    tile.createDiv({ cls: 'cs-chat-meta', text: `${c.hash.slice(0, 7)} ${c.subject}` });
  }
}
