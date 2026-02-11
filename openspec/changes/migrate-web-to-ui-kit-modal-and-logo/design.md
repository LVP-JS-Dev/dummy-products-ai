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

