import { describe, it, expect } from 'vitest';
import * as path from 'node:path';
import { listBranches, listProjectBranches } from './branches';

// A real, throwaway git repo (not mocked) — see testing/fixtures/git-repo,
// which has: main + develop (local and pushed to a local "origin"),
// feature/local-only (never pushed), and remote-only-branch (pushed then
// deleted locally). This exercises all three `location` values against
// actual `git` output, not a fabricated one.
const FIXTURE_REPO = path.join(import.meta.dirname, '../../testing/fixtures/git-repo');

describe('listBranches', () => {
  it('classifies branches as both/local/remote correctly against a real repo', async () => {
    const branches = await listBranches(FIXTURE_REPO);
    const byName = Object.fromEntries(branches.map((b) => [b.name, b]));

    expect(byName['main'].location).toBe('both');
    expect(byName['develop'].location).toBe('both');
    expect(byName['feature/local-only'].location).toBe('local');
    expect(byName['remote-only-branch'].location).toBe('remote');
  });

  it('never reports origin/HEAD as a branch', async () => {
    const branches = await listBranches(FIXTURE_REPO);
    expect(branches.find((b) => b.name === 'HEAD')).toBeUndefined();
  });

  it('never reports a bare remote name as a branch — real repos can show this for a symbolic-ref remote HEAD pointer (observed on an actual project, not just theoretical)', async () => {
    const branches = await listBranches(FIXTURE_REPO);
    expect(branches.find((b) => b.name === 'origin')).toBeUndefined();
  });

  it('does not duplicate a branch that exists both locally and on origin', async () => {
    const branches = await listBranches(FIXTURE_REPO);
    const mains = branches.filter((b) => b.name === 'main');
    expect(mains).toHaveLength(1);
  });
});

describe('listProjectBranches', () => {
  it('finds branches when the imported project is a parent containing nested repos', async () => {
    const fixtureParent = path.dirname(FIXTURE_REPO);
    const branches = await listProjectBranches(fixtureParent);
    expect(branches.some((branch) => branch.name === 'main')).toBe(true);
    expect(branches.some((branch) => branch.name === 'feature/local-only')).toBe(true);
  });
});
