# Design: TanStack Pacer In This Repo

## Candidate Use Cases

- A single place for:
  - debounced “intent” events (search)
  - request timeouts/retries/backoff policies (if React Query is not sufficient)
  - lightweight performance instrumentation hooks

## Non-Goals

- Introducing another abstraction layer on top of React Query without concrete benefit.
- Fragmenting API behavior across multiple utility libraries.

## Decision Questions

- What does Pacer do that React Query + gen-api + small app utilities do not?
- Does it reduce complexity, or add another mental model?
- Can we keep its usage limited and consistent?

## Recommendation (current)

Start as a spike. Prefer adopting React Query + gen-api first; re-evaluate Pacer after.

## Spike Notes

### Pain Points (current code)

- Debounced search intent handled via `useDebouncedValue` in `apps/web/src/routes/products.tsx`.
- Manual request timeout logic in `apps/web/src/api/DummyJson.ts` (AbortController + timeout).
- Retry UX uses local `retryToken` state rather than a centralized policy.

### Mapping To Pacer Capabilities

- Debounced search intent: **applicable** (Pacer debounce utilities).
- Request timeouts: **applicable** (Pacer timeout controls), but overlaps with planned React Query policies.
- Retry behavior/backoff: **partially applicable** (Pacer scheduling), but we already plan to rely on React Query for retries.
- Perf instrumentation hooks: **not needed yet** (no concrete perf targets).

## Decision

Defer adoption for now.

## Rationale

- Current pain points are small and localized; existing utilities are sufficient.
- React Query adoption is the nearer-term priority for request concerns; adding Pacer now would duplicate responsibility.
- Revisit after React Query + gen-api integration if debouncing and timeout policies remain noisy.
