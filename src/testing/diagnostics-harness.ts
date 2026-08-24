// Phase 3 "done when" harness: prints real discovered data so it can be
// hand-spot-checked against the raw files, without any UI involved.
// Run with: npx tsx src/testing/diagnostics-harness.ts
import { discoverClaudeCodeProjects } from '../adapters/claude-code/discover';
import { listBranches } from '../adapters/git/branches';
import * as fs from 'node:fs/promises';

async function main() {
  const projects = await discoverClaudeCodeProjects();
  console.log(`Discovered ${projects.length} distinct project cwd(s) from Claude Code session history:\n`);

  for (const project of projects) {
    const totalInput = project.sessions.reduce((s, x) => s + x.totalInputTokens, 0);
    const totalOutput = project.sessions.reduce((s, x) => s + x.totalOutputTokens, 0);
    const models = new Set(project.sessions.flatMap((s) => s.modelsUsed));
    const unparsed = project.sessions.reduce((s, x) => s + x.unparsedLineCount, 0);

    console.log(`📁 ${project.cwd}`);
    console.log(`   sessions: ${project.sessions.length}`);
    console.log(`   tokens: ${totalInput.toLocaleString()} in / ${totalOutput.toLocaleString()} out`);
    console.log(`   models: ${[...models].join(', ') || '(none recorded)'}`);
    if (unparsed > 0) console.log(`   ⚠ unparsed lines: ${unparsed}`);

    const isGitRepo = await fs.stat(`${project.cwd}/.git`).then(() => true).catch(() => false);
    if (isGitRepo) {
      try {
        const branches = await listBranches(project.cwd);
        console.log(`   branches: ${branches.map((b) => `${b.name}(${b.location}${b.stale ? ',stale' : ''})`).join(', ')}`);
      } catch (e) {
        console.log(`   branches: (git error: ${(e as Error).message})`);
      }
    } else {
      console.log(`   branches: (not a git repo)`);
    }
    console.log('');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
