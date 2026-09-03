import { useEffect, useSyncExternalStore } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import i18n from './i18n/i18n';
import { NavigationVisibilityProvider } from './context/NavigationVisibilityContext';
import { ensureAuthSession } from './services/auth.service';
import { isPublicAccessPaused } from './utils/publicAccess';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import { useOverlayPanelStore } from './store/overlayPanelStore';
import { DEFAULT_LANGUAGE, useLanguageStore } from './store/languageStore';
import MainLayout from './layouts/MainLayout';
import './app.css';

export default function App() {
  const hasMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const language = useLanguageStore(
    (state) => state.lockedLanguage ?? state.language,
  );
  const activePanel = useOverlayPanelStore((state) => state.activePanel);
  const setAnonymous = useAuthStore((state) => state.setAnonymous);

  useEffect(() => {
    if (isPublicAccessPaused) {
      setAnonymous();
      return;
    }

    void ensureAuthSession();
  }, [setAnonymous]);

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [language]);

  return (
    <html
      lang={hasMounted ? language : DEFAULT_LANGUAGE}
      className={hasMounted && isDarkMode ? 'dark' : ''}
    >
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
