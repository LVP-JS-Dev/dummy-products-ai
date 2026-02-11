# Tasks: Add Products Table Virtualization

## 1. Spike

- [ ] Establish target page sizes to evaluate (`10/20/50/100`)
- [ ] Identify current bottlenecks (row count vs cell complexity)
- [ ] Decide adopt vs defer and record decision in `design.md`

## 2. Implementation (only if adopted)

- [ ] Add `@tanstack/react-virtual` dependency to `apps/web`
- [ ] Virtualize products table body rows while preserving header/footer layout
- [ ] Preserve keyboard navigation and accessible reading order
- [ ] Add regression tests for basic rendering and interactions

## 3. Verification

- [ ] Run `pnpm check`

