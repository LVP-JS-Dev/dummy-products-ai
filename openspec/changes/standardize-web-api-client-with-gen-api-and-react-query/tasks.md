# Tasks: Standardize Web API Client With gen-api + React Query

## 1. Runtime Setup

- [ ] Add `@tanstack/react-query` dependency to `apps/web`
- [ ] Create `QueryClient` and wire `QueryClientProvider` at the root route
- [ ] Add devtools only in dev (optional)

## 2. Auth Integration

- [ ] Wire auth token into gen-api config on login and clear on logout
- [ ] Replace direct `fetch` auth call with gen-api `login` client or `useLogin` mutation
- [ ] Ensure 401 triggers forced logout consistently

## 3. Products Queries

- [ ] Replace manual `useEffect` fetching with `useQuery` for list/search
- [ ] Preserve `q` in URL and debounced search behavior
- [ ] Preserve pagination (`limit`/`skip`) and boundary disabled behavior
- [ ] Preserve retry behavior in error UI

## 4. Decision Spike (size vs value)

- [ ] Document whether React Query is justified for current DummyJSON scale (`total=194`) and why we still choose it (consistency/tooling vs raw perf)

## 5. Verification

- [ ] Update tests to use query provider and deterministic async behavior
- [ ] Run `pnpm check`

