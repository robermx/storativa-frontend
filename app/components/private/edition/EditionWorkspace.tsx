import { type FC } from 'react';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useOverlayPanelStore } from '@/store/overlayPanelStore';
import { useEdition } from '@/context/EditionContext';
import EditionChapterPanel from './EditionChapterPanel';
import EditionEditorSection from './EditionEditorSection';
import EditionInitializationState from './EditionInitializationState';
import CustomButton from '@/components/shared/CustomButton';

const EditionWorkspace: FC = () => {
  const {
    activeChapter,
    initializationError,
    isInitializing,
    retryInitialization,
  } = useEdition();
  const { t } = useTranslation('editor');
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
      <div className="fixed bottom-3 right-3 z-30 flex items-center gap-3">
        <CustomButton
          title={t('aiAssistant.comingSoon')}
          icon={<Sparkles />}
          width="auto"
          variant="outline"
        >
          {t('aiAssistant.open')}
        </CustomButton>
      </div>
    </>
  );
};

export default EditionWorkspace;
