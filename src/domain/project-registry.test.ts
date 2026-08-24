import { describe, it, expect } from 'vitest';
import { slugify, addImportedProject, loadRegistry, saveRegistry, type RegistryEntry } from './project-registry';

describe('slugify', () => {
  it('derives a slug from the last path segment', () => {
    expect(slugify('/Users/repouser/Projects/Acme')).toBe('acme');
  });

  it('handles a path segment that already contains a dash', () => {
    // this is exactly the case that makes Claude Code's slug decoding lossy
    // (see R14) — our own slugify doesn't need to be reversible, so it's fine
    expect(slugify('/Users/repouser/Projects/ExampleWebsite/landing-page')).toBe('landing-page');
  });

  it('falls back to a safe default for a degenerate path', () => {
    expect(slugify('')).toBe('project');
  });
});

describe('addImportedProject', () => {
  it('adds a new entry with a deterministic hue and an ISO importedAt', () => {
    const result = addImportedProject([], { name: 'Acme - LMS', path: '/Users/repouser/Projects/Acme' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('acme');
    expect(result[0].graphPath).toBeNull();
    expect(new Date(result[0].importedAt).toString()).not.toBe('Invalid Date');
  });

  it('is a no-op when re-importing a path already in the registry', () => {
    const first = addImportedProject([], { name: 'Acme - LMS', path: '/Users/repouser/Projects/Acme' });
    const second = addImportedProject(first, { name: 'Acme - LMS', path: '/Users/repouser/Projects/Acme' });
    expect(second).toHaveLength(1);
    expect(second).toBe(first); // same reference — genuinely a no-op, not a rebuild
  });

  it('uses an explicit hue when provided (user-picked color in onboarding) instead of the hash default', () => {
    const result = addImportedProject([], { name: 'Acme - LMS', path: '/Users/repouser/Projects/Acme', hue: 200 });
    expect(result[0].hue).toBe(200);
  });

  it('disambiguates two different projects that would otherwise slugify to the same id', () => {
    const first = addImportedProject([], { name: 'Frontend A', path: '/Users/aks/work/client-a/frontend' });
    const second = addImportedProject(first, { name: 'Frontend B', path: '/Users/aks/work/client-b/frontend' });
    expect(second).toHaveLength(2);
    expect(second[0].id).toBe('frontend');
    expect(second[1].id).toBe('frontend-2');
    expect(second[1].path).toBe('/Users/aks/work/client-b/frontend');
  });
});

function fakeVault(initialFiles: Record<string, string> = {}) {
  const files = { ...initialFiles };
  return {
    adapter: {
      exists: async (p: string) => p in files,
      read: async (p: string) => files[p],
      write: async (p: string, content: string) => { files[p] = content; },
    },
  } as any;
}

describe('loadRegistry / saveRegistry', () => {
  it('returns an empty array when no registry file exists yet', async () => {
    const vault = fakeVault();
    expect(await loadRegistry(vault)).toEqual([]);
  });

  it('round-trips entries through save then load', async () => {
    const vault = fakeVault();
    const entries: RegistryEntry[] = addImportedProject([], { name: 'Acme - LMS', path: '/Users/repouser/Projects/Acme' });
    await saveRegistry(vault, entries);
    expect(await loadRegistry(vault)).toEqual(entries);
  });

  it('treats a corrupt registry file as empty rather than throwing', async () => {
    const vault = fakeVault({ 'Codestellation/_data/projects.json': 'not valid json {{{' });
    expect(await loadRegistry(vault)).toEqual([]);
  });
});
