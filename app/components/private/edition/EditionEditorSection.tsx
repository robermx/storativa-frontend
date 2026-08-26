import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { EMPTY_EDITOR_CONTENT } from '@/constants/common/edition.constants';
import { useEdition } from '@/context/EditionContext';
import RichTextEditor from './RichTextEditor';
import EditionChapterStatus from './EditionChapterStatus';

const EditionEditorSection: FC = () => {
  const { t } = useTranslation('editor');
  const { activeChapter, updateContent } = useEdition();

  if (!activeChapter) return null;

  return (
    <section aria-label={t('editor.sectionAriaLabel', { title: activeChapter.title })}>
      <EditionChapterStatus />
      <RichTextEditor
        chapterId={activeChapter._id}
        content={activeChapter.content || EMPTY_EDITOR_CONTENT}
        onChange={updateContent}
      />
    </section>
  );
};

export default EditionEditorSection;
