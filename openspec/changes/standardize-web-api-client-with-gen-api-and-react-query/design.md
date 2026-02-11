# Design: gen-api + React Query Integration

## Goals

- Treat DummyJSON as an external API behind a single client surface (`@dummy-products/gen-api`).
- React Query becomes the canonical server-state layer for `apps/web`.
- Forced logout on 401 remains deterministic and user-visible.

## Key Decisions

1. Query keys must encode:
   - endpoint (`/products` vs `/products/search`)
   - request params (`limit`, `skip`, and optionally `q`)
2. Search is debounced at the UI level; query execution follows URL state (`q`).
3. 401 is handled in one place (query/mutation error boundary or shared error adapter) and triggers:
   - clear auth session
   - clear sort/page-size prefs (if present)
   - redirect to `/login`

## Error Handling

- Prefer typed errors from gen-api (`ResponseErrorConfig<...>`) and map to user messages.
- Preserve existing behavior: show inline error container with retry for products.

## Open Questions

- Keep products route data fetching in the route component, or move to loader-like prefetch (TanStack Router supports preloading, but we should avoid overengineering).
- Whether to enable `staleTime` for list/search queries (likely low; correctness over caching).

