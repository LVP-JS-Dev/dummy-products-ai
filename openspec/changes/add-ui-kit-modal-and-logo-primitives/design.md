# Design: UI Kit Modal + Logo

## Modal / Dialog

### Contract-first constraints

- Serializable props define visual and structural inputs (title text, description text, size variant, dismissibility).
- Runtime props define event handlers (`onClose`, `onBackdropPress`, etc), reflected in `manifest.json` events.

### Accessibility baseline

- `role="dialog"` + `aria-modal="true"`
- `aria-labelledby` and optional `aria-describedby`
- Escape to close (when dismissible)
- Focus trap / focus restore semantics

### Visual baseline

- Use UI-kit tokens for surface, border, radius, spacing.
- Provide size variants (e.g. `sm/md/lg`) as a contract enum.

## Logo

- Accepts a deterministic `variant` (e.g. `mark`, `lockup`) and `size`.
- Backed by a repo-local asset (svg/png) or UI-kit `Image` composition, but exposed as a stable UI-kit API.

## Migration plan (separate)

- Replace login placeholder icon with `Logo`.
- Replace products add-product modal with UI-kit `Modal`.

