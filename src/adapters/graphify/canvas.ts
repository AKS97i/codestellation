import * as fs from 'node:fs/promises';

interface CanvasNode {
  id: string;
  type: string;
  color?: string;
  [key: string]: unknown;
}

interface CanvasFile {
  nodes: CanvasNode[];
  edges: unknown[];
}

/**
 * Recolors every group node in an exported graph.canvas to a single hex
 * color, so the canvas visually matches the project's chosen planet color
 * instead of graphify's own per-community palette. Obsidian's Canvas
 * format accepts a full hex string in `color` (not just the 1-6 preset
 * indices graphify's export uses by default).
 */
export async function recolorCanvasGroups(canvasPath: string, hex: string): Promise<void> {
  const raw = await fs.readFile(canvasPath, 'utf8');
  const canvas: CanvasFile = JSON.parse(raw);

  for (const node of canvas.nodes) {
    if (node.type === 'group') {
      node.color = hex;
    }
  }

  await fs.writeFile(canvasPath, JSON.stringify(canvas));
}
