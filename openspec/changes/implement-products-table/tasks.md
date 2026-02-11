## 1. Setup and Table Foundation

- [x] 1.1 Add `@tanstack/react-table` dependency to `apps/web` and ensure typecheck passes.
- [x] 1.2 Define canonical `ColumnDef<ProductRow>[]` for name, vendor, article/SKU, price, and rating columns.
- [x] 1.3 Implement explicit adapters between app `SortDescriptor` and TanStack `SortingState`.

## 2. Products Route Migration

- [x] 2.1 Replace manual products table row sorting/rendering in `apps/web/src/routes/products.tsx` with `useReactTable` and TanStack row models.
- [x] 2.2 Wire controlled TanStack sorting state (`state` + `onSortingChange`) to existing `loadSort`/`saveSort` persistence behavior.
- [x] 2.3 Preserve current UX behaviors: required columns, low-rating red highlight, loading/error/empty states, and page-local sorting semantics.

## 3. Verification

- [x] 3.1 Add or update tests for sorting toggle behavior and persisted sort restoration after reload.
- [x] 3.2 Validate both default products list and search-results table render through the same TanStack-backed table path.
- [x] 3.3 Run app checks for `apps/web` (lint/typecheck/tests) and confirm no regressions in products flow.
