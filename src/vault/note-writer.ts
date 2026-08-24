import type { Vault } from 'obsidian';
import type { RegistryEntry } from '../domain/project-registry';
import { VAULT_PROJECTS_FOLDER } from '../constants';

/**
 * Writes (or refreshes) the overview.md note for a project — the one
 * user-visible file the vault layout promises exists per project,
 * alongside its graph/ and worklogs/ folders. Idempotent: re-running
 * onboarding overwrites this file rather than erroring on it already
 * existing, since it's fully derived from the registry entry, not a
 * place the user is expected to write their own notes.
 */
export async function writeProjectOverview(vault: Vault, entry: RegistryEntry): Promise<void> {
  const path = `${VAULT_PROJECTS_FOLDER}/${entry.id}/overview.md`;
  const content = renderOverview(entry);

  const exists = await vault.adapter.exists(path);
  if (exists) {
    await vault.adapter.write(path, content);
  } else {
    await vault.create(path, content);
  }
}

function renderOverview(entry: RegistryEntry): string {
  return `---
codestellation_id: ${entry.id}
path: "${entry.path}"
imported_at: ${entry.importedAt}
---

# ${entry.name}

- **Path:** \`${entry.path}\`
- **Imported:** ${new Date(entry.importedAt).toLocaleDateString()}
- **Graphify graph:** ${entry.graphPath ? `[[${entry.graphPath}]]` : 'not yet generated'}

This note is managed by Codestellation and regenerated on each setup run.
Project stats (sessions, tokens, branches) render live in the plugin's own
view rather than being written here as static text.
`;
}
