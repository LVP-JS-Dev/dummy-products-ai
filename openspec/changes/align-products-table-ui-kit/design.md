## Context

The products screen already uses TanStack Table as a headless engine and uses some `@dummy-products/ui-kit` components (Button/SearchInput/Pagination). The assignment design (`requirements/goods-list.png`) includes additional UI elements that are currently missing or not aligned: a selection checkbox column, richer name cell layout (thumbnail + category), formatted rating/price, and an actions area per row.

A key constraint for this change: prefer and require using available primitives from `@dummy-products/ui-kit` (Checkbox/Icon/Button/SearchInput/Pagination) instead of bespoke equivalents.

## Goals / Non-Goals

**Goals:**
- Match the products table structure to the assignment screenshot: selection checkbox column, name cell layout, vendor/article/rating/price columns, and row actions affordances.
- Use `@dummy-products/ui-kit` components where applicable:
  - Selection controls: `Checkbox`
  - Iconography: `Icon`
  - Primary actions and existing controls: `Button`, `SearchInput`, `Pagination`
- Keep TanStack Table as the table engine and preserve current behavior:
  - API pagination
  - stored sort state
  - page-local sorting semantics

**Non-Goals:**
- Introduce server-side sorting/filtering changes.
- Add new ui-kit primitives (unless a missing icon becomes a blocker).
- Implement real "add to cart" or row action backend behavior; actions are UI-only.

## Decisions

1. Extend `Product`/`ProductRow` to include `thumbnail` and `category`.
- Rationale: the design shows a thumbnail placeholder and a secondary label under product name.

2. Represent selection state in the products route.
- Rationale: selection is UI-only and local to the screen; it does not need persistence.

3. Implement selection/actions columns as TanStack columns.
- Rationale: keeps table structure declarative and consistent across list/search modes.

4. Format price and rating values in the cell renderers.
- Rationale: aligns with the screenshot while keeping sorting based on numeric underlying values.

## Risks / Trade-offs

- [Risk] Adding non-sortable columns may affect tests -> Mitigation: update column tests to assert sorting behavior remains correct and ignore added columns.
- [Risk] DummyJSON type mismatch for added fields -> Mitigation: type Product to include optional `thumbnail`/`category` and map defensively.

## Migration Notes

- Update domain types and mapping first, then update columns, then update route rendering.
- Verify both default list and search results use the same TanStack table path.
