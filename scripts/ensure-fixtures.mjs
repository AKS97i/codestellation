// The git-adapter tests (branches.test.ts, diff.test.ts) run real `git`
// commands against a throwaway fixture repo with actual commit history
// and remote-tracking refs. A real nested .git directory can't be
// committed directly (git treats it as an embedded repo / gitlink, which
// silently drops its contents on clone) so it's shipped as a tarball
// instead and extracted here, once, before tests run.
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import * as path from 'node:path';

const fixturesDir = path.join(import.meta.dirname, '..', 'src', 'testing', 'fixtures');
const repoDir = path.join(fixturesDir, 'git-repo');
const tarball = path.join(fixturesDir, 'git-repo.tar.gz');

if (!existsSync(path.join(repoDir, '.git'))) {
  execFileSync('tar', ['-xzf', tarball, '-C', fixturesDir]);
  console.log('Extracted git-repo test fixture.');
}
