import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import MainLayout from "./layouts/MainLayout";
import "./app.css";

export default function App() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 text-gray-900 antialiased">
        <MainLayout>
          <Outlet />
        </MainLayout>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
