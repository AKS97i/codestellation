import { describe, it, expect, afterEach } from 'vitest';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { ensureGraphifyOutIgnored } from './gitignore';

const FIXTURE_REPO = path.join(import.meta.dirname, '../../testing/fixtures/git-repo');
const GITIGNORE_PATH = path.join(FIXTURE_REPO, '.gitignore');

afterEach(async () => {
  await fs.rm(GITIGNORE_PATH, { force: true });
});

describe('ensureGraphifyOutIgnored', () => {
  it('creates a .gitignore with graphify-out/ when none exists', async () => {
    await ensureGraphifyOutIgnored(FIXTURE_REPO);
    const content = await fs.readFile(GITIGNORE_PATH, 'utf8');
    expect(content).toContain('graphify-out/');
  });

  it('appends to an existing .gitignore without clobbering other entries', async () => {
    await fs.writeFile(GITIGNORE_PATH, 'node_modules/\n');
    await ensureGraphifyOutIgnored(FIXTURE_REPO);
    const content = await fs.readFile(GITIGNORE_PATH, 'utf8');
    expect(content).toContain('node_modules/');
    expect(content).toContain('graphify-out/');
  });

  it('is idempotent, does not duplicate the entry on a second call', async () => {
    await ensureGraphifyOutIgnored(FIXTURE_REPO);
    await ensureGraphifyOutIgnored(FIXTURE_REPO);
    const content = await fs.readFile(GITIGNORE_PATH, 'utf8');
    const occurrences = content.split('\n').filter((l) => l.trim() === 'graphify-out/').length;
    expect(occurrences).toBe(1);
  });

  it('does nothing for a folder that is not a git repo', async () => {
    const notARepo = path.join(import.meta.dirname, '../../testing/fixtures/claude-code');
    await ensureGraphifyOutIgnored(notARepo);
    const exists = await fs.stat(path.join(notARepo, '.gitignore')).then(() => true).catch(() => false);
    expect(exists).toBe(false);
  });
});
