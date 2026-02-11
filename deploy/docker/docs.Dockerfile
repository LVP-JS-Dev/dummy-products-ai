FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
WORKDIR /workspace

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY apps/fumadocs/package.json apps/fumadocs/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/ui-kit/package.json packages/ui-kit/package.json

RUN pnpm fetch --frozen-lockfile --filter fumadocs...

FROM base AS builder

COPY --from=deps /pnpm /pnpm
COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm -C apps/fumadocs build

FROM node:22-alpine AS runner

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=builder /workspace/apps/fumadocs/public ./apps/fumadocs/public
COPY --from=builder /workspace/apps/fumadocs/.next/static ./apps/fumadocs/.next/static
COPY --from=builder /workspace/apps/fumadocs/.next/standalone ./

EXPOSE 3000
CMD ["node", "apps/fumadocs/server.js"]
