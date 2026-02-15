# Packages config consolidation design

This design centralizes tool configuration in `packages/config` and keeps only
thin root entrypoints where tools require them. You get a cleaner repository
root, a single source of truth for shared settings, and explicit documentation
that explains the decision and how to apply it.

## Goals

- Centralize shared tool configuration in `packages/config`.
- Reduce root-level config sprawl without breaking tool expectations.
- Provide clear, durable documentation for the decision and workflow.

## Decision summary

We will treat `packages/config` as the source of truth for shared tooling
configuration. The repository root will keep minimal entrypoint files only for
tools that require a root location. Package-level entrypoints will exist only
when a tool requires a local file for IDE or runtime discovery.

## Rationale

Centralizing shared configuration makes behavior consistent across packages,
reduces duplicated settings, and provides a stable place to evolve rules. Root
entrypoints remain for tools that do not support non-root configuration paths.
This balance keeps the root tidy without fighting tool constraints.

## Problems solved

- Eliminates fragmented configs across packages and the repository root.
- Reduces confusion about which config is authoritative.
- Lowers the risk of inconsistent linting and build behavior.

## In scope

- Create shared profiles in `packages/config` for common tools.
- Replace root configs with thin entrypoints where necessary.
- Add or update documentation explaining the decision and usage.

## Out of scope

- Removing `turbo.json`, `pnpm-workspace.yaml`, or `package.json` from the
  repository root.
- Changing tool behavior beyond configuration location and structure.

## Configuration layout

- `packages/config/`
  - `biome.jsonc` or `biome.base.jsonc` for shared Biome rules.
  - `tsconfig.base.json` and optional profile files like
    `tsconfig.web.json` and `tsconfig.node.json`.
  - `eslint` or `prettier` profiles if those tools are used.
  - Shared Playwright config if the test setup benefits from it.

- Root entrypoints (thin wrappers only)
  - `biome.jsonc` extends the shared config.
  - `tsconfig.json` extends the shared base config.
  - `playwright.config.ts` re-exports shared configuration.
  - Other root-only files remain in place when required.

- Package entrypoints (only when required by a tool)
  - `tsconfig.json` in packages extends a profile from `packages/config`.
  - Other tool entrypoints are added only if discovery requires them.

## Turborepo notes

`turbo.json` remains in the repository root because Turborepo resolves global
configuration from the root workspace. If a package needs to customize its
pipeline, it can add a package-level `turbo.json` that extends the root config.

## Documentation updates

We will document the decision, the reasons behind it, and the problems it
solves. We will also provide clear, step-by-step instructions for adding or
updating tool configuration using the centralized package.

## Testing and verification

After migration, run the standard checks to confirm behavior matches the
previous setup:

1. Run `pnpm check`.
2. Run `pnpm test`.
3. If Playwright config changes, run `pnpm e2e`.

## Next steps

Create the implementation plan and then migrate configurations in small,
verifiable steps.
