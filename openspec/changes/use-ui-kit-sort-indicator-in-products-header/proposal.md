## Why

The products table header currently renders sort direction indicators via ad-hoc logic, which conflicts with the requirement to prefer shared ui-kit primitives. Now that a minimal ui-kit `SortIndicator` exists, the products header should use it to keep visuals consistent and reduce duplication.

## What Changes

- Update the products table header to render sort direction indicators via `SortIndicator` from `@dummy-products/ui-kit`.
- Keep existing TanStack sorting behavior, accessibility semantics, and persisted sort policy unchanged.
- Update requirements in `web-products-catalog` to clarify that the sort indicator is rendered through the shared ui-kit component.

## Capabilities

### New Capabilities

### Modified Capabilities
- `web-products-catalog`: Sorting UI requirement is clarified to display sort direction via shared ui-kit `SortIndicator`.

## Impact

- `apps/web`: products header component and its tests.
- OpenSpec delta spec for `web-products-catalog`.
