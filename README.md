# Storativa Frontend

## Dev Commands

```sh
pnpm dev          # Start dev server (react-router dev)
pnpm build        # Production build (react-router build)
pnpm typegen      # Generate React Router types to .react-router/types/
pnpm start        # Serve production build
```

## Project Structure

- **Framework**: React Router v8 (SSR mode, not CRA)
- **Entry point**: `app/root.tsx` and `app/routes.ts`
- **Path alias**: `@/*` maps to `app/*`
- **Source**: `app/` — all routes, components, stores, services go here
- **Build output**: `build/`

## Key Config

- `vite.config.ts`: Dev server port from `env.PORT` (via `loadEnv`), defaults to 5174. Allowed host `dev.storativa.com`.
- **Env types**: `vite-env.d.ts` at project root for Vite config types (separate tsconfig scope from `app/env.d.ts`).
- `eslint.config.js`: `prettier/prettier` is `"error"` — format before committing.
- `app/app.css`: Tailwind CSS v4 with custom theme vars (`--color-primary`, `--color-dark`, etc.) and dark mode via `.dark` class on `<html>`.

## React Router

- Routes defined in `app/routes.ts` using route config API, **not** file-system routing.
- Run `pnpm typegen` after adding routes to generate types in `.react-router/types/`.
- Catch-all 404 route: `route('*', 'routes/NotFound.tsx')`.
- Auth routes live under `AuthLayout` at path `/`.

## GSAP + React

- ThemeButton uses `@gsap/react` hook with `scope` config for automatic cleanup.
- `useGSAP` dependencies array handles state-reactive animations.

## TypeScript

- Strict mode (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`).
- CSS modules typed in `app/env.d.ts`.
- Env vars: `VITE_*` prefix (e.g. `VITE_API_URL`).

## Formatting

Run `prettier --write` before committing.

## Package Manager

pnpm required. Use `pnpm install`, not `npm install`.

## VPS Deployment

The `dev` branch is deployed to `dev.storativa.com` with Docker. The root Compose project is stored on the VPS at `/opt/storativa`:

```text
/opt/storativa/
├── backend/       # backend repository, branch dev
├── frontend/      # this repository, branch dev
├── docker-compose.yml
└── .env           # VPS secrets and deployment variables
```

Prepare and publish frontend changes locally:

```bash
git checkout dev
git pull origin dev
pnpm install
pnpm run build
git add .
git commit -m "describe the change"
git push origin dev
```

Update the VPS from SSH:

```bash
cd /opt/storativa
git -C frontend pull origin dev
docker compose build frontend
docker compose up -d frontend
docker compose logs --tail=100 frontend
```

The production image uses Node 24, builds the SSR output, and starts it with `react-router-serve`. `VITE_API_URL` is a build-time variable and should be set in the VPS `.env` as:

```env
VITE_API_URL=https://dev.storativa.com/api/v1
```

Nginx serves the frontend at `https://dev.storativa.com/` and forwards API requests under `/api/` to the backend. Do not commit the VPS `.env` or private SSH keys.
