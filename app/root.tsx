import { useEffect, useSyncExternalStore } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { useThemeStore } from './store/themeStore';
import { useOverlayPanelStore } from './store/overlayPanelStore';
import { ensureAuthSession } from './services/auth.service';
import MainLayout from './layouts/MainLayout';
import { NavigationVisibilityProvider } from './context/NavigationVisibilityContext';
import './app.css';

export default function App() {
  const hasMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const activePanel = useOverlayPanelStore((state) => state.activePanel);

  useEffect(() => {
    void ensureAuthSession();
  }, []);

  return (
    <html lang="es" className={hasMounted && isDarkMode ? 'dark' : ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <Meta />
        <Links />
      </head>
      <body
        className={`bg-light dark:bg-dark text-dark dark:text-light antialiased ${hasMounted && activePanel ? 'overflow-hidden' : 'overflow-auto'}`}
      >
        <NavigationVisibilityProvider>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </NavigationVisibilityProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
