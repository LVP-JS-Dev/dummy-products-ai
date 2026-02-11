# web-products-search-and-create - Footer Pagination (Delta)

## MODIFIED Requirements

### Requirement: Search results SHALL support pagination

The products screen SHALL support paginated search results using API pagination parameters (e.g., `limit` and `skip`). When a search query is active, the screen SHALL use the same footer pagination pattern and shared UI-kit `Pagination` component as the default products list.

#### Scenario: User paginates search results

- **WHEN** a user navigates to the next page while a search query is active
- **THEN** the app requests the next page for the active query and renders the new page results

#### Scenario: Search mode uses shared footer pagination

- **WHEN** a non-empty search query is active and results are displayed
- **THEN** pagination controls are rendered in the footer area below the table content using the UI-kit `Pagination` component

#### Scenario: Boundary page controls are disabled in search mode

- **WHEN** search results are on the first or last available page
- **THEN** the previous or next footer control is disabled accordingly
