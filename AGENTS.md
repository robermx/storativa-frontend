# AGENTS.md

## Dev Commands

```sh
pnpm dev          # Start dev server (react-router dev)
pnpm build        # Production build (react-router build)
pnpm typegen      # Generate React Router types to .react-router/types/
pnpm start        # Serve production build
```

## Project Structure

- **Framework**: React Router v7 (SSR/SSG mode, not CRA)
- **Entry point**: `app/root.tsx` and `app/routes.ts`
- **Path alias**: `@/*` maps to `app/*`
- **Source**: `app/` — all routes, components, stores, services go here
- **Build output**: `build/`

## Key Config

- `vite.config.ts`: Dev server on port 5174, allowed host `dev.storativa.com`. Uses `loadEnv` for PORT env var.
- `eslint.config.js`: `prettier/prettier` rule is set to `"error"` — lint will fail on format issues.
- `app/app.css`: Tailwind CSS v4 with custom theme vars (`--color-primary`, `--color-dark`, etc.) and dark mode via `.dark` class on `<html>`.

## React Router Notes

- Routes are defined in `app/routes.ts` using the route config API, not file-system routing.
- Run `pnpm typegen` after adding new route segments to generate types in `.react-router/types/`.
- Auth-protected routes live under the `AuthLayout` route at path `/`.

## TypeScript

- Strict mode enabled (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`).
- CSS modules are typed via `app/env.d.ts` (`declare module '*.css'`).
- Env vars exposed via `VITE_*` prefix (e.g. `VITE_API_URL`).

## Formatting & Lint Order

Run `prettier --write` before committing — ESLint will error on format mismatches.

## No Tests

There are currently no test files (`*.test.*` or `*.spec.*`).

## Package Manager

pnpm is required (`packageManager` field in package.json). Use `pnpm install`, not `npm install`.