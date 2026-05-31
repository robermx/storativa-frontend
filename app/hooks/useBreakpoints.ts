import { useSyncExternalStore } from 'react';

const getMediaQueryList = (pixels: number) => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return null;
  }

  return window.matchMedia(`(max-width: ${pixels}px)`);
};

const useBreakpoints = (pixels: number) => {
  const matchMedia = useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = getMediaQueryList(pixels);

      if (!mediaQuery) {
        return () => {};
      }

      const handleChange = () => onStoreChange();

      mediaQuery.addEventListener('change', handleChange);

      return () => mediaQuery.removeEventListener('change', handleChange);
    },
    () => getMediaQueryList(pixels)?.matches ?? false,
    () => false,
  );

  return { matchMedia };
};

export default useBreakpoints;
