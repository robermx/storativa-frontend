export const getSubtitleByPath = (path: string): string => {
  switch (path) {
    case '/':
      return 'Home';
    case '/about':
      return 'Acerca'
    case '/dashboard':
      return 'Dashboard';
    case '/create':
      return 'Crear Storativa';
    default:
      return 'Sin Ruta';
  }
};
