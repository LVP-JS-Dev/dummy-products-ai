# GitLab CI for Docker builds and npm publish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to
> implement this plan task-by-task.

**Goal:** Move CI to GitLab CI with GitHub mirroring, build and push Docker
images, and publish `packages/burlaki` on `v*` tags.

**Architecture:** GitHub remains the source repository and mirrors into
`gitlab.com`. GitLab CI runs the pipeline from the mirror, builds two Docker
images, pushes to GitLab Container Registry, and publishes the npm package on
tag pipelines.

**Tech Stack:** GitLab CI, Docker Buildx, pnpm, npm registry, GitLab Container
Registry

---

### Task 1: Add GitLab CI pipeline

**Files:**
- Create: `.gitlab-ci.yml`

**Step 1: Create the pipeline file**

Write the GitLab pipeline with three jobs: `build_and_push_web`,
`build_and_push_docs`, and `publish_burlaki`. Use rules to run image builds on
`main` and on manual runs with `MANUAL=true`. Restrict `publish_burlaki` to tags
that match `v*`.

**Step 2: Sanity check the file**

Run: `git diff --check`
Expected: no output

**Step 3: Commit**

```bash
git add .gitlab-ci.yml
git commit -m "ci: add GitLab CI pipeline"
```

### Task 2: Configure GitLab mirror and variables

**Files:**
- None

**Step 1: Create the GitLab project**

On `gitlab.com`, create a new project to host the mirror.

**Step 2: Configure the mirror**

On **Settings** > **Repository** > **Mirroring repositories**, add a pull mirror
from GitHub and enable pipeline triggers on mirror updates.

**Step 3: Add CI/CD variables**

On **Settings** > **CI/CD** > **Variables**, add:

- `NPM_TOKEN`
- `CI_REGISTRY_USER` and `CI_REGISTRY_PASSWORD` if you do not use built-in
  registry credentials

### Task 3: Validate in GitLab

**Files:**
- None

**Step 1: Trigger a `main` build**

Merge to `main` on GitHub and confirm the mirror triggers a GitLab pipeline.

**Step 2: Trigger a tag build**

Create and push a tag `vX.Y.Z` from GitHub and confirm the publish job runs.

**Step 3: Commit**

No commit is required for validation.
