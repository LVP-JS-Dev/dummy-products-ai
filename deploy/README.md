# Docker + Dokploy Deployment

This setup is designed for:

- local image build
- push to a container registry
- Dokploy deploy from `image:` references (no server-side build)

## Files

- `deploy/docker/web.Dockerfile` - multistage build for `apps/web` (Vite -> nginx)
- `deploy/docker/docs.Dockerfile` - multistage build for `apps/fumadocs` (Next standalone)
- `deploy/docker-compose.stage.yml` - stage stack (image-only)
- `deploy/docker-compose.prod.yml` - prod stack (image-only)
- `deploy/.env.stage.example` - stage image variables
- `deploy/.env.prod.example` - prod image variables

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

## Dokploy wiring

1. Create two Dokploy projects: `dummy-products-stage`, `dummy-products-prod`.
2. Add registry credentials (GHCR/Docker Hub/etc.) in Dokploy.
3. For stage use `deploy/docker-compose.stage.yml`, for prod use `deploy/docker-compose.prod.yml`.
4. Define `WEB_IMAGE` and `DOCS_IMAGE` in each project env.
5. Attach domains to:
   - service `web` on port `80`
   - service `docs` on port `3000`
