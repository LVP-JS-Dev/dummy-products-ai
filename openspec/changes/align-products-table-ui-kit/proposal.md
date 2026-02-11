## Why

The products page must visually match the assignment Figma and use the shared `@dummy-products/ui-kit` primitives consistently. Today, parts of the products table UI are implemented with bespoke markup (missing selection/actions columns and some visual details), which makes it harder to keep the UI consistent with the design system.

## What Changes

- Align the products table UI with `requirements/goods-list.png` (selection checkbox column, name cell layout, rating/price formatting, actions area, pagination label).
- Require using available `@dummy-products/ui-kit` components where applicable (Checkbox, Icon, Button, SearchInput, Pagination).
- Keep TanStack Table as the headless table engine and preserve existing functional requirements (API pagination, stored sort state, page-local sorting).

## Capabilities

### New Capabilities
- `web-products-ui-kit-alignment`: Products table UI SHALL compose available `@dummy-products/ui-kit` components and match assignment visual structure.

### Modified Capabilities
- `web-products-catalog`: Clarify table columns/formatting to match the Figma assignment structure, including selection/actions affordances and formatted price/rating.

## Impact

- `apps/web`: products route layout, product row model fields (thumbnail/category), TanStack columns, and selection UI state.
- `packages/ui-kit`: no new components required; use existing `Checkbox` and `Icon`.
- Tests: update TanStack table column/sorting tests to cover new columns without changing sorting semantics.
