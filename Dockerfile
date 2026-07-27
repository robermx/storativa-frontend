FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN corepack enable
RUN pnpm install --frozen-lockfile

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY . .

RUN pnpm run build


FROM node:24-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN corepack enable
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/build ./build

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=5174

EXPOSE 5174

CMD ["pnpm", "run", "start"]