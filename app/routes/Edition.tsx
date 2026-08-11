import { AlertCircle } from 'lucide-react';
import {
  isRouteErrorResponse,
  NavLink,
  useLoaderData,
  useRouteError,
} from 'react-router';

import { createClientLoader } from '@/lib/createClientLoader';
import { getUserStorativa } from '@/services/storativa.service';
import { EditionProvider } from '@/context/EditionContext';
import EditionWorkspace from '@/components/private/edition/EditionWorkspace';
import EditionSkeleton from '@/components/skeleton/EditionSkeleton';

// eslint-disable-next-line react-refresh/only-export-components
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

// eslint-disable-next-line react-refresh/only-export-components
export const ErrorBoundary = () => {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  const message = isNotFound
    ? 'La Storativa no existe o no tienes acceso a ella.'
    : 'No pudimos cargar el espacio de edición.';

  return (
    <div className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-xl border border-dark/10 bg-primary/10 p-8 text-center dark:border-light/10 dark:bg-primary/5">
        <AlertCircle className="mx-auto text-primary" size={42} />
        <h1 className="mt-4 text-2xl font-semibold text-dark dark:text-light">
          {isNotFound ? 'Storativa no encontrada' : 'Algo salió mal'}
        </h1>
        <p className="mt-2 text-dark/65 dark:text-light/65">{message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {!isNotFound && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-md bg-primary px-4 py-2 font-medium text-light"
            >
              Reintentar
            </button>
          )}
          <NavLink
            to="/dashboard"
            className="rounded-md border border-dark/15 px-4 py-2 font-medium text-dark dark:border-light/15 dark:text-light"
          >
            Volver al dashboard
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Edition;
