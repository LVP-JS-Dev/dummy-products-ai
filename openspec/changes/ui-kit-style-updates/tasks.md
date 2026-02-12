## 1. Token And Contract Updates

- [x] 1.1 Add missing color tokens for secondary button border (`#ECECEB`), card styles (dark background and white border), and checkbox checked state (`#3C538E`).
- [x] 1.2 Add Roboto typography token to the UI-kit token source and expose it via public token CSS surface.
- [x] 1.3 Update UI-kit contracts for Button/Icon and any affected components so new variant/state requirements are represented in contract-first API.

## 2. Component Implementation

- [x] 2.1 Update Button implementation: default borderless style, new `secondary` variant, and new transparent borderless icon-oriented variant.
- [x] 2.2 Update Card implementation to apply token-driven dark background and `6px` white border.
- [x] 2.3 Update Checkbox checked state to use token-driven background color only and remove checkmark glyph rendering.
- [x] 2.4 Implement/update Icon component behavior for token-driven color, default `24x24` box, longest-side fit for non-square SVGs, and centered rendering.
- [x] 2.5 Update Search component to use the new approved icon asset from `apps/web/src/assets/icons`.
- [x] 2.6 Remove modal variant/state with disabled close button from UI-kit state surface and related component handling.

## 3. States, Generation, And Documentation

- [x] 3.1 Update `packages/ui-kit/src/states/*` for changed variants and remove deprecated modal no-close state.
- [x] 3.2 Regenerate UI-kit artifacts (`pnpm -C packages/ui-kit gen`) and ensure generated schemas/manifest are up to date.
- [x] 3.3 Update Fumadocs stories/MDX to reflect new button variants, icon behavior, modal states, and search icon rendering.

## 4. Validation

- [x] 4.1 Run `pnpm -C packages/ui-kit test` and fix regressions.
- [x] 4.2 Run root checks `pnpm gen`, `pnpm test`, and `pnpm check` and confirm green status.
- [x] 4.3 Verify no component style uses direct color/font literals where tokens are required.
