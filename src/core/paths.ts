// Every OS path Codestellation reads from lives here, in one place —
// per the implementation plan's Phase 2 decision, so adapters (Phase 3)
// never construct a path themselves.
import * as os from 'node:os';
import * as path from 'node:path';

const home = os.homedir();

export const PATHS = {
  claudeCodeProjects: path.join(home, '.claude', 'projects'),
  codexSessions: path.join(home, '.codex', 'sessions'),
  codexConfig: path.join(home, '.codex', 'config.toml'),
  codexSessionIndex: path.join(home, '.codex', 'session_index.jsonl'),
};

/**
 * graphify has no single known install location — pipx, homebrew, and npm
 * global all put it somewhere different, and a GUI app like Obsidian is
 * launched with a minimal PATH that usually excludes all of them (it isn't
 * given the user's shell rc). So detection tries the bare command (works
 * when it happens to be on Obsidian's PATH) plus every well-known install
 * dir, rather than trusting one hardcoded path.
 *
 * Windows is deliberately not covered: whether graphify even ships a
 * Windows build is unverified (see the implementation plan's environment
 * facts, gathered only on macOS). Guessing a Windows path here would just
 * be fabricated, not a real fix — bare `graphify`/`graphify.exe` via PATH
 * is the only honest thing to try there.
 */
export function graphifyCandidates(): string[] {
  if (process.platform === 'win32') {
    return ['graphify.exe', 'graphify.cmd', 'graphify'];
  }
  return [
    'graphify',
    path.join(home, '.local', 'bin', 'graphify'),
    '/opt/homebrew/bin/graphify',
    '/usr/local/bin/graphify',
  ];
}

/** Same reasoning as graphifyCandidates() — Obsidian's minimal PATH can't be assumed to include wherever the Claude Code CLI actually lives (homebrew, native installer, nvm-managed node_modules/.bin, etc). Used by the work log generator, which shells out to `claude -p` for the AI-written summary. */
export function claudeCliCandidates(): string[] {
  if (process.platform === 'win32') {
    return ['claude.exe', 'claude.cmd', 'claude'];
  }
  return [
    'claude',
    '/opt/homebrew/bin/claude',
    '/usr/local/bin/claude',
    path.join(home, '.local', 'bin', 'claude'),
  ];
}
