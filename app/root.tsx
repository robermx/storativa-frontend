import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import MainLayout from './layouts/MainLayout';
import './app.css';
import { useState } from 'react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <html lang="es" className={isDarkMode ? 'dark' : ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-light dark:bg-dark text-dark dark:text-light antialiased">
        <MainLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}>
          <Outlet />
        </MainLayout>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
