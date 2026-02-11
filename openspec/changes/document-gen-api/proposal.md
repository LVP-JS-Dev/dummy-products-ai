## Why

The repo already documents UI Kit generation (`pnpm gen`) but does not explain what the `gen-api` package is, why it exists, or which tools it standardizes. This creates ambiguity for contributors and makes API client generation hard to reproduce and review.

## What Changes

- Add documentation to clearly define what `packages/gen-api` is, why it is needed, and how it is used.
- Add/extend PRD sections to describe the role of `gen-api` in the monorepo and its constraints (what it does and does not own).
- Standardize and document the toolchain used for API client generation (OpenAPI input, Kubb-based generator, output location, and no-drift expectations).

## Capabilities

### New Capabilities

- `gen-api`: Provide a dedicated, documented package that generates a typed API client from an OpenAPI source for use by apps in this monorepo.

### Modified Capabilities

<!-- None -->

## Impact

- Repository documentation: root `README.md`, `PRD.md`, and potentially package-level PRDs/docs will be updated to include `gen-api`.
- New workspace package: `packages/gen-api` (and its build/test hooks) will be introduced and wired into the monorepo workflow.
- Developer workflow: contributors get a single, repeatable way to regenerate API client code and review changes.
