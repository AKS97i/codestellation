import { run } from '../../core/shell';
import type { Branch } from '../../types';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

/**
 * Lists local + remote-tracking branches for a repo, excluding merged/
 * deleted ones. A branch that exists both locally and as `origin/<name>`
 * is reported once with location 'both', not twice.
 */
export async function listBranches(repoPath: string): Promise<Branch[]> {
  const [localOut, remoteOut] = await Promise.all([
    run('git', ['for-each-ref', '--format=%(refname:short)', 'refs/heads/'], { cwd: repoPath }),
    run('git', ['for-each-ref', '--format=%(refname:short)', 'refs/remotes/'], { cwd: repoPath }),
  ]);

  const local = new Set(
    localOut.stdout.split('\n').map((s) => s.trim()).filter(Boolean)
  );
  const remote = new Set(
    remoteOut.stdout
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s && s.includes('/') && !s.endsWith('/HEAD'))
      // a bare remote name with no slash at all (just "origin", observed for
      // real on a repo whose remote HEAD pointer is stored without the
      // "/HEAD" suffix some git versions/configs use) is a remote pointer,
      // not a branch — `s.includes('/')` excludes it; `/HEAD` covers the
      // more common form of the same thing
      .map((s) => s.replace(/^[^/]+\//, '')) // strip the remote name prefix, e.g. "origin/main" -> "main"
  );

  const allNames = new Set([...local, ...remote]);
  const branches: Branch[] = [];

  for (const name of allNames) {
    const inLocal = local.has(name);
    const inRemote = remote.has(name);
    const location: Branch['location'] = inLocal && inRemote ? 'both' : inLocal ? 'local' : 'remote';
    branches.push({ name, location, stale: false });
  }

  await annotateStale(repoPath, branches);
  return branches;
}

/**
 * Returns branches for either a normal repository or an imported parent
 * folder whose immediate children are repositories (the common frontend +
 * backend workspace layout). The solar system uses the combined result so
 * those projects receive branch moons/satellites just like single repos.
 */
export async function listProjectBranches(projectPath: string): Promise<Branch[]> {
  const rootGit = await fs.stat(path.join(projectPath, '.git')).then(() => true).catch(() => false);
  if (rootGit) return listBranches(projectPath);

  const entries = await fs.readdir(projectPath, { withFileTypes: true }).catch(() => [] as import('node:fs').Dirent[]);
  const nestedRepos = (await Promise.all(entries
    .filter((entry) => entry.isDirectory())
    .map(async (entry) => {
      const repoPath = path.join(projectPath, entry.name);
      const hasGit = await fs.stat(path.join(repoPath, '.git')).then(() => true).catch(() => false);
      return hasGit ? repoPath : null;
    })))
    .filter((repoPath): repoPath is string => repoPath !== null);

  const groups = await Promise.all(nestedRepos.map((repoPath) => listBranches(repoPath).catch(() => [])));
  return groups.flat();
}

/** Marks branches whose last commit is more than 30 days old as stale. */
async function annotateStale(repoPath: string, branches: Branch[]): Promise<void> {
  await Promise.all(
    branches.map(async (b) => {
      const ref = b.location === 'remote' ? `origin/${b.name}` : b.name;
      try {
        const { stdout } = await run('git', ['log', '-1', '--format=%ct', ref], { cwd: repoPath });
        const commitEpochSeconds = Number(stdout.trim());
        if (Number.isFinite(commitEpochSeconds)) {
          const ageDays = (Date.now() / 1000 - commitEpochSeconds) / 86400;
          b.stale = ageDays > 30;
        }
      } catch {
        // ref might not resolve (e.g. a race with a branch deleted mid-scan) — leave stale=false rather than fail the whole list
      }
    })
  );
}
