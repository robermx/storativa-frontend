import { NavLink } from 'react-router';
import MainIso from '../assets/logo/MainIso';
import { FC } from 'react';

const NotFound: FC = () => {
  return (
    <div className="h-dvh flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8 flex justify-center">
          <MainIso className="w-24 h-24" />
        </div>

        <h1 className="text-6xl font-bold text-dark dark:text-light mb-4">
          404
        </h1>

        <p className="text-xl text-dark/70 dark:text-light/70 mb-2">
          Página no encontrada
        </p>

        <p className="text-dark/50 dark:text-light/50 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <NavLink
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Volver al inicio
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
