---
title: CI/CD for GitLab CI + GitLab Registry (GitHub mirror)
date: 2026-02-15
status: approved
---

# Summary

This change moves CI/CD from CircleCI to GitLab CI while keeping the source of
truth in GitHub. A GitLab pull mirror triggers pipelines on `main`, and a manual
pipeline remains available for on-demand rebuilds. Docker images are pushed to
GitLab Container Registry, and the `packages/burlaki` package is published on
`v*` tags with a strict version gate.

# Goals

- Build and push `web` and `docs` images on `main`.
- Keep a manual pipeline for rebuilding images without new commits.
- Publish `packages/burlaki` on tag `vX.Y.Z` with a tag/version check.
- Migrate container images to GitLab Container Registry.

# Non-goals

- Move the source repository to GitLab.
- Add new test suites or release automation.
- Change Dockerfiles or image contents.

# Architecture

GitHub remains the source repository. GitLab hosts a mirrored repository and
runs CI on that mirror. Images publish to GitLab Container Registry, and npm
publishes to the public registry.

- **Source control:** GitHub
- **CI runner:** GitLab CI on `gitlab.com`
- **Registry:** GitLab Container Registry
- **npm publish:** GitLab CI job on tag

# Triggers

The pipeline triggers in three cases.

1. On mirror updates to `main` from GitHub.
2. On tags that match `v*` for `packages/burlaki` publish.
3. On manual runs with a `MANUAL=true` variable.

# Jobs

## Build and push web image

Build the `deploy/docker/web.Dockerfile` image and push to GitLab Container
Registry with a `stage-<short_sha>` tag.

## Build and push docs image

Build the `deploy/docker/docs.Dockerfile` image and push to GitLab Container
Registry with a `stage-<short_sha>` tag.

## Publish Burlaki

Validate that the tag equals `packages/burlaki/package.json` version, then
publish with `pnpm publish` from the package directory.

# Data flow

1. You merge into `main` on GitHub.
2. GitLab mirror updates and triggers the pipeline.
3. GitLab CI builds and pushes both images to the registry.
4. You create tag `vX.Y.Z` and push it to GitHub.
5. GitLab mirror triggers the tag pipeline and publishes the package.

# Secrets and variables

Configure the following CI/CD variables in GitLab.

- `NPM_TOKEN` for npm publish.
- `CI_REGISTRY_USER` and `CI_REGISTRY_PASSWORD` if you don't use the built-in
  registry credentials.

# Error handling

- If Docker login fails, the image build jobs fail and do not push.
- If tag and package version don't match, `publish_burlaki` fails.
- Manual runs without `MANUAL=true` do not execute build jobs.

# Testing

The pipeline itself validates the build and publish steps. This change does not
add or modify unit or end-to-end tests.

# Migration steps

Set up the mirror and CI in the following order.

1. Create a new project on GitLab.
2. Configure a pull mirror to the GitHub repository and enable pipeline
   triggers on mirror updates.
3. Add GitLab CI/CD variables for `NPM_TOKEN` and registry credentials.
4. Add the `.gitlab-ci.yml` file to the GitHub repository.
5. Merge to `main` and confirm image builds run on GitLab.
6. Create a `vX.Y.Z` tag and confirm the package publish job runs.

# Next steps

After implementation, verify the images exist in GitLab Container Registry and
confirm `packages/burlaki` publishes on the next tag.
