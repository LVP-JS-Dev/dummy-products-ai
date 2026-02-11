## 1. Specs-Driven UI Alignment

- [x] 1.1 Extend `Product`/`ProductRow` to include thumbnail + category and map defensively.
- [x] 1.2 Update TanStack columns to match assignment layout (selection, name layout, vendor/article/rating/price, actions).
- [x] 1.3 Ensure selection and icon affordances use `@dummy-products/ui-kit` `Checkbox` and `Icon` (directly or via small composition helpers).

## 2. Route Integration

- [x] 2.1 Update `apps/web/src/routes/products.tsx` layout to match `requirements/goods-list.png` structure (header search, card header, actions).
- [x] 2.2 Render formatted rating and price values while keeping sorting numeric and page-local.
- [x] 2.3 Update pagination label to "Показано X-Y из N" and keep `Pagination` behavior.

## 3. Verification

- [x] 3.1 Update column/sorting tests to account for new columns while preserving sorting semantics.
- [x] 3.2 Run `pnpm --filter web check-types` and `pnpm --filter web test`.
