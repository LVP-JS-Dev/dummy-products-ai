# Add UI Kit Modal And Logo Primitives

## Why

`apps/web` currently implements a custom modal (focus management + escape handling) and uses a placeholder icon where a logo/brand mark is expected. Extracting these into `packages/ui-kit`:

- removes ad-hoc accessibility logic from app code
- enables consistent modal behavior across apps/docs
- creates a stable `Logo` primitive for Figma alignment

## What Changes

- Add a `Modal` (or `Dialog`) component to UI kit with contract-first API and events.
- Add a `Logo` component to UI kit (simple, deterministic, token-friendly).
- Add `states`, generated schemas/manifest entries, and docs pages for both.

## Scope

### In scope

- UI-kit contract + component + states + docs for `Modal` and `Logo`
- Replace app-level ad-hoc usage later (separate migration task)

### Out of scope

- UI-kit form system (keep TanStack Form in `apps/web`)
- Portal manager or complex layered overlay system beyond a single dialog

## Capabilities

### New capabilities

- `ui-kit-modal`
- `ui-kit-logo`

## PRD impact

- [ ] Root PRD
- [x] UI Kit PRD
- [x] Docs PRD
- [ ] Web PRD

