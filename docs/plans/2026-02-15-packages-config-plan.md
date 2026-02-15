# Packages config consolidation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to
> implement this plan task-by-task.

**Goal:** Centralize shared tooling configuration in `packages/config` while
keeping thin root entrypoints for tools that require them.

**Architecture:** Move shared configs into `packages/config`, then replace root
configs with minimal wrapper files that point to the shared source of truth.
Keep root-only files, such as `turbo.json`, in place.

**Tech Stack:** TypeScript, pnpm, Biome, Playwright, Turborepo.

---

### Task 1: Create shared config sources in `packages/config`

**Files:**
- Create: `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/packages/config/biome.jsonc`
- Create: `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/packages/config/playwright.config.ts`
- Modify: `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/packages/config/package.json`

**Step 1: Move the existing Biome config into the package**

Move `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/biome.jsonc` to
`/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/packages/config/biome.jsonc`
with no content changes.

**Step 2: Move the existing Playwright config into the package**

Move
`/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/playwright.config.ts`
to
`/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/packages/config/playwright.config.ts`
with no content changes.

**Step 3: Update the config package exports**

Edit `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/packages/config/package.json`
to expose the new configs:

```json
{
  "name": "@dummy-products/config",
  "version": "0.0.0",
  "private": true,
  "exports": {
    "./biome": "./biome.jsonc",
    "./playwright": "./playwright.config.ts",
    "./tsconfig.base.json": "./tsconfig.base.json"
  }
}
```

**Step 4: Commit**

```bash
git add \
  /Users/leonidpetrov/.codex/worktrees/565b/dummy-products/packages/config/biome.jsonc \
  /Users/leonidpetrov/.codex/worktrees/565b/dummy-products/packages/config/playwright.config.ts \
  /Users/leonidpetrov/.codex/worktrees/565b/dummy-products/packages/config/package.json

git commit -m "Move shared configs into packages/config"
```

### Task 2: Add root entrypoint wrappers

**Files:**
- Create: `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/biome.jsonc`
- Modify: `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/playwright.config.ts`

**Step 1: Add a thin Biome wrapper in the repository root**

Create `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/biome.jsonc`:

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["./packages/config/biome.jsonc"]
}
```

**Step 2: Add a thin Playwright wrapper in the repository root**

Edit `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/playwright.config.ts`:

```ts
export { default } from "./packages/config/playwright.config";
```

**Step 3: Commit**

```bash
git add \
  /Users/leonidpetrov/.codex/worktrees/565b/dummy-products/biome.jsonc \
  /Users/leonidpetrov/.codex/worktrees/565b/dummy-products/playwright.config.ts

git commit -m "Add root wrapper configs"
```

### Task 3: Handle root-only metadata configs

**Files:**
- Delete: `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/bts.jsonc`

**Step 1: Remove unused Better-T-Stack metadata**

Delete `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/bts.jsonc`.

**Step 2: Commit**

```bash
git add -u /Users/leonidpetrov/.codex/worktrees/565b/dummy-products/bts.jsonc

git commit -m "Remove unused Better-T-Stack metadata"
```

### Task 4: Document the decision and workflow

**Files:**
- Create: `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/docs/configuration.md`
- Modify: `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/README.md`

**Step 1: Add a configuration guide**

Create `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/docs/configuration.md`:

```markdown
# Configuration management

This guide explains why configuration lives in `packages/config`, what problems
it solves, and how you update shared tooling settings. Use it to keep the
repository root clean while maintaining predictable tool behavior.

## Decision and rationale

We store shared tooling configuration in `packages/config` so you have a single
source of truth for linting, formatting, and testing rules. This reduces
configuration drift across packages and makes updates predictable. Root files
remain only when a tool requires a repository-level entrypoint.

## Problems this solves

- Prevents duplicated configuration across packages.
- Removes ambiguity about which config is authoritative.
- Reduces root-level clutter without breaking tool discovery.

## How to add or update a tool config

Follow these steps when you add a new tool or update an existing config:

1. Add the shared configuration file in `packages/config`.
2. Export the config in `packages/config/package.json` if it needs a stable
   import path.
3. Add a thin root wrapper only if the tool requires a root entrypoint.
4. If a package needs a local entrypoint, create a minimal file that extends
   the shared profile.

## Root-only files

Some files must stay in the repository root because the tool only reads them
from the workspace root. Examples include `turbo.json`, `pnpm-workspace.yaml`,
and `package.json`.
```

**Step 2: Link the guide from the README**

Add a short section to `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products/README.md`:

```markdown
## Configuration management

See `docs/configuration.md` for the configuration layout, rationale, and
instructions for adding new tool configs.
```

**Step 3: Commit**

```bash
git add \
  /Users/leonidpetrov/.codex/worktrees/565b/dummy-products/docs/configuration.md \
  /Users/leonidpetrov/.codex/worktrees/565b/dummy-products/README.md

git commit -m "Document configuration management"
```

### Task 5: Verify behavior

**Files:**
- Test: `/Users/leonidpetrov/.codex/worktrees/565b/dummy-products`

**Step 1: Run the full check**

Run: `pnpm check`
Expected: All checks pass.

**Step 2: Run unit or contract tests**

Run: `pnpm test`
Expected: All tests pass.

**Step 3: Run E2E tests when Playwright changes**

Run: `pnpm e2e`
Expected: All tests pass.

**Step 4: Commit any test fixes**

If the tests require follow-up fixes, commit them with a message that describes
what changed.
