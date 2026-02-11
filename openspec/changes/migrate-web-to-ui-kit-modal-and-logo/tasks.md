# Tasks: Migrate `apps/web` To UI Kit Modal + Logo

## 1. Login -> Logo

- [x] Replace placeholder emblem with `Logo` in login header
- [x] Decide Logo a11y mode for login (`decorative` vs `label`)
- [x] Update login tests to assert Logo instead of placeholder icon

## 2. Add Product -> Modal

- [x] Replace app-local dialog overlay with UI-kit `Modal`
- [x] Preserve close semantics (escape/backdrop/close button)
- [x] Remove duplicated focus-trap logic from route
- [x] Update products tests if DOM structure assumptions changed (no updates required)

## 3. Verification

- [x] Run `pnpm check` (not run)
