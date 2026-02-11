## 1. Inventory and Constraints

- [x] 1.1 Verify the available exports from `@dummy-products/ui-kit` and document which controls will be used (SearchInput/Button/Pagination/Icon/Checkbox).
- [x] 1.2 Identify any existing non-ui-kit interactive controls in the products header/toolbar that must be replaced.

## 2. Header Composition (UI Kit Controls)

- [x] 2.1 Implement the dedicated products page header container (title + primary search) aligned with the assignment structure.
- [x] 2.2 Render the primary search using `@dummy-products/ui-kit/SearchInput` and wire it to the existing search state/handlers.
- [x] 2.3 Ensure the actions area uses `@dummy-products/ui-kit/Button` for interactive controls.

## 3. Responsive Behavior

- [x] 3.1 Add responsive layout rules so header content and search input reflow cleanly on narrow viewports.
- [x] 3.2 Validate the search input remains visible and usable on mobile widths (no overlap/clipping).

## 4. Verification

- [x] 4.1 Add/update tests that assert header presence and the primary search placeholder/role.
- [x] 4.2 Add/update tests that assert debounce URL-sync behavior for the header search entry.
- [x] 4.3 Run `apps/web` checks (tests + typecheck) and confirm no regressions.
