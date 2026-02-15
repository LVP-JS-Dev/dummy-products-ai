# CI/CD Implementation Plan (CircleCI + GHCR + npm publish)

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build/push `web` + `docs` images to GHCR on `main` and manual trigger; publish `packages/burlaki` to npm on tags with strict tag/version check; document local fallback and hook options.

**Architecture:** CircleCI builds Docker images using existing Dockerfiles and pushes to GHCR with `stage-<sha>` tags. Dokploy deploys by digest. npm publishing is a separate job triggered only by `vX.Y.Z` tags, with a version guard that compares tag to `packages/burlaki/package.json`.

**Tech Stack:** CircleCI, Docker buildx, GHCR, pnpm, bash.

---

### Task 1: Add CircleCI pipeline skeleton

**Files:**
- Create: `.circleci/config.yml`

**Step 1: Write the initial config**

```yaml
version: 2.1

parameters:
  manual:
    type: boolean
    default: false

orbs:
  docker: circleci/docker@2.7.1

workflows:
  build_and_publish_images:
    when:
      or:
        - equal: [ true, << pipeline.parameters.manual >> ]
        - equal: [ main, << pipeline.git.branch >> ]
    jobs:
      - build_and_push_web
      - build_and_push_docs

  publish_burlaki:
    jobs:
      - publish_burlaki

jobs:
  build_and_push_web:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - setup_remote_docker:
          docker_layer_caching: true
      - run:
          name: Build and push web image
          command: |
            set -euo pipefail
            GIT_SHA="$(git rev-parse --short HEAD)"
            echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin
            docker buildx build \
              --platform linux/amd64 \
              -f deploy/docker/web.Dockerfile \
              -t ghcr.io/${GHCR_USERNAME}/dummy-products-web:stage-${GIT_SHA} \
              --push .

  build_and_push_docs:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - setup_remote_docker:
          docker_layer_caching: true
      - run:
          name: Build and push docs image
          command: |
            set -euo pipefail
            GIT_SHA="$(git rev-parse --short HEAD)"
            echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin
            docker buildx build \
              --platform linux/amd64 \
              -f deploy/docker/docs.Dockerfile \
              -t ghcr.io/${GHCR_USERNAME}/dummy-products-docs:stage-${GIT_SHA} \
              --push .

  publish_burlaki:
    docker:
      - image: cimg/node:20.11
    steps:
      - checkout
      - run:
          name: Verify tag matches package version
          command: |
            set -euo pipefail
            TAG="${CIRCLE_TAG:-}"
            if [ -z "$TAG" ]; then
              echo "Not a tag build; skipping publish."
              exit 0
            fi
            VERSION="$(node -p \"require('./packages/burlaki/package.json').version\")"
            if [ \"v${VERSION}\" != \"$TAG\" ]; then
              echo \"Tag ($TAG) does not match package.json version (v${VERSION}).\"
              exit 1
            fi
      - run:
          name: Publish package
          command: |
            set -euo pipefail
            echo \"//registry.npmjs.org/:_authToken=${NPM_TOKEN}\" > ~/.npmrc
            corepack enable
            pnpm -C packages/burlaki install --frozen-lockfile
            pnpm -C packages/burlaki publish --access public
```

**Step 2: Validate YAML locally if CircleCI CLI is available**

Run: `circleci config validate`
Expected: `Config file at .circleci/config.yml is valid.`

**Step 3: Commit**

```bash
git add .circleci/config.yml
git commit -m "ci: add CircleCI pipeline for GHCR images and npm publish"
```

---

### Task 2: Add explicit tag-only guard for publish workflow

**Files:**
- Modify: `.circleci/config.yml`

**Step 1: Add tag filter**

```yaml
  publish_burlaki:
    jobs:
      - publish_burlaki:
          filters:
            tags:
              only: /^v.*/ 
            branches:
              ignore: /.*/
```

**Step 2: Re-validate config**

Run: `circleci config validate`
Expected: `Config file at .circleci/config.yml is valid.`

**Step 3: Commit**

```bash
git add .circleci/config.yml
git commit -m "ci: publish npm package only on version tags"
```

---

### Task 3: Document CI/CD and local fallback

**Files:**
- Modify: `deploy/README.md`
- Modify: `README.md`

**Step 1: Add CircleCI + GHCR section to deploy docs**

Add a section describing:
- CircleCI triggers (`push` to `main` + manual pipeline run)
- Required secrets in CircleCI project settings
- GHCR image naming and tags
- Dokploy using digests
- Local fallback commands for buildx and publish

**Step 2: Add top-level README section**

Add a short CI/CD summary with links to `deploy/README.md`.

**Step 3: Commit**

```bash
git add deploy/README.md README.md
git commit -m "docs: document CircleCI pipeline and local fallback"
```

---

### Task 4: Optional Lefthook note

**Files:**
- Modify: `deploy/README.md`

**Step 1: Add a brief optional note**

Explain that Husky is current default, Lefthook is an optional future migration for faster hooks/central config.

**Step 2: Commit**

```bash
git add deploy/README.md
git commit -m "docs: mention optional lefthook migration"
```

