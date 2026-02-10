# UI-Kit Pagination Tasks

## 1. UI-Kit Pagination Contract and Component

- [x] 1.1 Add `PaginationContract` with controlled props (`currentPage`, `totalPages`, optional `maxVisiblePages`, optional `disabled`) and `pageChange` event payload.
- [x] 1.2 Implement `Pagination` component in `packages/ui-kit/src/components` with previous/next controls, numeric page window logic, and boundary clamping.
- [x] 1.3 Export `Pagination` and `PaginationProps` via `packages/ui-kit/src/index.ts`, and register contract/state exports in `contracts/index.ts` and `states/index.ts`.
- [x] 1.4 Add `PaginationStates` with at least three representative states to satisfy UI-kit state validation rules.

## 2. Generated Artifacts and Documentation

- [x] 2.1 Update UI-kit generation and validation scripts (`scripts/Gen.ts`, `scripts/Test.ts`) to include `Pagination` schemas and manifest entries.
- [x] 2.2 Run `pnpm -C packages/ui-kit gen` and verify generated files include pagination props/event schemas.
- [x] 2.3 Add fumadocs story and component docs page for `Pagination`, including links to generated schema/manifest artifacts.

## 3. Web Integration and Behavior Validation

- [x] 3.1 Replace products-page ad-hoc page-number controls with `Pagination` from `@dummy-products/ui-kit` while preserving existing API pagination flow (`limit`/`skip`).
- [x] 3.2 Add TDD tests for pagination behaviors (active page marking, next/previous boundaries, and `onPageChange` payload correctness).
- [x] 3.3 Add Playwright-based interaction validation for pagination flow in a running UI surface (products page and/or docs story) to confirm boundary behavior and click-driven page changes.

## 4. Final Verification

- [x] 4.1 Run `pnpm -C packages/ui-kit test` and relevant `apps/web`/`apps/fumadocs` type and test checks to confirm no regressions.
- [x] 4.2 Compare implementation against Figma node `1:451`, document intentional deviations, and ensure accessibility semantics (`aria-current`, disabled states, control labels) remain correct.
