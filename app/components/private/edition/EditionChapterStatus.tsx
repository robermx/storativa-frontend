import { useTranslation } from 'react-i18next';

import { getSavePresentationByState } from '@/constants/common/edition.constants';
import { useEdition } from '@/context/EditionContext';

const EditionChapterStatus = () => {
  const { t } = useTranslation('editor');
  const { activeChapter, chapters, retrySave, saveState } = useEdition();

  if (!activeChapter) return null;

  const savePresentation = getSavePresentationByState(t)[saveState];

  return (
    <div className="flex items-start gap-x-2 justify-between py-3 pr-3">

      <h2 className="truncate flex-1 text-sm font-medium text-dark/60 dark:text-light/60">
        <span className="font-extrabold text-darkness bg-primary/40 py-3 px-3 rounded-br-4xl mr-2 dark:text-lightness">
          {t('editor.chapterProgress', {
            current: activeChapter.order + 1,
            total: chapters.length,
          })}{' '}
        </span>
        {activeChapter.title}
      </h2>
      <div
        aria-live="polite"
        className={`flex items-center gap-2 text-sm font-medium ${savePresentation.className}`}
      >
        <savePresentation.Icon
          size={18}
          className={saveState === 'saving' ? 'animate-spin' : undefined}
        />
        <span className="hidden sm:block">{savePresentation.label}</span>
        {saveState === 'error' && (
          <button
            type="button"
            onClick={() => void retrySave()}
            className="ml-1 underline underline-offset-2"
          >
            <savePresentation.Icon size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default EditionChapterStatus;
