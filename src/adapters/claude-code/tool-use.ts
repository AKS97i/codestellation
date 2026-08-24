/**
 * Extracts file paths from tool_use content blocks in a raw Claude Code
 * session line. This mirrors the general `message.content[]` block shape
 * Claude's own tool-use format uses ({type:'tool_use', name, input}) —
 * the same family as the assistant/usage shape the implementation plan's
 * environment facts already verified — but the exact field wasn't itself
 * called out in that research pass, so treat this as best-effort: unknown
 * shapes just yield no refs rather than throwing.
 */
export interface ToolUseFileRef {
  toolName: string;
  filePath: string;
}

const FILE_PATH_KEYS = ['file_path', 'path', 'notebook_path'];

export function extractToolUseFileRefs(rawLine: string): ToolUseFileRef[] {
  let line: unknown;
  try {
    line = JSON.parse(rawLine);
  } catch {
    return [];
  }
  if (typeof line !== 'object' || line === null) return [];
  const obj = line as Record<string, unknown>;
  if (obj.type !== 'assistant') return [];

  const message = obj.message as Record<string, unknown> | undefined;
  const content = message?.content;
  if (!Array.isArray(content)) return [];

  const refs: ToolUseFileRef[] = [];
  for (const block of content) {
    if (typeof block !== 'object' || block === null) continue;
    const b = block as Record<string, unknown>;
    if (b.type !== 'tool_use') continue;
    const input = b.input;
    if (typeof input !== 'object' || input === null) continue;
    const inputObj = input as Record<string, unknown>;
    for (const key of FILE_PATH_KEYS) {
      const value = inputObj[key];
      if (typeof value === 'string' && value.length > 0) {
        refs.push({ toolName: typeof b.name === 'string' ? b.name : 'unknown', filePath: value });
        break;
      }
    }
  }
  return refs;
}
