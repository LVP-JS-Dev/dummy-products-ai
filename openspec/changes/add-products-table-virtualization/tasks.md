# Tasks: Add Products Table Virtualization

## 1. Spike

- [x] Establish target page sizes to evaluate (`10/20/50/100`)
- [x] Identify current bottlenecks (row count vs cell complexity)
- [x] Decide adopt vs defer and record decision in `design.md`

## 2. Implementation (only if adopted)

- [ ] Add `@tanstack/react-virtual` dependency to `apps/web` *(deferred; adoption not approved)*
- [ ] Virtualize products table body rows while preserving header/footer layout *(deferred; adoption not approved)*
- [ ] Preserve keyboard navigation and accessible reading order *(deferred; adoption not approved)*
- [ ] Add regression tests for basic rendering and interactions *(deferred; adoption not approved)*

## 3. Verification

- [x] Run `pnpm check` (not run; no implementation changes)
