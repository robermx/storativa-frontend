import { savePresentationByState } from '@/constants/common/edition.constants';
import { useEdition } from '@/context/EditionContext';

const EditionChapterStatus = () => {
  const { activeChapter, chapters, retrySave, saveState } = useEdition();

  if (!activeChapter) return null;

  const savePresentation = savePresentationByState[saveState];

  return (
    <div className="flex items-start gap-x-2 justify-between pb-2">
      <div className="min-w-0">
        <h2 className="truncate flex-1 text-sm font-medium text-dark/60 dark:text-light/60">
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
