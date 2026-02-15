# Buildkite CI for Docker builds and npm publish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to
> implement this plan task-by-task.

**Goal:** Replace CircleCI with Buildkite hosted agents, build and push Docker
images to GHCR, and publish `packages/burlaki` on `v*` tags.

**Architecture:** Buildkite pulls from GitHub, runs hosted agents, builds two
Docker images, pushes to GHCR, and publishes the npm package on tag pipelines.

**Tech Stack:** Buildkite, Docker Buildx, pnpm, GHCR, npm registry

---

### Task 1: Add Buildkite pipeline and remove CircleCI config

**Files:**
- Create: `.buildkite/pipeline.yml`
- Delete: `.circleci/config.yml`

**Step 1: Create the Buildkite pipeline file**

Write a pipeline with:

- Two Docker build steps gated on `master` or manual runs.
- A publish step gated on tags `v*`.
- Manual rebuilds using a `MANUAL=true` pipeline variable.

**Step 2: Remove CircleCI config**

Delete `.circleci/config.yml`.

**Step 3: Sanity check the diff**

Run: `git diff --check`
Expected: no output

**Step 4: Commit**

```bash
git add .buildkite/pipeline.yml
git rm .circleci/config.yml
git commit -m "ci: migrate to Buildkite"
```

### Task 2: Configure Buildkite pipeline and secrets

**Files:**
- None

**Step 1: Create the Buildkite pipeline**

Connect the GitHub repository and create a pipeline that reads
`.buildkite/pipeline.yml`.

**Step 2: Add Buildkite secrets**

In Buildkite settings, add:

- `GHCR_USERNAME`
- `GHCR_TOKEN`
- `NPM_TOKEN`

### Task 3: Validate the pipeline

**Files:**
- None

**Step 1: Trigger a `master` build**

Merge to `master` and confirm both image build steps run.

**Step 2: Trigger a tag build**

Create tag `vX.Y.Z`, push it, and confirm the publish step runs.

**Step 3: Trigger a manual build**

Run a manual pipeline with `MANUAL=true` and confirm both image builds run.
