# Design: TanStack Form + Zod In `apps/web`

## Goals

- One consistent form state model for login and add-product.
- Zod schemas define field constraints and error messages.
- Keep UI-kit boundary: UI-kit provides inputs/buttons; app owns form wiring and business rules.

## Key Decisions

1. Zod schemas live in `apps/web` domain or feature folder, not in UI kit.
2. Form-to-UI mapping uses UI-kit runtime handlers (`onValueChange`, `onPress`, etc).
3. Server/API errors map to a single form-level error slot (plus optional field-level mapping when available).

## UX / States

Login:
- `idle`: submit enabled
- `invalid`: field errors shown, submit blocked
- `submitting`: submit disabled, loading state visible
- `apiError`: form-level error visible, retry path preserved

Add product:
- `idle`: submit enabled
- `invalid`: field errors shown, submit blocked
- `submitting`: optional (local-only flow can still use a short submitting state for consistency)
- `success`: toast shown and modal closes

## Integration Notes

- TanStack Form should not leak into UI-kit contracts/states.
- Validation messages should remain stable and testable.

