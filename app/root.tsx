import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import MainLayout from './layouts/MainLayout';
import './app.css';
import { useThemeStore } from './store/themeStore';

export default function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <html lang="es" className={isDarkMode ? 'dark' : ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-light dark:bg-dark text-dark dark:text-light antialiased">
        <MainLayout>
          <Outlet />
        </MainLayout>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
