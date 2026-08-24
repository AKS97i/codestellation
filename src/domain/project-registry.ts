import type { Vault } from 'obsidian';
import { hueFromId } from '../core/hue';

export interface RegistryEntry {
  id: string; // slug — see slugify()
  name: string;
  path: string;
  hue: number;
  graphPath: string | null; // vault-relative, e.g. "Codestellation/projects/<slug>/graph" — null until graphify has run
  importedAt: string; // ISO 8601
}

const REGISTRY_PATH = 'Codestellation/_data/projects.json';

/** Turns an absolute path into a stable, filesystem/URL-safe id. Two different real paths could in principle collide after slugifying — addImportedProject() below detects that and disambiguates rather than silently merging two projects into one registry entry. */
export function slugify(absolutePath: string): string {
  const base = absolutePath
    .split('/')
    .filter(Boolean)
    .pop() ?? absolutePath;
  return base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'project';
}

export async function loadRegistry(vault: Vault): Promise<RegistryEntry[]> {
  const exists = await vault.adapter.exists(REGISTRY_PATH);
  if (!exists) return [];
  const raw = await vault.adapter.read(REGISTRY_PATH);
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return []; // corrupt registry file shouldn't crash the plugin — treat as empty and let onboarding rebuild it
  }
}

export async function saveRegistry(vault: Vault, entries: RegistryEntry[]): Promise<void> {
  await vault.adapter.write(REGISTRY_PATH, JSON.stringify(entries, null, 2));
}

/**
 * Adds a newly-imported project to the registry, disambiguating the slug
 * if it collides with an existing entry that points at a *different*
 * path (e.g. two projects both named "frontend" in different parent
 * folders would otherwise slugify to the same id).
 */
export function addImportedProject(existing: RegistryEntry[], { name, path, hue }: { name: string; path: string; hue?: number }): RegistryEntry[] {
  const alreadyImported = existing.find((e) => e.path === path);
  if (alreadyImported) return existing; // re-importing the same path is a no-op, not a duplicate

  let slug = slugify(path);
  let suffix = 2;
  while (existing.some((e) => e.id === slug)) {
    slug = `${slugify(path)}-${suffix}`;
    suffix++;
  }

  const entry: RegistryEntry = {
    id: slug,
    name,
    path,
    hue: hue ?? hueFromId(slug), // user-picked color during onboarding wins over the hash default
    graphPath: null,
    importedAt: new Date().toISOString(),
  };
  return [...existing, entry];
}
