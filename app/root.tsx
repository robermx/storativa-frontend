// 1. Importamos el archivo CSS y el tipo LinksFunction
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

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
      <body className="bg-gray-50 text-gray-900 antialiased">
        <nav className="p-4 bg-white shadow-md flex gap-4">
          <a href="/" className="hover:text-blue-600 font-medium">
            Home
          </a>
          <a href="/about" className="hover:text-blue-600 font-medium">
            About
          </a>
        </nav>

        <main className="container mx-auto p-6">
          <Outlet />
        </main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
