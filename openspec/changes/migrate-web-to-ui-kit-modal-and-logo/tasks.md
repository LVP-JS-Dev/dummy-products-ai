# Tasks: Migrate `apps/web` To UI Kit Modal + Logo

## 1. Login -> Logo

- [ ] Replace placeholder emblem with `Logo` in login header
- [ ] Decide Logo a11y mode for login (`decorative` vs `label`)
- [ ] Update login tests to assert Logo instead of placeholder icon

## 2. Add Product -> Modal

- [ ] Replace app-local dialog overlay with UI-kit `Modal`
- [ ] Preserve close semantics (escape/backdrop/close button)
- [ ] Remove duplicated focus-trap logic from route
- [ ] Update products tests if DOM structure assumptions changed

## 3. Verification

- [ ] Run `pnpm check`

