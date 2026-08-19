import type { JSONContent } from '@tiptap/react';

import { EMPTY_EDITOR_CONTENT } from '@/constants/common/edition.constants';

export const legacyContentToJson = (content: string): JSONContent => {
  const normalized = content.trim();
  const isPlaceholder = normalized.toLowerCase() === 'are you ready for this?';

  if (!normalized || isPlaceholder) return EMPTY_EDITOR_CONTENT;

  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [{ type: 'text', text: normalized }],
      },
    ],
  };
};
