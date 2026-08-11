import { type FC } from 'react';

import {
  EMPTY_EDITOR_CONTENT,
  savePresentationByState,
} from '@/constants/common/edition.constants';
import { useEdition } from '@/context/EditionContext';
import RichTextEditor from './RichTextEditor';

const EditionEditorPanel: FC = () => {
  const { activeChapter, chapters, retrySave, saveState, updateContent } =
    useEdition();

  if (!activeChapter) return null;

  const savePresentation = savePresentationByState[saveState];

  return (
    <section aria-label={`Edición de ${activeChapter.title}`}>
      <div className="flex items-end justify-between px-2">
        <div>
          <h2 className="truncate text-sm font-medium text-dark/60 dark:text-light/60">
            {activeChapter.title}
          </h2>
          <span className="text-xs text-dark/45 dark:text-light/45">
            Capítulo {activeChapter.order + 1} de {chapters.length}
          </span>
        </div>
        <div
          aria-live="polite"
          className={`flex items-center gap-2 text-sm font-medium ${savePresentation.className}`}
        >
          <savePresentation.Icon
            size={18}
            className={saveState === 'saving' ? 'animate-spin' : undefined}
          />
          <span>{savePresentation.label}</span>
          {saveState === 'error' && (
            <button
              type="button"
              onClick={() => void retrySave()}
              className="ml-1 underline underline-offset-2"
            >
              Reintentar
            </button>
          )}
        </div>
      </div>
      <RichTextEditor
        chapterId={activeChapter._id}
        content={activeChapter.content || EMPTY_EDITOR_CONTENT}
        onChange={updateContent}
      />
    </section>
  );
};

export default EditionEditorPanel;
