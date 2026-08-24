export const VIEW_TYPE_HOME = 'codestellation-home';
export const VIEW_TYPE_WORKSPACE = 'codestellation-workspace';

// vault-relative paths — see docs/superpowers/specs/…-agentic-os-obsidian-plugin-design.md
// for why this structure (graphify output needs to live inside the vault so
// Obsidian's native Graph View can render it)
export const VAULT_ROOT_FOLDER = 'Codestellation';
export const VAULT_DATA_FOLDER = `${VAULT_ROOT_FOLDER}/_data`;
export const VAULT_PROJECTS_FOLDER = `${VAULT_ROOT_FOLDER}/projects`;
