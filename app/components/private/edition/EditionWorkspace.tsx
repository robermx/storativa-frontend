import { type FC } from 'react';

import { useOverlayPanelStore } from '@/store/overlayPanelStore';
import { useEdition } from '@/context/EditionContext';
import EditionChapterPanel from './EditionChapterPanel';
import EditionEditorSection from './EditionEditorSection';
import EditionInitializationState from './EditionInitializationState';

const EditionWorkspace: FC = () => {
  const {
    activeChapter,
    initializationError,
    isInitializing,
    retryInitialization,
  } = useEdition();
  const isChapterPanelOpen = useOverlayPanelStore(
    (state) => state.activePanel === 'edition-chapters',
  );

  if (isInitializing || !activeChapter) {
    return (
      <EditionInitializationState
        error={initializationError}
        onRetry={retryInitialization}
      />
    );
  }

  return (
    <>
      <EditionChapterPanel />
      <div
        aria-hidden={isChapterPanelOpen}
        inert={isChapterPanelOpen}
        className="mx-auto min-h-[calc(100vh-var(--nav-height))] max-w-7xl"
      >
        <EditionEditorSection />
      </div>
    </>
  );
};

export default EditionWorkspace;
