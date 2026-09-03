import { matchPath } from "react-router";

export const getSubtitleByPath = (path: string): string => {
  if (
    matchPath(
      { path: '/edition/:storativaId', end: true },
      path,
    )
  ) {
    return 'Desarrollo de Storativa';
  }
  switch (path) {
    case '/':
      return 'Home';
    case '/about':
      return 'Acerca'
    case '/legal':
      return 'Aspectos legales';
    case '/dashboard':
      return 'Dashboard';
    case '/create':
      return 'Crear Storativa';
    default:
      return 'Sin Ruta';
  }
};
