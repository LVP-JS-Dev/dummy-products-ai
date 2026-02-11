# Standardize Web API Client With gen-api + React Query

## Why

`apps/web` currently uses a hand-written `fetch` client and manual async state management. The repo already contains `packages/gen-api` with a generated DummyJSON client and React Query hooks, but `apps/web` does not consume it. Standardizing on a single API layer enables:

- consistent error typing and handling
- cancellation via `AbortSignal`
- caching/deduplication and predictable loading states
- less bespoke route-level async orchestration

## What Changes

- Use `@dummy-products/gen-api` in `apps/web` as the only DummyJSON client surface.
- Introduce `@tanstack/react-query` into `apps/web` runtime and wrap the router in `QueryClientProvider`.
- Centralize auth token injection via `configureDummyJsonApi` / `setDummyJsonAuthToken`.
- Keep existing UX semantics:
  - forced logout on 401
  - debounced search + URL `q` parameter
  - pagination via `limit`/`skip`

## Scope

### In scope

- Login: use generated `login` client or `useLogin` mutation
- Products list/search: use generated list/search clients and query hooks
- A small adapter that maps gen-api typed errors to UI-friendly messages

### Out of scope

- Backend changes
- Changing UI-kit contracts/states
- Introducing server-side rendering

## Capabilities

### Modified capabilities

- `web-auth-session`: specify how 401 handling maps to query/mutation errors
- `web-products-catalog`: specify loading/error behavior in query terms
- `web-products-search-and-create`: specify query key shape and debounced invalidation policy

## PRD impact

- [ ] Root PRD
- [ ] UI Kit PRD
- [ ] Docs PRD
- [x] Web PRD

