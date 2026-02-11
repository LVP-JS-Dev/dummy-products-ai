# web-products-catalog Specification

## ADDED Requirements

### Requirement: Products server state SHALL be managed by React Query

The products screen SHOULD use `@tanstack/react-query` as the canonical server-state layer for list and pagination requests, including loading and error states.

#### Scenario: Products query is in-flight

- **WHEN** the products request is pending
- **THEN** the UI renders a visible loading/progress state and disables pagination controls

### Requirement: Products API calls SHALL use generated gen-api client

The products screen SHALL call DummyJSON products endpoints using `@dummy-products/gen-api` client functions (or generated React Query hooks), rather than app-local ad-hoc `fetch` wrappers.

#### Scenario: Reviewer inspects products client usage

- **WHEN** the products list is reviewed
- **THEN** the products request code path uses `@dummy-products/gen-api` as the only DummyJSON client surface
