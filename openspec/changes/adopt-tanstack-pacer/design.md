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

