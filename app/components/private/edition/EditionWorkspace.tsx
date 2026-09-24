import { type FC } from 'react';

import { useOverlayPanelStore } from '@/store/overlayPanelStore';
import { useEdition } from '@/context/EditionContext';
import EditionChapterPanel from './EditionChapterPanel';
import EditionEditorSection from './EditionEditorSection';
import EditionInitializationState from './EditionInitializationState';
import EditionAiAssistant from './EditionAiAssistant';
import { isAiFeatureEnabled } from '@/utils/aiFeature';

const EditionWorkspace: FC = () => {
  const {
    activeChapter,
    initializationError,
    isInitializing,
    retryInitialization,
    storativaId,
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
        className="mx-auto min-h-[calc(100vh-var(--nav-height)*1px)] max-w-7xl"
      >
        <EditionEditorSection />
      </div>
      {isAiFeatureEnabled && <EditionAiAssistant storativaId={storativaId} />}
    </>
  );
};

export default EditionWorkspace;
