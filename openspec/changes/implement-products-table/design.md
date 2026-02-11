## Context

`apps/web/src/routes/products.tsx` currently renders and sorts table rows with route-local logic. This works, but table state management is spread across component code and is harder to keep consistent between default list and search-result views. The change introduces `@tanstack/react-table` as a single table engine while preserving current product behavior required by existing specs and Figma assignment constraints.

## Goals / Non-Goals

**Goals:**
- Make TanStack Table the source of truth for products table row model and sortable state.
- Preserve current user-facing behavior: required columns, sort behavior, page-local sorting semantics, pagination UX, low-rating highlight.
- Keep compatibility with existing remember-me-aware sort persistence policy.

**Non-Goals:**
- Introduce server-side/global sorting across all pages.
- Redesign products page visuals or replace current UI controls.
- Change DummyJSON API contracts or add product persistence behavior.

## Decisions

1. Use controlled TanStack sorting state in `ProductsPage`.
- Rationale: keeps deterministic integration with existing persisted sort descriptor and allows explicit adaptation between app sort model and TanStack model.
- Alternative considered: keep custom `sortRows` and use TanStack only for rendering. Rejected because it would keep split sort logic and reduce value of migration.

2. Keep client-side sorting limited to the currently loaded page.
- Rationale: matches existing requirement that sorting is page-local for API-paginated data.
- Alternative considered: server-driven sorting. Rejected as out of scope and product behavior change.

3. Define canonical `ColumnDef<ProductRow>[]` for assignment-required columns.
- Rationale: declarative column definitions simplify extension and testing, and centralize header/cell behavior including low-rating formatting.
- Alternative considered: inline table JSX mapping. Rejected due to poorer maintainability.

4. Preserve existing DOM/styling contract and use TanStack as a headless engine.
- Rationale: minimizes visual regressions and limits change surface to table state/render plumbing.

## Risks / Trade-offs

- [Risk] Sorting regression when adapting persisted `SortDescriptor` to TanStack `SortingState` -> Mitigation: implement explicit adapters and add tests for restore/toggle flows.
- [Risk] Additional complexity in products route during migration -> Mitigation: isolate column definitions and sort adapters into dedicated modules.
- [Risk] Behavior drift between default list and search mode -> Mitigation: ensure both flows render through the same TanStack-backed table path.

## Migration Plan

1. Add `@tanstack/react-table` to `apps/web` dependencies.
2. Introduce TanStack column definitions and sort adapter functions.
3. Replace manual row sorting/render path in products route with `useReactTable` and TanStack row models.
4. Validate list/search table behavior and persisted sort restore in tests.
5. Roll back by restoring prior route-local sorting/render logic if critical regression is detected.

## Open Questions

- Should table configuration be extracted into a reusable hook now, or remain local to `products.tsx` until another screen needs the same pattern?
- Do we need non-v1 features (multi-sort, column visibility), or should the change enforce a minimal migration only?
