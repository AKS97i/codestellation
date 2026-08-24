import * as path from 'node:path';
import type { ParsedGraph } from '../adapters/graphify/types';

/**
 * Maps a touched file's absolute path to graph node ids whose `source_file`
 * points at it. A file can back more than one node (multiple functions in
 * one file), so this returns every match rather than assuming one. A file
 * outside the project root, or one with no matching node, returns an
 * empty array — silently nothing, per the plan's Phase 9 "no-match is
 * silent, not wrong" rule, rather than a wrong highlight.
 */
export function resolveTouchedFileToNodeIds(graph: ParsedGraph, projectRoot: string, absPath: string): string[] {
  const rel = path.relative(projectRoot, absPath);
  if (rel.startsWith('..') || path.isAbsolute(rel)) return [];
  return graph.nodes.filter((n) => n.source_file === rel).map((n) => n.id);
}
