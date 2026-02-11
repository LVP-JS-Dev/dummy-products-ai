## Why

Products table behavior is currently implemented with route-local rendering and sorting logic, which makes table behavior harder to standardize across list/search states and harder to evolve safely. We need a single table engine now to align implementation with the Figma assignment and reduce future regressions.

## What Changes

- Migrate products table rendering in `apps/web` to `@tanstack/react-table`.
- Define canonical TanStack column definitions for product name, vendor, article/SKU, price, and rating.
- Integrate TanStack sorting state with existing persisted sort policy (remember-me aware storage behavior).
- Preserve current user-visible behavior (page-local sorting semantics, pagination via API, low-rating highlight), but make TanStack the required table state engine.

## Capabilities

### New Capabilities
- `web-products-tanstack-table`: Require the products screen to build/render table state and rows via TanStack Table.

### Modified Capabilities
- `web-products-catalog`: Clarify that sortable table behavior is implemented through TanStack sorting state while preserving current UX requirements.

## Impact

- `apps/web`: `products` route, product column definitions, sort-state adapter, and table rendering logic.
- Dependencies: `@tanstack/react-table` in web app package.
- Tests: update/add tests for sorting behavior and persisted sort restoration under TanStack integration.
- OpenSpec artifacts: add a new capability spec and a delta spec for `web-products-catalog`.
