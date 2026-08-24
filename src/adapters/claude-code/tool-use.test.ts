import { describe, it, expect } from 'vitest';
import { extractToolUseFileRefs } from './tool-use';

function line(obj: unknown): string {
  return JSON.stringify(obj);
}

describe('extractToolUseFileRefs', () => {
  it('extracts a file_path from an Edit tool_use block', () => {
    const refs = extractToolUseFileRefs(
      line({ type: 'assistant', message: { content: [{ type: 'tool_use', name: 'Edit', input: { file_path: '/proj/src/a.ts' } }] } })
    );
    expect(refs).toEqual([{ toolName: 'Edit', filePath: '/proj/src/a.ts' }]);
  });

  it('extracts multiple refs from multiple tool_use blocks in one line', () => {
    const refs = extractToolUseFileRefs(
      line({
        type: 'assistant',
        message: {
          content: [
            { type: 'tool_use', name: 'Read', input: { file_path: '/proj/a.ts' } },
            { type: 'text', text: 'looking at this' },
            { type: 'tool_use', name: 'Write', input: { path: '/proj/b.ts' } },
          ],
        },
      })
    );
    expect(refs).toEqual([
      { toolName: 'Read', filePath: '/proj/a.ts' },
      { toolName: 'Write', filePath: '/proj/b.ts' },
    ]);
  });

  it('returns nothing for a non-assistant line', () => {
    expect(extractToolUseFileRefs(line({ type: 'user', message: {} }))).toEqual([]);
  });

  it('returns nothing for a tool_use block with no recognizable file path key (e.g. Bash)', () => {
    const refs = extractToolUseFileRefs(
      line({ type: 'assistant', message: { content: [{ type: 'tool_use', name: 'Bash', input: { command: 'ls' } }] } })
    );
    expect(refs).toEqual([]);
  });

  it('survives a corrupt line without throwing', () => {
    expect(extractToolUseFileRefs('not json{{{')).toEqual([]);
  });

  it('survives an assistant line with no content array', () => {
    expect(extractToolUseFileRefs(line({ type: 'assistant', message: {} }))).toEqual([]);
  });
});
