# Docker + Dokploy Deployment

This setup is designed for:

- local image build
- push to a container registry
- Dokploy deploy from `image:` references (no server-side build)
- CI builds on CircleCI (GHCR) with local fallback

## Files

- `deploy/docker/web.Dockerfile` - multistage build for `apps/web` (Vite -> nginx)
- `deploy/docker/docs.Dockerfile` - multistage build for `apps/fumadocs` (Next standalone)
- `deploy/docker-compose.stage.yml` - stage stack (image-only)
- `deploy/docker-compose.prod.yml` - prod stack (image-only)
- `deploy/.env.stage.example` - stage image variables
- `deploy/.env.prod.example` - prod image variables

## CI/CD (CircleCI + GHCR)

Build and push images on:
- `push` to `main`
- manual pipeline run (CircleCI parameters)

Publish npm package on:
- git tag `vX.Y.Z` (with strict tag/version check)

### Required secrets (CircleCI project settings)

- `GHCR_USERNAME` / `GHCR_TOKEN` (PAT with `read:packages`, `write:packages`)
  - `GHCR_USERNAME` should be the GHCR namespace (user or org)
- `NPM_TOKEN` (npm publish token)

### Image tags

- `stage-<short_sha>` for readability
- Dokploy uses digest (`@sha256:...`) for reproducible deploys

### Manual trigger

Run a manual pipeline with `manual=true` to rebuild/push images without new commits.
In CircleCI UI: `Trigger Pipeline` -> set parameter `manual` to `true`.

## Build and push images

Example for GHCR (`linux/amd64` for typical VPS):

```bash
docker login ghcr.io

GIT_SHA=$(git rev-parse --short HEAD)

docker buildx build \
  --platform linux/amd64 \
  -f deploy/docker/web.Dockerfile \
  -t ghcr.io/your-org/dummy-products-web:stage-$GIT_SHA \
  --push .

docker buildx build \
  --platform linux/amd64 \
  -f deploy/docker/docs.Dockerfile \
  -t ghcr.io/your-org/dummy-products-docs:stage-$GIT_SHA \
  --push .
```

## Publish npm package (CI)

Triggered by tag `vX.Y.Z`. CI validates:
- `vX.Y.Z` equals `packages/burlaki/package.json` version

If mismatch, publish fails.

## Promote stage -> prod

Recommended: deploy by immutable digest in Dokploy variables.

```bash
docker buildx imagetools inspect ghcr.io/your-org/dummy-products-web:stage-$GIT_SHA
docker buildx imagetools inspect ghcr.io/your-org/dummy-products-docs:stage-$GIT_SHA
```

Then set Dokploy env vars:

- `WEB_IMAGE=ghcr.io/your-org/dummy-products-web@sha256:...`
- `DOCS_IMAGE=ghcr.io/your-org/dummy-products-docs@sha256:...`

Use the same digests in both stage and prod to guarantee identical artifacts.

## Local fallback (when CI is unavailable)

### Build and push images

```bash
docker login ghcr.io

GIT_SHA=$(git rev-parse --short HEAD)

docker buildx build \
  --platform linux/amd64 \
  -f deploy/docker/web.Dockerfile \
  -t ghcr.io/your-org/dummy-products-web:stage-$GIT_SHA \
  --push .

docker buildx build \
  --platform linux/amd64 \
  -f deploy/docker/docs.Dockerfile \
  -t ghcr.io/your-org/dummy-products-docs:stage-$GIT_SHA \
  --push .
```

### Publish npm package

```bash
cd packages/burlaki
pnpm install --frozen-lockfile
pnpm -C . pkg get version
pnpm publish --access public
```

Ensure the git tag matches `package.json` (e.g. `v1.2.3`).

## Dokploy wiring

1. Create two Dokploy projects: `dummy-products-stage`, `dummy-products-prod`.
2. Add registry credentials (GHCR/Docker Hub/etc.) in Dokploy.
3. For stage use `deploy/docker-compose.stage.yml`, for prod use `deploy/docker-compose.prod.yml`.
4. Define `WEB_IMAGE` and `DOCS_IMAGE` in each project env.
5. Attach domains to:
   - service `web` on port `80`
   - service `docs` on port `3000`

## Optional: Lefthook migration

Husky is currently used for local hooks. If hook runtime becomes a bottleneck, consider Lefthook:
- Faster hook execution via parallelism
- Centralized hook config
- Better fit for monorepos
