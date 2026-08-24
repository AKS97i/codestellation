import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const CHARS_PER_TOKEN_ESTIMATE = 4; // rough heuristic for English/code text — same one used on the actual-context side, so the comparison is apples-to-apples even if the absolute numbers are approximate

export interface SavingsEstimate {
  actualTokens: number;
  baselineTokens: number;
  savedTokens: number; // baseline - actual; never negative — see clampSavings
}

/**
 * Decision 3 (implementation plan): tokens saved = what a graphify-context
 * query actually cost, vs. what it would have cost to have Claude/Codex
 * read the underlying source files directly instead.
 *
 * This is explicitly an ESTIMATE, not a measurement — both sides use the
 * same chars-per-token heuristic, and the "baseline" is hypothetical (the
 * files were never actually read in full). Always label it as such in the
 * UI, per the design spec.
 */
export function estimateSavingsFromSizes(actualContextChars: number, sourceFileByteSizes: number[]): SavingsEstimate {
  const actualTokens = Math.round(actualContextChars / CHARS_PER_TOKEN_ESTIMATE);
  const baselineBytes = sourceFileByteSizes.reduce((sum, n) => sum + n, 0);
  const baselineTokens = Math.round(baselineBytes / CHARS_PER_TOKEN_ESTIMATE);
  return {
    actualTokens,
    baselineTokens,
    savedTokens: Math.max(0, baselineTokens - actualTokens), // never report negative "savings"
  };
}

/**
 * Convenience wrapper: given the actual context string returned by a
 * graphify query and the list of source files its result nodes point to
 * (deduplicated — the same file backing multiple nodes is only read once
 * in the hypothetical baseline), stats those files and estimates savings.
 * Missing files are skipped rather than failing the whole estimate.
 */
export async function estimateSavingsForQuery(projectRoot: string, actualContext: string, sourceFiles: string[]): Promise<SavingsEstimate> {
  const unique = Array.from(new Set(sourceFiles));
  const sizes = await Promise.all(
    unique.map(async (relPath) => {
      try {
        const stat = await fs.stat(path.join(projectRoot, relPath));
        return stat.size;
      } catch {
        return 0; // file moved/deleted since the graph was built — don't fail the estimate over it
      }
    })
  );
  return estimateSavingsFromSizes(actualContext.length, sizes);
}
