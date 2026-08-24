import { describe, it, expect, vi } from 'vitest';
import { baseFolderPlan, projectFolderPlan, ensureFolders } from './folders';

describe('folder plans', () => {
  it('base plan includes the root, data, and projects folders', () => {
    const plan = baseFolderPlan();
    expect(plan).toContain('Codestellation');
    expect(plan).toContain('Codestellation/_data');
    expect(plan).toContain('Codestellation/projects');
  });

  it('project plan includes graph/ and worklogs/ under the slug', () => {
    const plan = projectFolderPlan('acme-lms');
    expect(plan).toEqual([
      'Codestellation/projects/acme-lms',
      'Codestellation/projects/acme-lms/graph',
      'Codestellation/projects/acme-lms/worklogs',
    ]);
  });
});

// A minimal fake satisfying just the two Vault methods ensureFolders calls —
// not a real Obsidian Vault, but that's the point: this tests our own
// branching logic (skip if exists, create if not), not Obsidian's API.
function fakeVault(existing: Set<string>) {
  const created: string[] = [];
  return {
    vault: {
      adapter: { exists: vi.fn(async (p: string) => existing.has(p)) },
      createFolder: vi.fn(async (p: string) => { created.push(p); }),
    } as any,
    created,
  };
}

describe('ensureFolders', () => {
  it('is idempotent — never tries to create a folder that already exists', async () => {
    const { vault, created } = fakeVault(new Set(['Codestellation', 'Codestellation/_data']));
    await ensureFolders(vault, baseFolderPlan());
    expect(created).toEqual(['Codestellation/projects']);
  });

  it('creates every folder when none exist yet', async () => {
    const { vault, created } = fakeVault(new Set());
    await ensureFolders(vault, baseFolderPlan());
    expect(created).toHaveLength(3);
  });

  it('calls onProgress for every folder in the plan, including ones that already existed', async () => {
    const { vault } = fakeVault(new Set(['Codestellation']));
    const seen: string[] = [];
    await ensureFolders(vault, baseFolderPlan(), (f) => seen.push(f));
    expect(seen).toEqual(baseFolderPlan());
  });
});
