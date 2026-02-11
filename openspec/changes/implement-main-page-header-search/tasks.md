## 1. Header Structure

- [x] 1.1 Add a dedicated main-page header container to the products route in `apps/web` above the products content/table area.
- [x] 1.2 Implement header content blocks (page heading and search region) to match the Figma structure for the target node.
- [x] 1.3 Keep the search control as the primary search entry point within the header.

## 2. Search Integration

- [x] 2.1 Connect the header search input to existing products search state/handlers (debounce + URL query sync) without changing API contracts.
- [x] 2.2 Ensure existing search flows still work from the new header location: query submit, clear query, and error/retry states.
- [x] 2.3 Confirm search pagination behavior remains compatible when a header query is active.

## 3. Responsive Styling and UX

- [x] 3.1 Implement responsive header layout rules for desktop and mobile widths so heading and search remain visible and usable.
- [x] 3.2 Apply spacing/typography/token usage needed for visual parity with the approved design direction.
- [x] 3.3 Verify no overlap/clipping in narrow viewports and maintain accessible input sizing.

## 4. Verification

- [x] 4.1 Add/update tests for header rendering and search control availability on the products page.
- [x] 4.2 Add/update regression tests for header-based search behavior (debounced request trigger and URL-restorable query state).
- [x] 4.3 Run `apps/web` checks (lint, typecheck, tests) and confirm no regressions in existing products search behavior.
