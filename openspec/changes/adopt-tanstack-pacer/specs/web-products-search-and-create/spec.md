# web-products-search-and-create Specification

## ADDED Requirements

### Requirement: Pacer adoption decision SHALL be documented with boundaries

The web app utilities layer SHALL define whether TanStack Pacer is adopted, and SHALL document clear boundaries that prevent overlapping responsibility with React Query (when React Query is in use).

The decision record SHALL map current pain points (debounce, timeouts, retries, instrumentation) to explicit ownership:

- **Debounce**: Pacer owns debounced “intent” utilities (e.g., search input pacing) if adopted; otherwise app-local utilities own it.
- **Timeouts**: React Query owns request timeout behavior (via query/mutation configuration) when in use; otherwise app-local fetch utilities own it.
- **Retries**: React Query owns retry/backoff policy when in use; otherwise app-local utilities own it.
- **Instrumentation**: If adopted, Pacer MAY own lightweight pacing metrics hooks; otherwise “not applicable” with rationale.

Boundary statement: **Pacer handles global pacing/debounce utilities (if adopted), while React Query handles cache/refetch/retry semantics for server state**.

#### Scenario: Reviewer validates Pacer scope decision

- **WHEN** a reviewer inspects the change artifacts for TanStack Pacer
- **THEN** they can find a pain-point-to-capability mapping and an adopt/defer decision with boundaries

### Requirement: Debounced search intent SHALL avoid ad-hoc timer duplication

If TanStack Pacer is adopted for search intent, debounced search behavior SHALL be implemented through the shared utilities layer rather than per-component ad-hoc timers.

#### Scenario: User types quickly into search

- **WHEN** a user types multiple characters quickly into the search input
- **THEN** the app issues at most one search request per debounce window
- **AND** the debounced value remains URL-restorable
