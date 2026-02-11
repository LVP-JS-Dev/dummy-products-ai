# Adopt TanStack Pacer (Utilities Layer)

## Why

The requirements list mentions using TanStack Pacer as a utility layer for API and performance optimizations. This repo currently has:

- manual debounce logic in `apps/web`
- manual fetch + timeout + error mapping
- generated API clients available in `packages/gen-api`

This change captures what we would actually use Pacer for, and whether it improves the stack meaningfully.

## What Changes

- Evaluate TanStack Pacer capabilities relevant to this app (request scheduling, caching helpers, performance utilities).
- Decide whether to adopt it in `apps/web` as a shared utility layer.

## Scope

### In scope

- Identify specific pain points Pacer would solve in this codebase
- Define adoption boundaries to avoid a new “misc utilities” dumping ground

### Out of scope

- Rewriting UI-kit
- Replacing TanStack Router/Table/Form/Query decisions

## Capabilities

No new capability is required unless we standardize Pacer usage as a normative requirement for `apps/web`.

## PRD impact

- [ ] Root PRD
- [ ] UI Kit PRD
- [ ] Docs PRD
- [ ] Web PRD

