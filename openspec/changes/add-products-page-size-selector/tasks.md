# Tasks: Add Products Page Size Selector

## 1. Specs / PRD

- [ ] Update `apps/web/PRD.md` (`FR-3`, `FR-7`) to require a footer page-size selector
- [ ] Update OpenSpec capability specs for catalog + search modes
- [ ] Decide persistence policy (URL vs storage) and document it

## 2. UI

- [ ] Add selector UI to products footer (next to pagination and page label)
- [ ] Disable selector while loading

## 3. Data wiring

- [ ] Update API requests to use selected `limit`
- [ ] Update `totalPages` math to use returned `limit`
- [ ] Clamp/reset `page` on page-size change

## 4. Verification

- [ ] Add tests for page-size changes affecting API params and page clamping
- [ ] Run `pnpm check`

