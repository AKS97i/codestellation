// Shared shape used across adapters (Phase 3), the vault registry (Phase 4),
// and every UI view. Deliberately identical to prototype/src/data/mock-projects.js's
// shape so that porting the Phase 0/1 UI modules into this plugin later is
// a straight swap of the data source, not a rewrite.

export interface Branch {
  name: string;
  location: 'local' | 'remote' | 'both';
  stale: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  agent: 'claude' | 'codex';
  updatedAt: string; // ISO 8601
  messageCount: number;
}

export interface GraphSummary {
  nodes: number;
  links: number;
}

export interface Project {
  id: string;
  name: string;
  path: string; // absolute filesystem path — the source of truth; the id/slug is only an index key
  hue: number; // 0-359, derived from a hash of `id` — see core/hue.ts (Phase 3)
  sessions: number;
  tokens: number;
  tokensSavedEstimate: number;
  timeThisWeekHours: number;
  lastActive: string; // ISO 8601
  branches: Branch[];
  chats: ChatSession[];
  graphSummary: GraphSummary | null;
}

export interface CheckIn {
  projectId: string | null;
  startedAt: string; // ISO 8601 wall-clock — recomputed on resume, never accumulated as ticks
  targetHours: number;
}

export interface CodestellationSettings {
  userName: string;
  checkInTargetHours: number;
  onboardingComplete: boolean;
  interfaceFont: 'obsidian' | 'system' | 'serif' | 'mono';
  galaxyAccentHue: number;
  sceneIntensity: 'minimal' | 'calm' | 'cinematic';
  showBranchMoons: boolean;
  showBranchSatellites: boolean;
}

export const DEFAULT_SETTINGS: CodestellationSettings = {
  userName: '',
  checkInTargetHours: 8,
  onboardingComplete: false,
  interfaceFont: 'obsidian',
  galaxyAccentHue: 230,
  sceneIntensity: 'cinematic',
  showBranchMoons: true,
  showBranchSatellites: true,
};
