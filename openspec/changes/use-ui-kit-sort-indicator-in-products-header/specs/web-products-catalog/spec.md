# MODIFIED Requirements

### Requirement: Products table SHALL support sortable columns with stored sort state

The products screen SHALL allow sorting by supported columns (including name, price, and rating), and SHALL store current sort state for consistent re-render behavior.

The products table header SHALL display the active sort direction indicator via the shared `SortIndicator` component exported by `@dummy-products/ui-kit`.

Sorting in v1 SHALL apply only to the currently loaded page of results (because results are paginated via API). This limitation SHALL be documented in the product UI/help text to avoid confusion.

#### Scenario: User sorts by price

- **WHEN** a user selects sorting by price
- **THEN** table rows are ordered by price according to selected direction and sort state is retained in screen state

#### Scenario: User changes sort field

- **WHEN** a user switches sorting from one supported field to another
- **THEN** the table updates ordering to match the active sort descriptor

#### Scenario: Sorting applies to current page only

- **WHEN** a user sorts products while viewing a paginated page of results
- **THEN** only the currently loaded page is re-ordered and the app does not claim global sorting across all pages

#### Scenario: Sorted column shows active direction indicator

- **WHEN** a sortable column is currently sorted ascending or descending
- **THEN** the corresponding header cell renders an active direction indicator via ui-kit `SortIndicator`
