# Web Products Catalog Pagination Delta

## MODIFIED Requirements

### Requirement: Products list SHALL support pagination via API parameters

The products screen SHALL support paginated loading from the products API using `limit` and `skip` (or equivalent) parameters, and SHALL provide UI controls to navigate pages.

The pagination controls used on this screen SHALL be rendered through the shared `Pagination` component exported by `@dummy-products/ui-kit`.

#### Scenario: User navigates to next page

- **WHEN** a user requests the next page of products
- **THEN** the app requests products with updated pagination parameters and renders the new page results

#### Scenario: Loading indicator on page change

- **WHEN** the user changes the active page
- **THEN** a visible loading indicator is shown while the next page is being fetched
