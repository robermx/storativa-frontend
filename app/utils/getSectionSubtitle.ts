export const getSectionSubtitle = (path: string): string => {
  switch (path) {
    case '/dashboard':
      return 'Dashboard';
    case '/create':
      return 'Crear Storativa';
    default:
      return 'Sin Ruta';
  }
};
