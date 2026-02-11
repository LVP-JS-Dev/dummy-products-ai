# Main Page Footer Pagination (UI-kit Only)

## Why

On the products page, controls should be composed from the available `@dummy-products/ui-kit` components to avoid design-system drift and to enforce a consistent UX for footer pagination.

## What Changes

- Formalize at the requirements level: the `/products` footer pagination uses available UI-kit components (specifically `Pagination`, and `SearchInput`/`Button` where applicable).
- Clarify footer behavior across default list and active search modes: same states (loading/disabled), same aria labels, same boundary rules.
- Add/update route-level tests to confirm UI-kit pagination usage and correct API requests with `limit`/`skip` (+ `q` in search mode).

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `web-products-catalog`: footer pagination requirements with mandatory usage of available UI-kit components.
- `web-products-search-and-create`: search-mode pagination requirements using the same UI-kit primitives and states.

## Impact

- Affected code: `apps/web/src/routes/products.tsx`.
- Affected tests: `apps/web/src/test/Products.test.tsx`.
- Affected docs: `apps/web/src/routes/products.figma-map.md`.
- Dependencies: `@dummy-products/ui-kit` only (no new external dependencies).

## How to verify

- Run `pnpm -C apps/web exec vitest run src/test/Products.test.tsx`
- Run `pnpm check` from repo root
- Manually verify on `/products`:
  - footer pagination uses UI-kit `Pagination` (no custom next/prev/page buttons)
  - search and non-search modes behave identically for boundary/loading states

## PRD impact

- [x] Root `PRD.md`
- [x] `packages/ui-kit/PRD.md`
- [x] `apps/web/PRD.md`
- [x] `apps/fumadocs/PRD.md`
