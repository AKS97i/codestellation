// Thin execFile wrapper — used by the git and graphify adapters (Phase 3).
// Deliberately execFile, not exec: no shell interpolation, so a project
// path or branch name with special characters can't turn into a command
// injection risk.
import { execFile } from 'node:child_process';

export interface RunResult {
  stdout: string;
  stderr: string;
}

export function run(command: string, args: string[], { cwd, timeoutMs = 15000 }: { cwd?: string; timeoutMs?: number } = {}): Promise<RunResult> {
  return new Promise((resolve, reject) => {
    execFile(command, args, { cwd, timeout: timeoutMs, maxBuffer: 1024 * 1024 * 32 }, (error, stdout, stderr) => {
      if (error) {
        reject(Object.assign(error, { stdout, stderr }));
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}
