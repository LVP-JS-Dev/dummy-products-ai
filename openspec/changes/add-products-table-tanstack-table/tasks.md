## 1. Setup and Table Foundation

- [x] 1.1 Add `@tanstack/react-table` dependency for `apps/web` and ensure TypeScript build passes.
- [x] 1.2 Define `ColumnDef<ProductRow>[]` for name, vendor, article, price, and rating with existing visual formatting rules.
- [x] 1.3 Implement adapter functions between app `SortDescriptor` and TanStack `SortingState`.

## 2. Products Route Migration

- [x] 2.1 Replace manual row sorting/rendering logic in `apps/web/src/routes/products.tsx` with `useReactTable` and TanStack row models.
- [x] 2.2 Wire controlled sorting (`state` + `onSortingChange`) to existing `saveSort/loadSort` persistence behavior.
- [x] 2.3 Keep current table UX intact: sortable columns, low-rating red text, empty/loading/error states, and page-local sorting semantics.

## 3. Verification

- [x] 3.1 Add or update tests for sorting toggles and persisted sort restoration with TanStack integration.
- [x] 3.2 Validate products list and search views both render through the same TanStack-backed table behavior.
- [x] 3.3 Run project checks for `apps/web` (lint/typecheck/tests) and confirm no regressions in products flows.
