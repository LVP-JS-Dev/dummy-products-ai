FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
WORKDIR /workspace

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/env/package.json packages/env/package.json
COPY packages/ui-kit/package.json packages/ui-kit/package.json

RUN pnpm fetch --frozen-lockfile --filter web...

FROM base AS builder

COPY --from=deps /pnpm /pnpm
COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm -C packages/ui-kit gen
RUN pnpm -C apps/web build

FROM nginx:1.27-alpine AS runner

COPY deploy/docker/web.nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /workspace/apps/web/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
