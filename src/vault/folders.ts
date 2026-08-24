import type { Vault } from 'obsidian';
import { VAULT_ROOT_FOLDER, VAULT_DATA_FOLDER, VAULT_PROJECTS_FOLDER } from '../constants';

/** The base folder set every vault needs, independent of which projects are imported. */
export function baseFolderPlan(): string[] {
  return [VAULT_ROOT_FOLDER, VAULT_DATA_FOLDER, VAULT_PROJECTS_FOLDER];
}

/** Per-project folders — graph/ and worklogs/ under projects/<slug>/. */
export function projectFolderPlan(slug: string): string[] {
  return [`${VAULT_PROJECTS_FOLDER}/${slug}`, `${VAULT_PROJECTS_FOLDER}/${slug}/graph`, `${VAULT_PROJECTS_FOLDER}/${slug}/worklogs`];
}

/**
 * Creates every folder in `plan` that doesn't already exist. Idempotent —
 * re-running onboarding (or recovering from a crash mid-import, per the
 * plan's Phase 4 "done when") never fails on folders that are already there.
 */
export async function ensureFolders(vault: Vault, plan: string[], onProgress?: (folder: string) => void): Promise<void> {
  for (const folder of plan) {
    const exists = await vault.adapter.exists(folder);
    if (!exists) {
      await vault.createFolder(folder);
    }
    onProgress?.(folder);
  }
}
