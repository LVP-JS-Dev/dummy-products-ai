# Products Header SortIndicator Integration Design

## Context

`apps/web` renders a products table powered by TanStack Table. The header currently indicates sort direction with local arrow rendering logic. A minimal shared ui-kit component `SortIndicator` will centralize this visual primitive.

Constraints:
- Sorting behavior and persistence MUST remain unchanged (TanStack state + existing `saveSort/loadSort`).
- Accessibility MUST remain intact (`<thead>/<th>`, `aria-sort`, keyboard-activatable sorting button).
- ui-kit `Button` is not suitable for compact table header controls (only `variant: blue`, large padding/background). This change does not attempt to expand it.

## Goals / Non-Goals

**Goals:**
- Replace ad-hoc sort arrow rendering in the products table header with ui-kit `SortIndicator`.
- Keep existing header interaction and TanStack integration intact.
- Add targeted tests that confirm the indicator renders in sorted states.

**Non-Goals:**
- Moving the whole table header into ui-kit.
- Changing sort logic, supported sortable columns, or persistence rules.
- Adding new ui-kit button variants.

## Decisions

1. Render sort indicator via `SortIndicator`.
- Rationale: satisfies mandatory ui-kit usage for this repeated visual primitive and reduces duplication.

2. Keep native `<button>` in the header.
- Rationale: existing ui-kit `Button` contract/styling is not compatible with table header sizing.

3. Keep `aria-sort` semantics on `<th>` and do not add additional focus wrappers.
- Rationale: preserves accessibility and current behavior.

## Risks / Trade-offs

- [Risk] Minor visual differences because `SortIndicator` uses rotated caret icon -> Mitigation: keep size/color explicit in the header and verify in browser.

## Migration Plan

1. Update header component to import and render `SortIndicator`.
2. Update tests to assert indicator presence via SVG rendering, without snapshotting SVG content.
3. Run targeted `apps/web` checks and browser verification.
