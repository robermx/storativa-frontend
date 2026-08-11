import { type FC } from 'react';

import { useSettingsStore } from '@/store/settingsStore';
import { useEdition } from '@/context/EditionContext';
import ChapterSidebar from './ChapterSidebar';
import EditionEditorPanel from './EditionEditorPanel';
import EditionInitializationState from './EditionInitializationState';

const EditionWorkspace: FC = () => {
  const {
    activeChapter,
    initializationError,
    isInitializing,
    retryInitialization,
  } = useEdition();
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);

  if (isInitializing || !activeChapter) {
    return (
      <EditionInitializationState
        error={initializationError}
        onRetry={retryInitialization}
      />
    );
  }

  return (
    <div
      aria-hidden={areSettingsOpen}
      inert={areSettingsOpen}
      className="mx-auto min-h-[calc(100vh-var(--nav-height))] max-w-7xl py-6"
    >
      <div className="grid gap-5 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <ChapterSidebar />
        <EditionEditorPanel />
      </div>
    </div>
  );
};

export default EditionWorkspace;
