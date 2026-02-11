## Why

The products page must visually match the assignment Figma, but the main header with an integrated search control is not implemented as a stable, testable contract. This change is needed to make the primary entry screen reviewable while enforcing consistent use of the shared `@dummy-products/ui-kit` components.

## What Changes

- Implement the products page header composition (title + search placement) aligned with the assignment layout.
- Make `@dummy-products/ui-kit` components the mandatory building blocks for interactive controls in the header and surrounding toolbar (e.g., `SearchInput`, `Button`, `Pagination`, `Icon`, `Checkbox` where applicable).
- Preserve existing product search semantics (API-backed, debounced, URL-restorable) while surfacing the primary search field in the header.
- Add explicit responsive rules for header/search so desktop and mobile stay usable without overlap/clipping.

## Capabilities

### New Capabilities
- `web-main-page-header-search-ui-kit`: Products page header composition with integrated search, with a constraint that available `@dummy-products/ui-kit` components are used for interactive controls.

### Modified Capabilities
- `web-products-search-and-create`: Clarify that the primary search control is surfaced in the main-page header and remains behaviorally compatible, implemented via `@dummy-products/ui-kit/SearchInput`.

## Impact

- `apps/web`: products route/page layout, header markup, and integration of `@dummy-products/ui-kit` components for controls.
- Specs: add a new capability spec for the header contract and a delta spec for search entry-point placement.
- Testing: add/update UI/integration tests that validate header presence and URL-sync debounce behavior.
- No API changes; DummyJSON integration stays as-is.
