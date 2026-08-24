import type { Vault } from 'obsidian';
import type { CheckIn } from '../types';

const CHECKIN_PATH = 'Codestellation/_data/checkins.json';

/** Single active check-in, or null. Persisted as wall-clock `startedAt` — elapsed time is always recomputed from that on read, never accumulated as ticks, so app restarts/sleep/timezone changes can't drift it (see the implementation plan's Phase 8 risk note). */
export async function loadCheckIn(vault: Vault): Promise<CheckIn | null> {
  const exists = await vault.adapter.exists(CHECKIN_PATH);
  if (!exists) return null;
  try {
    const raw = await vault.adapter.read(CHECKIN_PATH);
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.startedAt !== 'string') return null;
    return parsed as CheckIn;
  } catch {
    return null; // corrupt file shouldn't crash the plugin — treat as "not checked in"
  }
}

export async function saveCheckIn(vault: Vault, checkIn: CheckIn | null): Promise<void> {
  if (checkIn === null) {
    if (await vault.adapter.exists(CHECKIN_PATH)) await vault.adapter.remove(CHECKIN_PATH);
    return;
  }
  await vault.adapter.write(CHECKIN_PATH, JSON.stringify(checkIn, null, 2));
}

export function elapsedHours(checkIn: CheckIn, now: number): number {
  const ms = now - new Date(checkIn.startedAt).getTime();
  return Math.max(0, ms / (1000 * 60 * 60));
}

export function hasCrossedTarget(checkIn: CheckIn, now: number): boolean {
  return elapsedHours(checkIn, now) >= checkIn.targetHours;
}

export function formatElapsed(hours: number): string {
  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}
