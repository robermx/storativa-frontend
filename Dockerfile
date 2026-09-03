FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN corepack enable
RUN pnpm install --frozen-lockfile

ARG VITE_API_URL
ARG VITE_DEPLOY_TARGET=prod
ARG VITE_PUBLIC_ACCESS_MODE
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_DEPLOY_TARGET=$VITE_DEPLOY_TARGET
ENV VITE_PUBLIC_ACCESS_MODE=$VITE_PUBLIC_ACCESS_MODE

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
