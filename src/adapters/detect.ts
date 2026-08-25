import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as os from 'node:os';
import { PATHS, graphifyCandidates, claudeCliCandidates } from '../core/paths';
import { run } from '../core/shell';

/**
 * A real Windows beta tester hit this: they ran `pip install graphifyy`
 * from PowerShell and the plugin still reported it as not installed.
 * Two real, distinct causes are possible and neither is fixable by
 * guessing a single hardcoded path:
 *
 * 1. PATH is genuinely correct, but Obsidian was already running when
 *    graphify was installed — a Windows process's PATH is captured at
 *    launch, so a newly-updated PATH is invisible until the app fully
 *    restarts. No code fix for this; it's a restart-Obsidian issue.
 * 2. pip's per-user install on Windows puts console scripts in a
 *    version-specific `Scripts` folder that usually isn't on PATH at
 *    all (`%APPDATA%\Python\Python3XX\Scripts`, or the equivalent under
 *    `%LOCALAPPDATA%\Programs\Python\Python3XX` for a per-user Python
 *    install) — these are standard, documented Python install
 *    conventions, not a guess specific to this project. This scans for
 *    them directly instead of assuming PATH is complete.
 *
 * This has NOT been verified against a real Windows machine — nobody
 * involved in building this plugin has one. If it still doesn't detect
 * graphify after this, the diagnostics command's platform/path dump is
 * the next thing to check, not another blind guess.
 */
async function windowsGraphifyCandidates(): Promise<string[]> {
  if (process.platform !== 'win32') return [];
  const candidates: string[] = [];
  const roots = [process.env.APPDATA && path.join(process.env.APPDATA, 'Python'), process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Programs', 'Python')].filter(
    (p): p is string => Boolean(p)
  );
  for (const root of roots) {
    const entries = await fs.readdir(root).catch(() => [] as string[]);
    for (const entry of entries) {
      if (/^Python\d/i.test(entry)) candidates.push(path.join(root, entry, 'Scripts', 'graphify.exe'));
    }
  }
  if (process.env.USERPROFILE) {
    // pipx's Windows default location, and the same ~/.local/bin
    // convention pipx and this plugin already use on macOS/Linux
    candidates.push(path.join(process.env.USERPROFILE, 'pipx', 'bin', 'graphify.exe'));
    candidates.push(path.join(process.env.USERPROFILE, '.local', 'bin', 'graphify.exe'));
  }
  return candidates;
}

export interface AgentAvailability {
  claudeCode: boolean;
  codex: boolean;
}

/** Checks whether Claude Code and/or Codex have ever run on this machine, by presence of their local session directories — not by checking for the CLI binary on PATH, since a session history existing is the actual signal onboarding cares about. */
export async function detectAgentAvailability(): Promise<AgentAvailability> {
  const [claudeCode, codex] = await Promise.all([
    fs.stat(PATHS.claudeCodeProjects).then((s) => s.isDirectory()).catch(() => false),
    fs.stat(PATHS.codexSessions).then((s) => s.isDirectory()).catch(() => false),
  ]);
  return { claudeCode, codex };
}

export const GRAPHIFY_MIN_VERSION = '0.9.47'; // matches the graphify skill version at time of writing — see R6 in the implementation plan

export interface GraphifyAvailability {
  installed: boolean;
  version: string | null;
  /** The candidate path that actually worked — null when nothing did. Callers that need to invoke graphify (the onboarding wizard) should reuse this rather than guessing a path themselves. */
  bin: string | null;
}

let cached: { bin: string | null; version: string | null } | undefined;

export function clearGraphifyDetectionCache(): void {
  cached = undefined;
}

async function userInstalledGraphifyCandidates(): Promise<string[]> {
  if (process.platform !== 'darwin') return [];
  const pythonRoot = path.join(os.homedir(), 'Library', 'Python');
  const versions = await fs.readdir(pythonRoot).catch(() => [] as string[]);
  return versions.map((version) => path.join(pythonRoot, version, 'bin', 'graphify'));
}

/** Tries every known graphify location in order and caches only a successful lookup. A negative result must remain refreshable: users commonly install Graphify while this already-running Obsidian process is showing the setup screen. */
async function resolveGraphifyBin(): Promise<{ bin: string | null; version: string | null }> {
  if (cached !== undefined) {
    return cached;
  }
  const candidates = [...graphifyCandidates(), ...(await userInstalledGraphifyCandidates()), ...(await windowsGraphifyCandidates())];
  for (const candidate of candidates) {
    try {
      const { stdout } = await run(candidate, ['--version']);
      const match = stdout.match(/(\d+\.\d+\.\d+)/);
      cached = { bin: candidate, version: match?.[1] ?? null };
      return cached;
    } catch {
      // try the next candidate
    }
  }
  return { bin: null, version: null };
}

export async function detectGraphify(options: { forceRefresh?: boolean } = {}): Promise<GraphifyAvailability> {
  if (options.forceRefresh) clearGraphifyDetectionCache();
  const { bin, version } = await resolveGraphifyBin();
  return { installed: bin !== null, version, bin };
}

/** A graph already exists for this project if graphify-out/graph.json is present. */
export async function projectHasGraph(projectPath: string): Promise<boolean> {
  return fs
    .stat(`${projectPath}/graphify-out/graph.json`)
    .then((s) => s.isFile())
    .catch(() => false);
}

let cachedClaudeBin: string | null | undefined;

/** Same resolution strategy as detectGraphify() — the work log generator needs to shell out to `claude -p`, and can't assume it's on Obsidian's minimal PATH. */
export async function resolveClaudeCliBin(): Promise<string | null> {
  if (cachedClaudeBin !== undefined) return cachedClaudeBin;
  for (const candidate of claudeCliCandidates()) {
    try {
      await run(candidate, ['--version']);
      cachedClaudeBin = candidate;
      return cachedClaudeBin;
    } catch {
      // try the next candidate
    }
  }
  cachedClaudeBin = null;
  return null;
}
