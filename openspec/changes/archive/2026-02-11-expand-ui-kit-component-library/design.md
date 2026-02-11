## Context

`packages/ui-kit` is intended to be the repository's UI source of truth, but the current implementation is fragmented:
- some primitives exist in `ui-kit` (`Button`, `Checkbox`, `SearchInput`, etc.);
- other primitives exist only in `apps/web/src/components/ui/*` (`Input`, `Card`, `Toaster`);
- some critical UI behavior is implemented inline in route files (login field composition, divider, auth footer link, modal field rendering).

The project also enforces contract-first component definitions (`contracts` + generated schemas + `states` + manifest), so any expansion must preserve machine-readable outputs and deterministic generation checks.

## Goals / Non-Goals

**Goals:**
- Make `packages/ui-kit` the single reusable source for core foundation components used by web app and docs.
- Add missing primitives: `Input`, `Divider`, `Link`, `Text`, `Toast`, `Card`, `Spinner`, `Image`.
- Upgrade existing `Button` and `Checkbox` to support composition requirements while keeping contract-first guarantees.
- Ensure every new/updated component is represented in contracts, generated schemas/manifest, states, and docs.

**Non-Goals:**
- Redesigning visual identity beyond requested component scope.
- Introducing backend or domain-level behavior changes.
- Replacing external APIs or routing/auth logic.

## Decisions

1. Expand UI Kit via contract-first artifacts, then component implementations
- Decision: each component gets a contract, runtime props type, component implementation, states, and generated schema/manifest entry.
- Rationale: aligns with existing repo checks (`pnpm gen`, `pnpm test`, generated drift detection).
- Alternative considered: implement JSX-only components first and backfill contracts later. Rejected because it breaks repository invariants and causes drift.

2. Separate serializable props from runtime composition props
- Decision: keep JSON-schema-safe serializable props in contracts; add runtime-only props (e.g., `children`, slot/adornment nodes, handlers) via exported `...Props` intersection types.
- Rationale: enables both machine-readable states and ergonomic React composition.
- Alternative considered: allow ReactNode directly in serializable contract. Rejected because generation/state validation becomes invalid.

3. Standardize Input as composable field primitive
- Decision: `Input` supports start/end adornments, optional `label`, error visuals, error text, and password mode.
- Rationale: directly covers login-form and product-modal field patterns now duplicated inline.
- Alternative considered: keep dedicated `SearchInput`/route-local text fields only. Rejected due to duplication and inconsistent API surface.

4. Provide safe-by-default Link and performance-oriented Image defaults
- Decision: `Link` hardens external links (`rel="noopener noreferrer"` with `_blank`), while `Image` defaults to accessible, stable, and performant rendering (`alt` policy, lazy/async defaults, layout stability constraints, fallback hooks).
- Rationale: reduces repeated security/performance mistakes across app surfaces.
- Alternative considered: leave these concerns to product code. Rejected because requirements explicitly demand best practices at component level.

5. Keep Toast architecture wrapper-based
- Decision: expose a UI-kit toast component API and mountable toaster wrapper compatible with existing `sonner` usage, including configurable position.
- Rationale: minimal migration risk for existing `toast.success/error` call sites.
- Alternative considered: replace the toast stack with a fully custom implementation. Rejected due to unnecessary migration cost.

6. Enforce token-only styling for all foundation components
- Decision: all new and updated foundation components must consume design-system tokens for visual values; if token coverage is insufficient, expand tokens in `ui-kit` token sources first, then consume them in components.
- Rationale: prevents visual drift, preserves theming consistency, and keeps design language centrally managed.
- Alternative considered: allow component-level hardcoded styles for speed. Rejected because it undermines maintainability and violates design-system discipline.

## Risks / Trade-offs

- [Risk] API migration may break existing consumers of `Button` and `Checkbox` if behavior changes too aggressively. -> Mitigation: keep backward-compatible props where possible and deprecate incrementally.
- [Risk] Large single change touching contracts, components, generated artifacts, and docs can increase review complexity. -> Mitigation: stage implementation by component groups and verify checks after each group.
- [Risk] New `Image` fallback/loading behavior can conflict with edge-case product expectations. -> Mitigation: define explicit override props and deterministic default behavior.
- [Risk] Temporary duplication between `apps/web/src/components/ui` and `ui-kit` during migration. -> Mitigation: migrate imports in same change and remove duplicate wrappers last.

## Migration Plan

1. Add contracts + component implementations for new primitives in `packages/ui-kit`.
2. Upgrade existing `Button` and `Checkbox` contracts/components to meet new composition requirements without breaking schema generation.
3. Add any missing design-system tokens required by new primitives and wire all component styles to tokens.
4. Update exports, states, manifest generation, and tests.
5. Migrate `apps/web` and `apps/fumadocs` to consume new `ui-kit` primitives; remove redundant app-local wrappers where replaced.
6. Run repository checks (`pnpm gen`, `pnpm test`, docs token checks, type checks) and resolve drift.

Rollback strategy: revert the change branch if consumer migration causes regressions; no persistent data migration is involved.

## Open Questions

- Should legacy `SearchInput` remain as a distinct component or be reduced to a specialized composition of new `Input`?
- For `Image`, should intrinsic dimensions be mandatory in API, or should `aspectRatio` + container constraints be accepted as equivalent?
- For `Toast`, should UI-kit expose both provider and imperative helper, or only provider-level API and let apps call underlying library directly?
