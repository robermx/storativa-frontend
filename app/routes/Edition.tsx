import { useEffect } from 'react';
import { useLoaderData } from 'react-router';

import { createClientLoader } from '@/lib/createClientLoader';
import { getUserStorativa } from '@/services/storativa.service';
import { EditionProvider } from '@/context/EditionContext';
import EditionWorkspace from '@/components/private/edition/EditionWorkspace';
import EditionSkeleton from '@/components/skeleton/EditionSkeleton';
import EditionErrorBoundary from '@/components/private/edition/EditionErrorBoundary';
import {
  DEFAULT_LANGUAGE,
  isLanguageCode,
  useLanguageStore,
} from '@/store/languageStore';

export const clientLoader = createClientLoader({
  services: [
    {
      key: 'storativa',
      fn: ({ params }) => {
        const storativaId = params.storativaId;
        if (!storativaId) {
          throw new Response('Falta el identificador de la Storativa.', {
            status: 400,
          });
        }

        return getUserStorativa(storativaId);
      },
    },
  ],
});

export const HydrateFallback = () => <EditionSkeleton />;

const Edition = () => {
  const { storativa } = useLoaderData<typeof clientLoader>();
  const lockLanguage = useLanguageStore((state) => state.lockLanguage);
  const unlockLanguage = useLanguageStore((state) => state.unlockLanguage);
  const language = isLanguageCode(storativa.language)
    ? storativa.language
    : DEFAULT_LANGUAGE;

  useEffect(() => {
    lockLanguage(language);
    return unlockLanguage;
  }, [language, lockLanguage, unlockLanguage]);

  return (
    <EditionProvider storativa={storativa}>
      <EditionWorkspace />
    </EditionProvider>
  );
};

export const ErrorBoundary = EditionErrorBoundary;

export default Edition;
