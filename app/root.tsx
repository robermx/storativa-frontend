import { Links, type LinksFunction, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

// eslint-disable-next-line react-refresh/only-export-components
export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
  // Aquí puedes agregar tus fuentes de Google o CSS externo
];

export default function App() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav>
          <a href="/">Inicio ss</a> | <a href="/about">Acerca de</a>
        </nav>
        {/* Aquí se renderizan las rutas hijas */}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/* @vite-ignore */