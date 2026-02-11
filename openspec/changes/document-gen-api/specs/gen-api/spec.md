## ADDED Requirements

### Requirement: Provide `packages/gen-api` as the single source of truth for API client generation

The repository SHALL include a workspace package at `packages/gen-api` that owns the OpenAPI-driven API client generation workflow.

#### Scenario: Consumers depend on a stable package API
- **WHEN** an app needs to call an external API described by OpenAPI
- **THEN** it imports the client/types from `@dummy-products/gen-api`

### Requirement: Standardize the OpenAPI toolchain used by `gen-api`

`packages/gen-api` SHALL use a documented toolchain for generation:
- Kubb (`@kubb/cli` + `@kubb/core`) as the generator framework
- `@kubb/plugin-oas` to parse OpenAPI
- `@kubb/plugin-ts` to generate TypeScript types from OpenAPI
- `@kubb/plugin-client` to generate a typed HTTP client configured for `fetch` (not Axios)

#### Scenario: Contributor can identify the exact generator stack
- **WHEN** a contributor reads the documentation/PRD describing `gen-api`
- **THEN** they can see which tools are used and why

### Requirement: Keep `gen-api` framework-agnostic (no React Query dependency)

The core entrypoint `@dummy-products/gen-api` SHALL be usable without React. If React Query hooks are provided, they SHALL be exposed via a separate entrypoint (`@dummy-products/gen-api/react-query`) and React + `@tanstack/react-query` SHALL be declared as optional peer dependencies.

#### Scenario: Apps own caching and query invalidation
- **WHEN** an app needs caching, retries, invalidation, or optimistic updates
- **THEN** it implements those concerns in the app layer (e.g., `apps/web`) on top of `@dummy-products/gen-api`

### Requirement: Provide a repeatable generation command

`packages/gen-api` SHALL expose a `gen` script runnable as `pnpm -C packages/gen-api gen` that (re)generates `packages/gen-api/generated/**`.

#### Scenario: Generation is runnable from a clean checkout
- **WHEN** a contributor runs `pnpm -C packages/gen-api gen`
- **THEN** the generated outputs are produced under `packages/gen-api/generated/**`

### Requirement: Generated outputs are deterministic and enforced by a no-drift gate

Generated outputs under `packages/gen-api/generated/**` SHALL be committed and the repository check pipeline SHALL fail if regeneration produces diffs.

#### Scenario: CI detects drift in generated API artifacts
- **WHEN** `pnpm check` (or an equivalent check pipeline) runs in CI
- **THEN** the run fails if `packages/gen-api/generated/**` is out of date relative to the generator inputs

### Requirement: Documentation and PRDs explain what `gen-api` is and why it exists

The repository documentation SHALL describe:
- what the `gen-api` package is responsible for
- why the package exists (problem it solves)
- which tools it uses
- how to run generation and where outputs live

#### Scenario: Reader finds `gen-api` explained in project docs
- **WHEN** a reader opens `README.md` and `PRD.md`
- **THEN** they can find an explanation of `gen-api`, its purpose, and the tools used
