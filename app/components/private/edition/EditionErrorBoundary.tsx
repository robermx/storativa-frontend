import { isRouteErrorResponse, useRouteError } from 'react-router';
import { AlertCircle } from 'lucide-react';

import CustomButton from '@/components/shared/CustomButton';
import CustomLink from '@/components/shared/CustomLink';
import { useHideNavigationOnError } from '@/hooks/useHideNavigationOnError';

const EditionErrorBoundary = () => {
  useHideNavigationOnError();
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  const message = isNotFound
    ? 'La Storativa no existe o no tienes acceso a ella.'
    : 'No pudimos cargar el espacio de edición.';

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-xl border border-dark/10 bg-primary/10 p-8 text-center dark:border-light/10 dark:bg-primary/5">
        <AlertCircle className="mx-auto text-primary" size={42} />
        <h1 className="mt-4 text-2xl font-semibold text-dark dark:text-light">
          {isNotFound ? 'Storativa no encontrada' : 'Algo salió mal'}
        </h1>
        <p className="mt-2 text-dark/65 dark:text-light/65">{message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {!isNotFound && (
            <CustomButton
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-md bg-primary px-4 py-2 font-medium text-light"
            >
              Reintentar
            </CustomButton>
          )}
          <CustomLink
            to="/dashboard"
            className="rounded-md border border-dark/15 px-4 py-2 font-medium text-dark dark:border-light/15 dark:text-light"
          >
            Volver al dashboard
          </CustomLink>
        </div>
      </div>
    </div>
  );
};

export default EditionErrorBoundary;
