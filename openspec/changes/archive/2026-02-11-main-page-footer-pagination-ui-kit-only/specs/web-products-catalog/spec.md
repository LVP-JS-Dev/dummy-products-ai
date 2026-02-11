# web-products-catalog - Footer Pagination (UI-kit Only Delta)

## MODIFIED Requirements

### Requirement: Products list SHALL support pagination via API parameters

The products screen SHALL support paginated loading from the products API using `limit` and `skip` (or equivalent) parameters. The products screen SHALL render pagination controls in a footer row under the table content and MUST implement those controls using the available `@dummy-products/ui-kit` pagination primitives (specifically `Pagination`, without custom next/prev/page button implementations).

#### Scenario: User navigates to next page

- **WHEN** a user requests the next page of products
- **THEN** the app requests products with updated pagination parameters and renders the new page results

#### Scenario: Loading indicator on page change

- **WHEN** the user changes the active page
- **THEN** a visible loading indicator is shown while the next page is being fetched

#### Scenario: Pagination is rendered in table footer area using UI-kit

- **WHEN** the products table is rendered
- **THEN** pagination controls are rendered in a footer row under the table content using `@dummy-products/ui-kit` `Pagination`

#### Scenario: Boundary page controls are disabled

- **WHEN** the active page is the first or last available page
- **THEN** the previous or next footer control is disabled accordingly
