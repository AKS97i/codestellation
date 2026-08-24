import * as fs from 'node:fs/promises';
import * as path from 'node:path';

/**
 * graphify writes its raw build output (graph.json, cache/, etc) directly
 * into `<project>/graphify-out/` — that's graphify's own hardcoded
 * behavior (no flag to redirect it), and it needs to stay there for
 * graphify's incremental caching to work on future runs, so Codestellation
 * doesn't move or delete it. What it CAN do is make sure that folder never
 * accidentally ends up committed to the project's own git history, since
 * the user never asked for graph-build artifacts in their repo.
 *
 * A no-op for a project that isn't a git repo (there's no history to
 * accidentally commit graphify-out into), and idempotent — safe to call
 * after every graphify run, not just the first.
 */
export async function ensureGraphifyOutIgnored(projectPath: string): Promise<void> {
  const isGitRepo = await fs.stat(path.join(projectPath, '.git')).then(() => true).catch(() => false);
  if (!isGitRepo) return;

  const gitignorePath = path.join(projectPath, '.gitignore');
  const existing = await fs.readFile(gitignorePath, 'utf8').catch(() => '');
  const alreadyIgnored = existing
    .split('\n')
    .map((line) => line.trim())
    .some((line) => line === 'graphify-out' || line === 'graphify-out/' || line === '/graphify-out' || line === '/graphify-out/');
  if (alreadyIgnored) return;

  const separator = existing.length > 0 && !existing.endsWith('\n') ? '\n' : '';
  const addition = `${separator}\n# added by Codestellation: graphify's build output, not meant to be committed\ngraphify-out/\n`;
  await fs.writeFile(gitignorePath, existing + addition);
}
