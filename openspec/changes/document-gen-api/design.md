## Context

Today the monorepo documents UI Kit generation (`pnpm gen`) and the contract-first pipeline, but there is no equivalent documented story for API client generation. Contributors end up with “mystery code” (hand-written fetch wrappers) and no agreed place to put OpenAPI-driven outputs, which makes changes harder to review and keeps the project from being consistently spec-driven beyond UI.

This change introduces a dedicated workspace package, `packages/gen-api`, whose purpose is to standardize API client generation and to document the toolchain and workflow (inputs, outputs, commands, and no-drift expectations).

Constraints:
- The monorepo is contract-first and prefers explicit, reproducible generation over “hidden magic”.
- Generated artifacts are expected to be committed and kept in sync (the repo already enforces no-drift for `packages/ui-kit/src/generated`).
- `apps/*` are consumers and should not become the source of truth for shared tooling.

## Goals / Non-Goals

**Goals:**
- Provide a clear definition of what `gen-api` is and why it exists (docs + PRDs).
- Add a single, repeatable generation entrypoint for API client code: `pnpm -C packages/gen-api gen`.
- Standardize on an explicit toolchain for OpenAPI-to-TypeScript generation.
- Keep generated outputs deterministic and reviewable (no-drift gate similar to UI Kit generated files).

**Non-Goals:**
- Migrating `apps/web` to generated API clients as part of this change (optional follow-up).
- Building a backend or introducing server infrastructure.
- Replacing the UI Kit generation pipeline or changing contract-first invariants.

## Decisions

1. Package location and ownership
   - Decision: Create a new workspace package at `packages/gen-api`.
   - Rationale: Keeps generation tooling out of `apps/*`, aligns with “shared tooling lives in packages”, and makes the outputs importable as a stable dependency.
   - Alternatives:
     - Put scripts under `scripts/`: simpler but harder to version as an API and easier for apps to fork.
     - Put logic inside `apps/web`: violates the “apps are consumers” boundary and increases duplication.

2. Generator toolchain
   - Decision: Use **Kubb** as the OpenAPI toolkit and generator for `packages/gen-api`.
   - Tooling:
     - `@kubb/cli` to run generation
     - `@kubb/core` for `defineConfig`
     - `@kubb/plugin-oas` to parse OpenAPI
     - `@kubb/plugin-ts` to generate TypeScript types
     - `@kubb/plugin-client` to generate a typed HTTP client (configured for `fetch`, not Axios)
     - `@kubb/plugin-zod` to generate Zod schemas
     - `@kubb/plugin-react-query` to generate optional React Query hooks
     - `@kubb/plugin-redoc` to generate static API docs (HTML)
   - Rationale: Single, extensible toolchain that can evolve with the repo; plugin system keeps outputs consistent and reviewable.
   - Alternatives:
     - `@openapitools/openapi-generator-cli`: powerful but heavy and introduces JVM/tooling friction.
     - `orval`: good DX but more opinionated in output structure/config; can be reconsidered if we need generated React Query hooks.

2.1 React Query integration boundary
   - Decision: Keep the *core* entrypoint framework-agnostic, but allow an optional React Query entrypoint.
   - Rationale: Consumers should be able to use `@dummy-products/gen-api` without React, while still enabling generated hooks for React-based apps.
   - Implementation notes:
     - React and `@tanstack/react-query` are declared as optional peer dependencies.
     - Hooks are exposed via `@dummy-products/gen-api/react-query`, not required by the core import.

3. Output structure
   - Decision: Generated files live under `packages/gen-api/generated/**`, with a small hand-written public API under `packages/gen-api/src/*` re-exporting the intended client/types/hooks/schemas.
   - Rationale: Keeps generated code isolated, stable import paths for consumers, and makes “what is generated” obvious while allowing ergonomic entrypoints.

4. No-drift and reviewability
   - Decision: Generated outputs are committed and verified by CI via a no-drift check (run generation and assert clean `git diff`).
   - Rationale: Mirrors the existing UI Kit approach; avoids “works on my machine” generation deltas.

## Risks / Trade-offs

- [Risk] The repo currently depends on DummyJSON which may not provide an official OpenAPI document.
  → Mitigation: Treat `gen-api` as the standardized mechanism for any OpenAPI-based integration; actual adoption by `apps/web` can be incremental and only when a spec is available.

- [Risk] Generated code patterns can become a second “source of truth” if apps start patching outputs.
  → Mitigation: Keep a strict boundary: apps import only from `@dummy-products/gen-api`; generated files are not imported directly.

- [Trade-off] Adding new dependencies for generation increases maintenance surface.
  → Mitigation: Keep the toolchain minimal and document versions and commands in PRDs.
