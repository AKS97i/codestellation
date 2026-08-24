import { run } from '../../core/shell';

export interface CommitSummary {
  hash: string;
  author: string;
  subject: string;
}

// ASCII unit separator — won't collide with real commit message/author text the way "|" or "," could
const FIELD_SEP = '\x1f';

/** Commits landed on one calendar day (local time), across all local branches — a work log is "what did I do that day," not "what's on main." */
export async function commitsOnDate(repoPath: string, dateISO: string): Promise<CommitSummary[]> {
  const since = `${dateISO} 00:00:00`;
  const until = `${dateISO} 23:59:59`;
  const { stdout } = await run(
    'git',
    ['log', '--all', `--since=${since}`, `--until=${until}`, `--pretty=format:%H${FIELD_SEP}%an${FIELD_SEP}%s`],
    { cwd: repoPath }
  );

  return stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [hash, author, subject] = line.split(FIELD_SEP);
      return { hash, author, subject };
    });
}
