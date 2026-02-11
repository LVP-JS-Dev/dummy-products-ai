# web-products-search-and-create Specification

## ADDED Requirements

### Requirement: Page-size selector SHALL apply in search mode
When a search query is active, the products screen SHALL apply the same page-size selector behavior to search requests, using the same footer control pattern.

#### Scenario: User changes page size during active search
- **WHEN** a user changes page size while `q` is non-empty
- **THEN** the next search request uses the updated `limit` and renders the correct page of results

