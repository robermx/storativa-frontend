# AGENTS.md

## Stack and runtime

- Node.js `>=24`, pnpm `11.24.0`, React `19.2`, React Router `8.3` in SSR mode, Vite `8.2`, TypeScript `~7.0`, and Tailwind CSS `4.3`.
- The application uses Zustand for client state, Axios for API calls, i18next/react-i18next for Spanish and English, React Hook Form for forms, GSAP for motion, and Tiptap for the edition editor.
- This is a React Router application, not a CRA or file-system-routed Vite app.

## Commands

```sh
pnpm install
cp .env.template .env

pnpm dev       # React Router development server
pnpm typegen   # Generate .react-router/types after route changes
pnpm build     # Build the SSR client and server output in build/
pnpm start     # Serve build/server/index.js
```

There are no dedicated lint, format, or test scripts. ESLint is configured to report Prettier violations as errors; run Prettier directly against files you modify when needed.

## Configuration

- `VITE_API_URL` is the API base URL and must include `/api/v1` (local default: `http://localhost:3000/api/v1`). It is a build-time Vite variable.
- `PORT` controls Vite's dev-server port and defaults to `5174` in `vite.config.ts`.
- `vite.config.ts` uses the React Router and Tailwind Vite plugins and enables `tsconfigPaths` resolution.
- `app/app.css` defines the Tailwind v4 theme tokens and uses the `.dark` class on `<html>` for dark mode.
- `eslint.config.js` enables React Hooks/Refresh and `prettier/prettier: error` for `.ts` and `.tsx` files.

## Project structure

- `app/root.tsx` — document shell, theme/language initialization, auth-session bootstrap, and app-wide layout providers.
- `app/routes.ts` — the explicit route-config API; run `pnpm typegen` after editing it.
- `app/routes/` — page modules. Public: home, about, login, and register. Private application pages: dashboard, create, and `edition/:storativaId`. `NotFound.tsx` handles the catch-all route.
- `app/layouts/` — `PublicLayout` blocks authenticated users from public/auth pages; `AuthLayout` wraps the authenticated route group.
- `app/components/` — shared primitives, navigation/common components, public sections, and feature components for create, dashboard, and edition.
- `app/services/` — API operations; `app/lib/api.ts` owns the configured Axios instance and token refresh interceptor.
- `app/store/` — Zustand stores for authentication, theme, language, navigation height/menu, and overlay panels.
- `app/context/` and `app/hooks/` — cross-cutting UI state and reusable client behaviors.
- `app/i18n/` — i18next initialization, resources, and `en`/`es` namespace JSON files. Keep user-visible copy in both locales.
- `app/interfaces/`, `app/constants/`, and `app/utils/` — domain contracts, shared values, and pure helpers.

## Routing, data loading, and auth

- Routes are declared in `app/routes.ts` with `index`, `layout`, and `route`; do not rely on filesystem routing.
- Route modules use React Router client loaders. `createClientLoader` coordinates client-side service loading and route fallbacks.
- The auth store keeps the access token in memory and persists only a bootstrap intent in local storage. Do not persist JWTs yourself.
- Axios sends the Bearer access token on non-auth requests and uses `withCredentials: true`. A single shared refresh request restores a session after a 401; failed refreshes reset the store to anonymous.
- The backend's refresh token is an HTTP-only cookie, so cookie/CORS behavior must stay compatible with `VITE_API_URL` and the backend `FRONTEND_URL`.

## TypeScript and styling conventions

- `@/*` maps to `app/*`; prefer it for app imports.
- TypeScript is strict and enables `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`.
- CSS module declarations live in `app/env.d.ts`; Vite config types are in root `vite-env.d.ts`.
- Keep Tailwind utility styling aligned with the existing theme tokens and dark-mode variants instead of adding unrelated color scales.
- Use the existing shared UI components and feature patterns before introducing parallel primitives.

## Deployment

- The Docker image uses Node 24, builds the SSR output, and starts it through `react-router-serve`.
- In the VPS Compose project, `VITE_API_URL` must be supplied while building the frontend image; do not commit deployment `.env` files or private keys.
