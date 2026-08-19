import { type FC } from 'react';

import { EMPTY_EDITOR_CONTENT } from '@/constants/common/edition.constants';
import { useEdition } from '@/context/EditionContext';
import RichTextEditor from './RichTextEditor';
import EditionChapterStatus from './EditionChapterStatus';

const EditionEditorPanel: FC = () => {
  const { activeChapter, updateContent } = useEdition();

  if (!activeChapter) return null;

  return (
    <section aria-label={`Edición de ${activeChapter.title}`}>
      <EditionChapterStatus />
      <RichTextEditor
        chapterId={activeChapter._id}
        content={activeChapter.content || EMPTY_EDITOR_CONTENT}
        onChange={updateContent}
      />
    </section>
  );
};

export default EditionEditorPanel;
