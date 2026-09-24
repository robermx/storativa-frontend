import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { LoaderCircle, Sparkles, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import CustomButton from '@/components/shared/CustomButton';
import type {
  InitialPanoramaResponse,
  PanoramaSection,
} from '@/interfaces/ai.interface';
import {
  createInitialPanorama,
  getInitialPanorama,
} from '@/services/ai.service';
import { getErrorMessage } from '@/utils/getErrorMessage';

interface EditionAiAssistantProps {
  storativaId: string;
}

const PanoramaCard: FC<{ title: string; section: PanoramaSection }> = ({
  title,
  section,
}) => (
  <section className="rounded-xl border border-dark/10 bg-light p-4 dark:border-light/10 dark:bg-dark">
    <h3 className="font-semibold text-dark dark:text-light">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
      {section.summary}
    </p>
    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
      {section.points.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  </section>
);

const EditionAiAssistant: FC<EditionAiAssistantProps> = ({ storativaId }) => {
  const { t } = useTranslation('editor');
  const location = useLocation();
  const navigate = useNavigate();
  const requestOnLoad =
    (location.state as { initialPanoramaRequested?: boolean } | null)
      ?.initialPanoramaRequested === true;
  const initialRequestHandled = useRef(false);
  const [isOpen, setIsOpen] = useState(requestOnLoad);
  const [panorama, setPanorama] = useState<InitialPanoramaResponse>({
    status: requestOnLoad ? 'generating' : 'not_requested',
  });
  const [error, setError] = useState<string | null>(null);

  const loadPanorama = useCallback(async () => {
    try {
      const response = await getInitialPanorama(storativaId);
      setPanorama(response);
      setError(null);
    } catch (requestError: unknown) {
      setPanorama({ status: 'failed' });
      setError(getErrorMessage(requestError, t('aiAssistant.failed')));
    }
  }, [storativaId, t]);

  const generatePanorama = useCallback(async () => {
    setIsOpen(true);
    setPanorama({ status: 'generating' });
    setError(null);

    try {
      const response = await createInitialPanorama(storativaId);
      setPanorama(response);
    } catch (requestError: unknown) {
      setPanorama({ status: 'failed' });
      setError(getErrorMessage(requestError, t('aiAssistant.failed')));
    }
  }, [storativaId, t]);

  useEffect(() => {
    if (requestOnLoad && !initialRequestHandled.current) {
      initialRequestHandled.current = true;
      void generatePanorama();
      void navigate(location.pathname, { replace: true, state: null });
      return;
    }

    if (initialRequestHandled.current) return;

    void loadPanorama();
  }, [generatePanorama, loadPanorama, location.pathname, navigate, requestOnLoad]);

  useEffect(() => {
    if (panorama.status !== 'generating') return;

    const timer = window.setTimeout(() => {
      void loadPanorama();
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [loadPanorama, panorama.status]);

  const content = panorama.content;

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-3 right-3 z-30">
          <CustomButton
            onClick={() => setIsOpen(true)}
            icon={<Sparkles />}
            width="auto"
            variant="outline"
          >
            {t('aiAssistant.open')}
          </CustomButton>
        </div>
      )}

      {isOpen && (
        <aside
          aria-label={t('aiAssistant.panelAriaLabel')}
          className="fixed inset-x-3 bottom-3 z-30 max-h-[78vh] overflow-y-auto rounded-2xl border border-dark/10 bg-lightness p-4 shadow-xl dark:border-light/10 dark:bg-darkness sm:left-auto sm:right-3 sm:w-105"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-dark dark:text-light">
                <Sparkles size={20} />
                {t('aiAssistant.title')}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {t('aiAssistant.description')}
              </p>
            </div>
            <CustomButton
              onClick={() => setIsOpen(false)}
              aria-label={t('aiAssistant.close')}
              icon={<X />}
              width="auto"
              variant="text"
              className="text-dark dark:text-light"
            />
          </div>

          <div className="mt-5 space-y-3">
            {panorama.status === 'generating' && (
              <div className="flex items-center gap-3 rounded-xl bg-primary/10 p-4 text-sm text-dark dark:text-light">
                <LoaderCircle className="animate-spin" size={18} />
                {t('aiAssistant.generating')}
              </div>
            )}

            {panorama.status === 'not_requested' && (
              <div className="space-y-4 rounded-xl bg-primary/10 p-4">
                <p className="text-sm leading-6 text-dark dark:text-light">
                  {t('aiAssistant.notRequested')}
                </p>
                <CustomButton onClick={() => void generatePanorama()}>
                  {t('aiAssistant.generate')}
                </CustomButton>
              </div>
            )}

            {panorama.status === 'failed' && (
              <div className="space-y-4 rounded-xl bg-red-500/10 p-4">
                <p className="text-sm leading-6 text-dark dark:text-light">
                  {error ?? t('aiAssistant.failed')}
                </p>
                <CustomButton onClick={() => void generatePanorama()}>
                  {t('aiAssistant.retry')}
                </CustomButton>
              </div>
            )}

            {panorama.status === 'ready' && content && (
              <>
                <PanoramaCard
                  title={t('aiAssistant.sections.temporalContext')}
                  section={content.temporalContext}
                />
                <PanoramaCard
                  title={t('aiAssistant.sections.characterCompass')}
                  section={content.characterCompass}
                />
                <PanoramaCard
                  title={t('aiAssistant.sections.narrativeCore')}
                  section={content.narrativeCore}
                />
                <section className="rounded-xl border border-dark/10 bg-light p-4 dark:border-light/10 dark:bg-dark">
                  <h3 className="font-semibold text-dark dark:text-light">
                    {t('aiAssistant.sections.writingQuestions')}
                  </h3>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-300">
                    {content.writingQuestions.map((question) => (
                      <li key={question}>{question}</li>
                    ))}
                  </ol>
                </section>
              </>
            )}
          </div>
        </aside>
      )}
    </>
  );
};

export default EditionAiAssistant;
