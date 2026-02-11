# web-products-search-and-create Specification

## ADDED Requirements

### Requirement: Search server state SHALL be managed by React Query

The products search flow SHALL use `@tanstack/react-query` as the canonical server-state layer for search requests, preserving debounced input behavior and URL-restorable query state.

#### Scenario: URL query changes after debounce

- **WHEN** the debounced query value changes
- **THEN** the query key changes deterministically and the app fetches the new search results

### Requirement: Search API calls SHALL use generated gen-api client

The products search flow SHALL call DummyJSON search endpoints using `@dummy-products/gen-api` client functions (or generated React Query hooks).

#### Scenario: Search request is made

- **WHEN** a non-empty `q` is active
- **THEN** the app calls the generated search client and renders results in the same table
