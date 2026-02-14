# E2E FR Coverage Improvements (FR-1..FR-7)

## Context
We need formal verification coverage for FR-1..FR-7 and to close gaps in existing E2E tests. Changes must be non-UX impacting and limited to testability attributes.

## Decision
Apply minimal `data-testid` attributes for stability and extend existing Playwright specs to cover missing FR items.

## Approach Options
1. **Minimal test updates + targeted `data-testid`** (chosen)
2. Test-only changes without new selectors
3. Broader refactor with Page Objects

## Proposed Design
### Architecture
- Add a small set of `data-testid` attributes to UI for stable selection.
- Update existing Playwright tests (Auth + Products) to cover FR-2/3/4/5 gaps.

### Components/UI
- Progress indicator: add explicit test IDs for loading state.
- Toast: add test ID on success toast container.
- Add-product modal: add test ID and close-state assertion support.
- Sortable headers: add test IDs or stable roles for sorting assertions.

### Test Plan
- FR-2: assert `dummy-products.auth` stored in `localStorage` when remember me is ON and in `sessionStorage` when OFF.
- FR-3: assert loading indicator is visible during delayed fetch and resolves after data render.
- FR-4: assert sort state persists after page reload.
- FR-5: assert modal closes after successful add.

### Error Handling
- No behavioral or UX change; only non-user-visible attributes.

### Testing
- Run Playwright E2E tests and ensure deterministic results.

## Acceptance Criteria
- E2E tests cover FR-1..FR-7 with no partial gaps.
- Only non-UX attributes added.
- Tests pass locally.
