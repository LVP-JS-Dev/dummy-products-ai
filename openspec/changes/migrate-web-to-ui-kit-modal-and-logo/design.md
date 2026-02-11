# Design: Web Migration To Modal + Logo

## Login

- Replace the current header emblem with `Logo`.
- Keep layout and sizing consistent with existing Figma-aligned structure.
- Ensure screen readers get correct semantics:
  - decorative vs labeled Logo decision should be explicit in the component usage

## Add Product Modal

- Replace the app-local overlay + focus trap with UI-kit `Modal`.
- Map existing close behavior:
  - Escape/backdrop => `onClose({ reason })` should close when dismissible
  - Close button should close deterministically
- Keep form layout and buttons unchanged.

## Testing

- Update login UI tests to assert Logo presence instead of placeholder icon.
- Update products page tests (if any) to account for the UI-kit modal structure.

## ADR: Logo accessibility mode

**Goal**: make Logo usage on the login header consistent and testable.

**Allowed values**: `"decorative"` | `"labeled"`.

**Default**: `"decorative"` for the login header.

**Rule**:

- If mode is `"decorative"`, the login header Logo SHALL be treated as decorative (`aria-hidden`), and the page title/heading provides the accessible label for the screen.
- If mode is `"labeled"`, the login header Logo SHALL expose an accessible name (e.g. via `aria-label`) and MUST NOT be `aria-hidden`.

**Where decided**: this ADR is the source of truth for the login header Logo accessibility mode until implementation adds a dedicated app-level config.
