# Tasks: Adopt TanStack Pacer

## 1. Spike

- [x] List concrete pain points in current code (debounce, timeouts, retries, perf)
- [x] Map each pain point to Pacer capability (or “not applicable”)
- [x] Decide adopt vs defer and record decision in `design.md`

## 2. Implementation (only if adopted)

- [ ] Add Pacer dependency to `apps/web` (deferred; adoption not approved)
- [ ] Replace one isolated use-case first (e.g., debounced search intent) (deferred; adoption not approved)
- [ ] Verify no behavior regression and no duplicated responsibility with React Query (deferred; adoption not approved)

## 3. Verification

- [ ] Run `pnpm check`
