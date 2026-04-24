import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import MainLayout from "./layouts/MainLayout";
import "./app.css";
import { useState } from "react";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <html lang="es" className={isDarkMode ? "dark" : ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 antialiased">
        <MainLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}>
          <Outlet />
        </MainLayout>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
