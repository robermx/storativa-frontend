# Storativa Frontend

Storativa's web application for creating, organizing, and editing stories. It is built with React Router in SSR mode and communicates with the Storativa API.

[Visit Storativa](https://storativa.com)

## Technology

- Node.js 24 or later and pnpm 11.24
- React 19, React Router 8, and Vite 8
- TypeScript, Tailwind CSS 4, and Zustand
- Axios, React Hook Form, i18next, GSAP, and Tiptap

## Prerequisites and installation

Install Node.js 24+ and pnpm 11.24. With the Storativa API available, run:

```bash
pnpm install
cp .env.template .env
pnpm dev
```

The development server starts at `http://localhost:5174` by default.

## Configuration

Set the variables in `.env`, based on `.env.template`:

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_DEPLOY_TARGET=local
VITE_PUBLIC_ACCESS_MODE=open
PORT=5174
```

`VITE_API_URL` must always include the `/api/v1` prefix; it is a Vite build-time variable. For cookie-based authentication to work, its origin must match the `FRONTEND_URL` configured in the backend.

### Public-launch hold

The production image defaults to `VITE_DEPLOY_TARGET=prod`. In that target,
the public launch screen is shown unless `VITE_PUBLIC_ACCESS_MODE=open` is
provided at build time. Local and dev builds remain open. Reopen production
only after setting the matching frontend and backend access modes to `open`.

## Commands

```bash
pnpm dev       # React Router development server
pnpm typegen   # generates route types in .react-router/types/
pnpm build     # creates the SSR build in build/
pnpm start     # serves build/server/index.js
```

There are no dedicated lint or test scripts. ESLint treats Prettier differences as errors; format changed files manually before committing.

## Routes and features

Routes are explicitly declared in `app/routes.ts`:

- Public: `/`, `/about`, `/login`, and `/register`.
- Protected: `/dashboard`, `/create`, and `/edition/:storativaId`.
- `*` renders the 404 page.

The application includes code-verified registration, sign-in, a Storativa dashboard, a creation flow, and a rich chapter editor. It provides Spanish and English interfaces, light and dark themes, and shared UI state with Zustand.

## Authentication and API

The access token remains in memory and is not persisted in the browser. Axios sends it as a Bearer token on protected requests and includes credentials for the HTTP-only refresh cookie. On a `401`, one shared refresh request is made; if it fails, the session returns to the anonymous state.

For this reason, do not independently change `VITE_API_URL`, the frontend origin, or the backend CORS and cookie configuration.

## Structure

```text
app/
├── routes/       # pages and route data loading
├── layouts/      # public and authenticated containers
├── components/   # shared and feature-specific components
├── services/     # API operations
├── store/        # Zustand global state
├── context/      # cross-cutting UI state
├── hooks/        # reusable behaviors
├── i18n/         # configuration and es/en resources
├── interfaces/   # domain contracts
├── constants/    # shared values
└── utils/        # pure utilities
```

The `@/*` alias maps to `app/*`. After modifying `app/routes.ts`, run `pnpm typegen`. Keep every user-visible string in both languages and use the tokens defined in `app/app.css` to preserve the visual theme.

## Docker deployment

The production image uses Node.js 24, builds the SSR output, and serves it with `react-router-serve`. In the VPS Compose project, supply `VITE_API_URL` while building the image; do not add it as a runtime-only variable.

```env
VITE_API_URL=https://dev.storativa.com/api/v1
```

Keep secrets and `.env` files outside the repository. Nginx must serve the frontend and forward requests under `/api/` to the backend.
