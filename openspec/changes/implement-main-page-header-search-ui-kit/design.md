## Context

`apps/web` already implements products list, sorting, pagination, and API-backed search with debounce and URL synchronization. However, the top-level page header composition (title + prominent search input) is not treated as a first-class, spec-backed UI contract, and interactive controls are not explicitly constrained to `@dummy-products/ui-kit`.

Available `@dummy-products/ui-kit` components are limited to: `Button`, `Checkbox`, `Icon`, `PageNumber`, `Pagination`, `SearchInput`. This design therefore focuses on composing page layout using semantic HTML containers while requiring that all interactive controls use the available UI kit components.

## Goals / Non-Goals

**Goals:**
- Implement a products page header that matches the assignment structure: page title and a primary search input in the header.
- Require `@dummy-products/ui-kit` for interactive controls (header search, action buttons, pagination), avoiding ad-hoc replacements.
- Preserve existing search semantics (debounce, URL state, API calls) while wiring them to the header `SearchInput`.
- Ensure responsive behavior: header content and search must remain visible and usable on narrow viewports.

**Non-Goals:**
- Introducing new UI kit components or expanding `@dummy-products/ui-kit` API surface.
- Changing DummyJSON API integration, query parameters, or request cadence beyond existing debounce.
- Full redesign of the products table rows/cells beyond header/toolbar composition.

## Decisions

1. Compose header layout with semantic HTML + tokens; use UI kit for controls.
- Decision: Build the header container with `<header>` and layout classes/tokens, but render the search input via `@dummy-products/ui-kit/SearchInput`.
- Rationale: UI kit does not provide a layout/header component; using semantic HTML keeps structure explicit and testable while enforcing control consistency.
- Alternative: Build a custom search input to match Figma exactly. Rejected due to the explicit requirement to use UI kit components.

2. Keep existing search state machine; relocate the UI entry point.
- Decision: Keep `inputQuery` + `useDebouncedValue` + `navigate({ search })` logic unchanged; rebind it to the header search input.
- Rationale: Minimizes regression risk and ensures compliance with existing `web-products-search-and-create` requirements.
- Alternative: Replace debounce with component-internal debounce. Rejected due to behavior drift and reduced testability.

3. Keep other controls on UI kit components.
- Decision: Use `@dummy-products/ui-kit/Button` for actions and `@dummy-products/ui-kit/Pagination` for pagination controls.
- Rationale: Enforces the project-wide constraint and keeps visuals consistent.

## Risks / Trade-offs

- [Risk] UI kit `SearchInput` contract might not support exact pixel parity -> Mitigation: treat parity as token-level equivalence; adjust container spacing/typography rather than replacing the control.
- [Risk] Responsive layout regressions -> Mitigation: explicit flex/stack behavior in CSS classes and add tests for header presence + URL-sync behavior.
- [Risk] Over-reliance on inline styles -> Mitigation: prefer tokens via CSS variables; keep inline styles minimal and consistent with existing codebase.
