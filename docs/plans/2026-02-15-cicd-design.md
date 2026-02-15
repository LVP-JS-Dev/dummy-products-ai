---
title: CI/CD for GHCR + Dokploy + npm (CircleCI with Local Fallback)
date: 2026-02-15
status: approved
---

# Summary

Implement CI/CD to build and publish two Docker images (`web`, `docs`) to GHCR via CircleCI, and publish the `packages/burlaki` npm package on tag. Dokploy will deploy by immutable image digest. A local fallback flow is documented for outages. Husky remains the default local hook; a Lefthook migration is suggested as an optional improvement.

# Goals

- Build and push `web` and `docs` images on `push` to `main` and via manual trigger.
- Publish `packages/burlaki` on tag `vX.Y.Z` with a strict tag/version check.
- Keep Dokploy deployments reproducible by using image digests.
- Provide a documented local fallback for both images and npm publish.

# Non-Goals

- No server-side builds on the Dokploy VPS.
- Avoid a monolithic single image for both services.
- Exclude automated version bumping from CI.

# Architecture

- **CI runner:** CircleCI
- **Registry:** GHCR
- **Artifacts:** Two images (`web`, `docs`) built from existing Dockerfiles.
- **Deploy:** Dokploy pulls images by digest.
- **npm publish:** CI job triggered by git tag; validates tag equals package version.

# Components

## Docker images

- `deploy/docker/web.Dockerfile` -> `ghcr.io/<org>/dummy-products-web`
- `deploy/docker/docs.Dockerfile` -> `ghcr.io/<org>/dummy-products-docs`
- Tags:
  - `stage-<short_sha>` for human readability
  - digest (`@sha256:...`) for Dokploy variables

## npm publish

- Package: `packages/burlaki`
- Trigger: git tag `vX.Y.Z`
- Check: `vX.Y.Z` equals `packages/burlaki/package.json` version
- Publish: `pnpm publish` from package directory

# Data Flow

1. `git push main` -> CircleCI builds and pushes images to GHCR.
2. `git tag vX.Y.Z` -> CircleCI validates version and publishes npm package.
3. Dokploy is configured to pull images by digest.

# Error Handling

- Build failures fail the job and do not push images.
- Tag/version mismatch fails the npm publish job.
- Manual trigger is available to rebuild/publish images without new commits.

# Secrets

Stored in CircleCI project environment variables:
- `GHCR_USERNAME`, `GHCR_TOKEN` (PAT with `read:packages`, `write:packages`)
- `NPM_TOKEN`

# Local Fallback

Document commands to:
- Build and push images with `docker buildx` for `linux/amd64`
- Publish npm package with `pnpm publish`

# Hooks Best Practices

- Keep **local** hooks fast (format/lint) to speed developer feedback.
- Keep **CI** checks authoritative (build, tests, tag/version check).

## Optional Lefthook Migration

Husky is currently in use. If hook performance or maintenance becomes a pain point, consider migrating to Lefthook for:
- Faster execution via parallelism
- Centralized configuration
- Better fit for monorepos

Migration would be optional and documented as a future improvement, not required for CI/CD delivery.

# Testing

- CI validates build steps and npm publish gate.
- No additional unit tests added as part of this change.

# Future Work

- Audit `apps/web` and `apps/fumadocs` for environment variable usage.
- If needed, define typed/validated env schemas in `packages/env` and migrate apps to use it.
