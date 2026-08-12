import { useLoaderData } from 'react-router';

import { createClientLoader } from '@/lib/createClientLoader';
import { getUserStorativa } from '@/services/storativa.service';
import { EditionProvider } from '@/context/EditionContext';
import EditionWorkspace from '@/components/private/edition/EditionWorkspace';
import EditionSkeleton from '@/components/skeleton/EditionSkeleton';
import EditionErrorBoundary from '@/components/private/edition/EditionErrorBoundary';

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

  return (
    <EditionProvider storativa={storativa}>
      <EditionWorkspace />
    </EditionProvider>
  );
};


export const ErrorBoundary = EditionErrorBoundary;

export default Edition;
