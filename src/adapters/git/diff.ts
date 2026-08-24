import { run } from '../../core/shell';

export interface FileDiffEntry {
  path: string;
  status: 'added' | 'removed' | 'modified';
}

export interface CommitLaneEntry {
  hash: string;
  subject: string;
}

const STATUS_MAP: Record<string, FileDiffEntry['status']> = { A: 'added', D: 'removed', M: 'modified' };

/** File-level changes between two refs, using the merge-base (three-dot) diff — "what changed on B since it diverged from A," not a literal two-point diff, which is what you actually want when comparing branches. Renames (R###) and copies (C###) are reported as modified — the plan doesn't need the old path from a rename to render a diff view. */
export async function diffBetweenRefs(repoPath: string, refA: string, refB: string): Promise<FileDiffEntry[]> {
  const { stdout } = await run('git', ['diff', '--name-status', `${refA}...${refB}`], { cwd: repoPath });
  return stdout
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [statusRaw, ...pathParts] = line.split('\t');
      const status = STATUS_MAP[statusRaw[0]] ?? 'modified';
      return { path: pathParts[pathParts.length - 1], status };
    });
}

/** Commits reachable from `ref` but not from `other` — i.e. what's unique to one side of a comparison. */
export async function commitsUniqueTo(repoPath: string, ref: string, other: string): Promise<CommitLaneEntry[]> {
  const { stdout } = await run('git', ['log', `${other}..${ref}`, '--pretty=format:%H\x1f%s'], { cwd: repoPath });
  return stdout
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [hash, subject] = line.split('\x1f');
      return { hash, subject };
    });
}
