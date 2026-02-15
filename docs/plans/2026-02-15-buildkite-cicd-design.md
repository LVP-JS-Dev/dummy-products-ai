---
title: CI/CD for Buildkite hosted agents + GHCR
date: 2026-02-15
status: approved
---

# Summary

This change replaces CircleCI with Buildkite hosted agents. The pipeline builds
and pushes `web` and `docs` Docker images to GHCR on `master`, supports manual
rebuilds, and publishes `packages/burlaki` on `v*` tags with a strict version
check.

# Goals

- Build and push `web` and `docs` images on `master`.
- Keep manual rebuilds for images.
- Publish `packages/burlaki` on `vX.Y.Z` tags.
- Use Buildkite hosted agents and keep GHCR as the registry.

# Non-goals

- Change Dockerfiles or image contents.
- Add new test suites or release automation.
- Migrate the source repository from GitHub.

# Architecture

GitHub remains the source of truth. Buildkite pulls from GitHub and runs on
hosted agents. Images publish to GHCR, and npm publishes to the public
registry.

- **Source control:** GitHub
- **CI runner:** Buildkite hosted agents
- **Registry:** GHCR
- **npm publish:** Buildkite step on tag

# Triggers

1. `master` pushes build and push both images.
2. `v*` tags publish `packages/burlaki`.
3. Manual pipeline runs rebuild images without new commits.

# Steps

## Build and push web image

Build `deploy/docker/web.Dockerfile` and push to GHCR as
`ghcr.io/<org>/dummy-products-web:stage-<short_sha>`.

## Build and push docs image

Build `deploy/docker/docs.Dockerfile` and push to GHCR as
`ghcr.io/<org>/dummy-products-docs:stage-<short_sha>`.

## Publish Burlaki

Verify the tag matches `packages/burlaki/package.json` and publish with
`pnpm publish`.

# Secrets

Store these in Buildkite:

- `GHCR_USERNAME`
- `GHCR_TOKEN`
- `NPM_TOKEN`

# Error handling

- Docker login or build failures fail the step and do not push images.
- Tag and package version mismatch fails the publish step.
- Manual runs without the flag do not run image builds.

# Testing

This change does not add tests. Pipeline success is the validation.

# Migration steps

1. Add Buildkite pipeline file.
2. Remove CircleCI config.
3. Configure Buildkite secrets.
4. Create the pipeline in Buildkite and connect the repo.
5. Merge to `master` and confirm image builds.
6. Create a `vX.Y.Z` tag and confirm publish.
