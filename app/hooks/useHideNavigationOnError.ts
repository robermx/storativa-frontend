import { useLayoutEffect } from 'react';

import { useNavigationVisibility } from '@/context/NavigationVisibilityContext';

export const useHideNavigationOnError = () => {
  const { suppressNavigation } = useNavigationVisibility();

  useLayoutEffect(() => suppressNavigation(), [suppressNavigation]);
};
