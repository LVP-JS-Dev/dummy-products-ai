# Tasks: Adopt TanStack Form + Zod Validation

## 1. Login Form

- [ ] Replace local `useState` fields with TanStack Form model
- [ ] Define zod schema for login credentials and required-field errors
- [ ] Preserve accessibility semantics (labels, `aria-describedby`, `role="alert"`)
- [ ] Update/extend login tests to assert submit lifecycle and errors

## 2. Add Product Modal

- [ ] Replace local field state with TanStack Form model
- [ ] Define zod schema for add-product payload and required fields
- [ ] Preserve modal focus management and keyboard behavior
- [ ] Update/extend add-product tests (validation + success toast)

## 3. PRD / Specs

- [ ] Update `apps/web/PRD.md` to document the standardized form stack (TanStack Form + zod)
- [ ] Update relevant OpenSpec capability specs (`web-auth-session`, `web-products-search-and-create`)

## 4. Verification

- [ ] Run `pnpm check`

