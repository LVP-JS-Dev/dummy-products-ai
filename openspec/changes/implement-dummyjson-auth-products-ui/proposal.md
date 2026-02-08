## Why

`apps/web` currently contains only a placeholder route and does not implement the assignment-required auth and products workflows. This change is needed now to convert the approved PRD into a working, testable product flow integrated with DummyJSON APIs.

## What Changes

- Implement an authentication flow with required-field validation, API error handling, and remember-me session persistence.
- Implement products list loading from DummyJSON with visible loading progress, sortable table columns, and persisted sort state in app state.
- Implement server-backed product search and render search results in the products table.
- Implement local "Add product" UI flow (no API write) with required fields and success toast feedback.
- Apply rating-based visual rule: ratings below `3` are rendered in red.
- Build login and products screens to match the provided Figma structure and key visual hierarchy.

## Capabilities

### New Capabilities

- `web-auth-session`: User login, validation/error states, and remember-me token lifecycle for protected app access.
- `web-products-catalog`: Product list retrieval, loading/error states, sortable columns, persisted sort preference, and rating-based visual highlighting.
- `web-products-search-and-create`: API search behavior plus local add-product modal/form and toast confirmation.

### Modified Capabilities

- None.

## Impact

- Affected code: `apps/web/src/routes`, screen/layout components, form and table UI composition, and client-side auth/products data utilities.
- APIs: DummyJSON Auth and DummyJSON Products endpoints are consumed for login, listing, and search.
- State and storage: in-memory UI state plus `localStorage`/`sessionStorage` token persistence based on remember-me choice.
- Dependencies/systems: existing React + TypeScript + TanStack Router + Sonner stack; no backend or database changes.
