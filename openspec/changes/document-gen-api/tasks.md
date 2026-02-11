## 1. Package Setup

- [ ] 1.1 Create workspace package skeleton at `packages/gen-api` (package.json, tsconfig, src/index.ts)
- [ ] 1.2 Add Kubb generation dependencies and scripts (`@kubb/cli`, `@kubb/core`, `@kubb/plugin-oas`, `@kubb/plugin-ts`, `@kubb/plugin-client`, `pnpm -C packages/gen-api gen`)
- [ ] 1.3 Add a Kubb config (e.g. `packages/gen-api/kubb.config.ts`) that writes outputs to `packages/gen-api/generated/**`

## 2. Specs And Public API

- [ ] 2.1 Define the public exports from `@dummy-products/gen-api` (client + types) and ensure apps do not import generated paths directly
- [ ] 2.2 Choose and document the OpenAPI input source for generation (local file path and/or URL) and validate missing/invalid input fails clearly
- [ ] 2.3 Ensure the core entrypoint stays framework-agnostic; expose React Query hooks (if any) via a separate entrypoint with optional peer deps

## 3. Docs And PRDs

- [ ] 3.1 Update root `PRD.md` to include `packages/gen-api` in “Состав системы” and explain purpose + toolchain
- [ ] 3.2 Update root `README.md` with a short `gen-api` section: what it is, why it exists, tools used, and how to run generation
- [ ] 3.3 Add `packages/gen-api/PRD.md` documenting the package role, boundaries, and non-goals

## 4. No-Drift Gate

- [ ] 4.1 Add a root-level generation script (e.g. `pnpm gen:api`) that runs the `gen-api` generator
- [ ] 4.2 Extend the root `pnpm check` gate to verify `gen-api` generated outputs are up-to-date (clean `git diff` / no untracked generated files)
