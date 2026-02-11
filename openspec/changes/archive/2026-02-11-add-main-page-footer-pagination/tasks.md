# Footer Pagination Integration

- [x] 1.1 Update `apps/web/src/routes/products.tsx` to render pagination in a dedicated footer row below the products table in both default and search result modes.
- [x] 1.2 Ensure footer pagination uses `Pagination` from `@dummy-products/ui-kit` as the single pagination control implementation.
- [x] 1.3 Align footer state text and control props (`currentPage`, `totalPages`, `disabled`, labels) with loading and boundary-page behavior.

## Pagination Behavior Consistency

- [x] 2.1 Verify the same page state and handlers are used for default listing and active search listing transitions.
- [x] 2.2 Enforce boundary behavior so previous is disabled on page 1 and next is disabled on last page.
- [x] 2.3 Confirm page-change interactions trigger API requests with correct `limit`/`skip` (and active search query when present).

## Tests and Validation

- [x] 3.1 Add or update route-level tests for footer placement and pagination rendering in default list mode.
- [x] 3.2 Add or update route-level tests for pagination rendering and navigation while search query is active.
- [x] 3.3 Add or update tests for boundary disabled controls and loading-safe pagination interactions.

## Documentation and Final Checks

- [x] 4.1 Update related docs/mapping notes for footer pagination alignment with assignment/Figma expectations.
- [x] 4.2 Run project checks/tests for affected packages/apps and resolve regressions.
