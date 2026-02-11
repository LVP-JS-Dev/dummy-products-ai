## 1. UI-kit Enforcement (Products Route)

- [x] 1.1 Confirm `/products` uses `@dummy-products/ui-kit` `Pagination` for footer pagination (no custom page/prev/next button implementations).
- [x] 1.2 Confirm `/products` uses `@dummy-products/ui-kit` `SearchInput` and `Button` where applicable for search/actions.

## 2. Behavior and Requests

- [x] 2.1 Verify pagination behaves identically in default and search modes (shared page state, boundary disabling, loading disabling).
- [x] 2.2 Verify page changes issue API calls with correct `limit`/`skip` and include `q` when search is active.

## 3. Tests and Docs

- [x] 3.1 Add/adjust route-level tests to enforce UI-kit pagination usage and footer placement.
- [x] 3.2 Update mapping notes to explicitly call out UI-kit-only requirement for pagination controls.
