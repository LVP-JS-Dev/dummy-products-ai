## 1. Change and QA Scaffold

- [x] 1.1 Prepare parity artifact directories and a parity report template under the change folder.
- [x] 1.2 Add a reproducible browser capture workflow for component docs pages (Playwright-driven).
- [x] 1.3 Add Figma reference pull helper with retry/backoff and fallback-source marking.

## 2. Ralph Loop Round 1 (Baseline + Diagnose)

- [x] 2.1 Run Group A baseline checks (`Input`, `Button`, `Checkbox`, `Link`, `SearchInput`) and record findings.
- [x] 2.2 Run Group B baseline checks (`Card`, `Divider`, `Toast`, `Spinner`) and record findings.
- [x] 2.3 Run Group C baseline checks (`Image`, `Text`, `Icon`, `PageNumber`, `Pagination`) and record findings.
- [x] 2.4 Consolidate Round 1 baton notes and prioritize fixes by severity.

## 3. Implement Minimal Fixes

- [x] 3.1 Apply accessibility and behavior fixes discovered in Round 1 without breaking public API.
- [x] 3.2 Apply visual/token consistency fixes discovered in Round 1.
- [x] 3.3 Sync contracts/states/generated/docs/stories for any changed component behavior.

## 4. Ralph Loop Round 2 (Recheck)

- [x] 4.1 Re-run Group A captures and comparisons; mark pass/fail deltas.
- [x] 4.2 Re-run Group B captures and comparisons; mark pass/fail deltas.
- [x] 4.3 Re-run Group C captures and comparisons; mark pass/fail deltas.
- [x] 4.4 Finalize parity matrix and unresolved deviations (if any).

## 5. Validation and Closeout

- [x] 5.1 Run `pnpm -C packages/ui-kit gen` and `pnpm -C packages/ui-kit test`.
- [x] 5.2 Run `pnpm -C apps/web check-types` and `pnpm -C apps/fumadocs types:check`.
- [x] 5.3 Complete OpenSpec readiness check and mark all tasks done.
