# Storativa Frontend

## Dev Commands

```sh
pnpm dev          # Start dev server (react-router dev)
pnpm build        # Production build (react-router build)
pnpm typegen      # Generate React Router types to .react-router/types/
pnpm start        # Serve production build
```

## Project Structure

- **Framework**: React Router v7 (SSR mode, not CRA)
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

## No Tests

No test files (`*.test.*` or `*.spec.*`).

## Package Manager

pnpm required. Use `pnpm install`, not `npm install`.