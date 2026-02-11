# Design: Page Size Selector

## UX Rules

- Options: `10`, `20`, `50` (exact values can be tuned, but must be deterministic).
- Default: `10` (matches current behavior).
- While data is loading, selector is disabled.

## State and Persistence

Two reasonable options:

1. URL-based: store `limit` in URL search params alongside `q` so the view is shareable/restorable.
2. Storage-based: persist `limit` in the same storage scope as auth session (local vs session), similar to sort.

Decision should be recorded in spec and tests.

## Edge Cases

- If page size increases such that current page becomes out of range, clamp to last page.
- Changing page size resets page to `1` (simplest, most predictable) unless explicitly required otherwise.

