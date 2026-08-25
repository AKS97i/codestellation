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

export interface RepoBranchGroup {
  /** Repo folder name, used as a section header when there's more than one — a project folder that bundles several repos (e.g. frontend + backend) shows one section per repo instead of one flat list nobody could tell apart. */
  label: string;
  repoPath: string;
  branches: Branch[];
}

/**
 * Renders one or more repos' branches. Most projects are a single repo
 * (one group, no header needed); a project folder that's a container for
 * multiple repos (see workspace-view.ts's nested-repo detection) gets one
 * labeled section per repo, each with its own independent branch list and
 * compare-two-branches UI, since a branch name is scoped to its own repo,
 * not comparable across repos.
 */
export function renderBranchesPanel(container: HTMLElement, groups: RepoBranchGroup[]) {
  container.empty();

  if (groups.length === 0 || groups.every((g) => g.branches.length === 0)) {
    container.createDiv({ cls: 'cs-empty', text: 'No branches found (or this isn’t a git repo).' });
    return;
  }

  const showHeaders = groups.length > 1;
  for (const group of groups) {
    if (showHeaders) container.createDiv({ cls: 'cs-section-label', text: group.label });
    const section = container.createDiv({ cls: 'cs-branch-section' });
    renderRepoBranches(section, group.branches, group.repoPath);
  }
}

function renderRepoBranches(container: HTMLElement, branches: Branch[], repoPath: string) {
  if (branches.length === 0) {
    container.createDiv({ cls: 'cs-empty', text: 'No branches found.' });
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
        commitsUniqueTo(repoPath, refA, refB),
        commitsUniqueTo(repoPath, refB, refA),
        diffBetweenRefs(repoPath, refA, refB),
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
