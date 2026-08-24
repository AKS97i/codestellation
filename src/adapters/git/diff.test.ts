import { describe, it, expect } from 'vitest';
import * as path from 'node:path';
import { diffBetweenRefs, commitsUniqueTo } from './diff';

// Same throwaway fixture repo branches.test.ts uses — see its header
// comment for the shape (main/develop point at the same commit,
// feature/local-only has one extra "wip" commit that touches file.txt).
const FIXTURE_REPO = path.join(import.meta.dirname, '../../testing/fixtures/git-repo');

describe('diffBetweenRefs', () => {
  it('reports the file changed by the extra commit on feature/local-only', async () => {
    const diff = await diffBetweenRefs(FIXTURE_REPO, 'main', 'feature/local-only');
    expect(diff).toEqual([{ path: 'file.txt', status: 'modified' }]);
  });

  it('reports no changes between two refs pointing at the same commit', async () => {
    const diff = await diffBetweenRefs(FIXTURE_REPO, 'main', 'develop');
    expect(diff).toEqual([]);
  });
});

describe('commitsUniqueTo', () => {
  it('lists the commit that exists on one branch but not the other', async () => {
    const commits = await commitsUniqueTo(FIXTURE_REPO, 'feature/local-only', 'main');
    expect(commits).toHaveLength(1);
    expect(commits[0].subject).toBe('wip');
  });

  it('returns nothing when neither side has unique commits', async () => {
    const commits = await commitsUniqueTo(FIXTURE_REPO, 'main', 'develop');
    expect(commits).toEqual([]);
  });
});
