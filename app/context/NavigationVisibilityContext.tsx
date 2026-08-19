import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface NavigationVisibilityContextValue {
  isNavigationSuppressed: boolean;
  suppressNavigation: () => () => void;
}

const NavigationVisibilityContext =
  createContext<NavigationVisibilityContextValue | null>(null);

export const NavigationVisibilityProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [suppressionCount, setSuppressionCount] = useState(0);

  const suppressNavigation = useCallback(() => {
    let hasBeenReleased = false;
    setSuppressionCount((count) => count + 1);

    return () => {
      if (hasBeenReleased) return;

      hasBeenReleased = true;
      setSuppressionCount((count) => Math.max(0, count - 1));
    };
  }, []);

  const value = useMemo(
    () => ({
      isNavigationSuppressed: suppressionCount > 0,
      suppressNavigation,
    }),
    [suppressionCount, suppressNavigation],
  );

  return (
    <NavigationVisibilityContext.Provider value={value}>
      {children}
    </NavigationVisibilityContext.Provider>
  );
};

export const useNavigationVisibility = () => {
  const context = useContext(NavigationVisibilityContext);

  if (!context) {
    throw new Error(
      'useNavigationVisibility debe usarse dentro de NavigationVisibilityProvider.',
    );
  }

  return context;
};
