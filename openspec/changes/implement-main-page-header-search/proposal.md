## Why

The products page has search behavior, but the main-page header layout from the provided Figma is not implemented, so the page does not match the expected structure and visual hierarchy. This change is needed now to make the core entry screen reviewable against the test assignment design.

## What Changes

- Implement the products-page header block according to the Figma node, including title area and search control placement.
- Define UI and interaction requirements for the header search field as part of the page-level layout contract.
- Reuse existing search behavior (API-backed, debounced, URL-aware) while standardizing how users access search from the header.
- Add acceptance-level requirements for responsive behavior of the header (desktop and mobile widths).

## Capabilities

### New Capabilities
- `web-main-page-header-search`: Main products-page header composition with integrated search entry point and responsive layout rules.

### Modified Capabilities
- `web-products-search-and-create`: Clarify that the primary search input is surfaced in the main-page header and remains behaviorally compatible with existing search rules.

## Impact

- `apps/web`: products route/page layout, header section markup, and search field placement/styling.
- Specs: add new capability spec for header contract and delta spec for `web-products-search-and-create`.
- Testing: update UI/integration coverage for header rendering, search control availability, and responsive states.
- No API contract changes; existing products search API integration remains unchanged.
