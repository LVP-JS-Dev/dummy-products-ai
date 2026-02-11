# Tasks: Adopt TanStack Pacer

## 1. Spike

- [ ] List concrete pain points in current code (debounce, timeouts, retries, perf)
- [ ] Map each pain point to Pacer capability (or “not applicable”)
- [ ] Decide adopt vs defer and record decision in `design.md`

## 2. Implementation (only if adopted)

- [ ] Add Pacer dependency to `apps/web`
- [ ] Replace one isolated use-case first (e.g., debounced search intent)
- [ ] Verify no behavior regression and no duplicated responsibility with React Query

## 3. Verification

- [ ] Run `pnpm check`

