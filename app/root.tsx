import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import MainLayout from './layouts/MainLayout';
import './app.css';
import { useThemeStore } from './store/themeStore';
import { useSettingsStore } from './store/settingsStore';

export default function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const areSettingsOpen = useSettingsStore((state) => state.areSettingsOpen);

  return (
    <html lang="es" className={isDarkMode ? 'dark' : ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <Meta />
        <Links />
      </head>
      <body
        className="bg-light dark:bg-dark text-dark dark:text-light antialiased"
        style={
          areSettingsOpen ? { overflowY: 'hidden' } : { overflowY: 'auto' }
        }
      >
        <MainLayout>
          <Outlet />
        </MainLayout>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
