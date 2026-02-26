# Docker + Dokploy Deployment

This setup is designed for:

- CI builds in GitHub Actions
- Push images to Docker Hub
- Deploy to VPS via Dokploy with docker-compose

## Files

- `deploy/docker/web.Dockerfile` - multistage build for `apps/web` (Vite -> nginx)
- `deploy/docker/docs.Dockerfile` - multistage build for `apps/fumadocs` (Next standalone)
- `deploy/docker-compose.stage.yml` - stage stack (image-only)
- `deploy/docker-compose.prod.yml` - prod stack (image-only)
- `deploy/.env.stage.example` - stage image variables
- `deploy/.env.prod.example` - prod image variables

## CI/CD (GitHub Actions + Docker Hub)

### Triggers

- **Push to `develop`** → builds and pushes `:stage-*` and `:stage` tags
- **Push to `master`** → builds and pushes `:prod-*` and `:prod` tags
- **Tag `vX.Y.Z`** → builds and pushes `:vX.Y.Z` and `:latest` tags, publishes npm package

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `DOCKER_USERNAME` | Docker Hub username |
| `DOCKER_TOKEN` | Docker Hub access token (with read/write permissions) |
| `NPM_TOKEN` | npm publish token (for burlaki package) |

### Image Tags

Images are published to Docker Hub as:
- `your-username/dummy-products-web:<tag>`
- `your-username/dummy-products-docs:<tag>`

Tag strategy:

| Branch/Tag | Image Tag | Latest Alias |
|------------|-----------|--------------|
| `develop` | `stage-<sha>` | `stage` |
| `master` | `prod-<sha>` | `prod` |
| `v1.2.3` | `v1.2.3` | `latest` |

### Manual Trigger

Run workflow manually with `workflow_dispatch` to rebuild images without new commits.

## Build and push images (local fallback)

When CI is unavailable, build and push manually:

```bash
# Login to Docker Hub
docker login

GIT_SHA=$(git rev-parse --short HEAD)

# Build and push web
docker buildx build \
  --platform linux/amd64 \
  -f deploy/docker/web.Dockerfile \
  -t your-username/dummy-products-web:stage-$GIT_SHA \
  -t your-username/dummy-products-web:stage \
  --push .

# Build and push docs
docker buildx build \
  --platform linux/amd64 \
  -f deploy/docker/docs.Dockerfile \
  -t your-username/dummy-products-docs:stage-$GIT_SHA \
  -t your-username/dummy-products-docs:stage \
  --push .
```

## Dokploy Setup

### 1. Add Docker Hub Registry

In Dokploy → Settings → Registries → Add Docker Hub:
- Username: your Docker Hub username
- Password: your Docker Hub access token

### 2. Create Projects

Create two Dokploy projects:
- `dummy-products-stage` - for staging
- `dummy-products-prod` - for production

### 3. Configure Compose

For each project:
1. Select "Docker Compose" as deployment type
2. Use the appropriate compose file:
   - Stage: `deploy/docker-compose.stage.yml`
   - Prod: `deploy/docker-compose.prod.yml`

### 4. Set Environment Variables

In each project's environment settings:

**Stage (`dummy-products-stage`):**
```env
WEB_IMAGE=your-username/dummy-products-web:stage
DOCS_IMAGE=your-username/dummy-products-docs:stage
```

**Production (`dummy-products-prod`):**
```env
WEB_IMAGE=your-username/dummy-products-web:prod
DOCS_IMAGE=your-username/dummy-products-docs:prod
```

Or use specific tags for reproducible deploys:
```env
WEB_IMAGE=your-username/dummy-products-web:stage-abc1234
DOCS_IMAGE=your-username/dummy-products-docs:stage-abc1234
```

### 5. Attach Domains

In Dokploy project settings:
- Attach domain to `web` service on port `80`
- Attach domain to `docs` service on port `3000`

### 6. Deploy

- **Automatic**: Dokploy can watch for new image tags and auto-deploy
- **Manual**: Click "Deploy" in Dokploy UI after CI completes

## Promote stage -> prod

Option 1: Merge `develop` to `master` (triggers prod build)

Option 2: Use specific image digest for immutable deploys:

```bash
docker buildx imagetools inspect your-username/dummy-products-web:stage-abc1234
docker buildx imagetools inspect your-username/dummy-products-docs:stage-abc1234
```

Then set Dokploy env vars with digest:
```env
WEB_IMAGE=your-username/dummy-products-web@sha256:...
DOCS_IMAGE=your-username/dummy-products-docs@sha256:...
```

## Publish npm package (CI)

Triggered by tag `vX.Y.Z`. CI validates:
- `vX.Y.Z` equals `packages/burlaki/package.json` version

If mismatch, publish fails.

### Manual publish

```bash
cd packages/burlaki
pnpm install --frozen-lockfile
pnpm publish --access public
```

Ensure the git tag matches `package.json` (e.g. `v1.2.3`).

## Architecture

```
┌─────────────────┐     ┌─────────────┐     ┌─────────────────┐
│   GitHub Push   │────▶│ GitHub      │────▶│   Docker Hub    │
│   (develop/     │     │ Actions     │     │   Registry      │
│    master/tag)  │     │ (build)     │     │                 │
└─────────────────┘     └─────────────┘     └────────┬────────┘
                                                     │
                                                     ▼
                                            ┌─────────────────┐
                                            │    Dokploy      │
                                            │    (VPS)        │
                                            │                 │
                                            │  ┌───────────┐  │
                                            │  │   web     │  │
                                            │  │  (nginx)  │  │
                                            │  └───────────┘  │
                                            │  ┌───────────┐  │
                                            │  │   docs    │  │
                                            │  │ (Next.js) │  │
                                            │  └───────────┘  │
                                            └─────────────────┘
```
