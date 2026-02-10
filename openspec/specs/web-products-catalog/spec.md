# web-products-catalog Specification

## Purpose

TBD - created by archiving change implement-dummyjson-auth-products-ui. Update Purpose after archive.

## Requirements

### Requirement: Products list SHALL load from DummyJSON with visible loading state

The products screen SHALL request product data from DummyJSON and SHALL show a visible progress/loading indicator while data is being fetched.

#### Scenario: Products request is in progress

- **WHEN** the products screen initiates a data fetch
- **THEN** a visible loading indicator is rendered until data resolves or fails

#### Scenario: Products request succeeds

- **WHEN** the products API returns product data
- **THEN** the products table renders the returned items

### Requirement: Products table SHALL expose assignment-required columns

The products table SHALL display columns that match the assignment/Figma structure for product management, including at minimum product name, price, vendor/brand, article/SKU, and rating.

#### Scenario: Reviewer checks table structure

- **WHEN** products data is rendered on the products screen
- **THEN** the table shows the required columns for name, price, vendor/brand, article/SKU, and rating

### Requirement: Product field mapping SHALL be deterministic

The app SHALL map DummyJSON product fields to table columns deterministically:
- name column uses `title`
- price column uses `price`
- vendor column uses `brand` (or `"-"` when missing)
- article/SKU column uses `sku` when present, otherwise uses `id`
- rating column uses `rating`

#### Scenario: Vendor field missing

- **WHEN** a product does not include a `brand` field
- **THEN** the vendor column renders `"-"` for that row

#### Scenario: SKU field missing

- **WHEN** a product does not include a `sku` field
- **THEN** the article/SKU column renders the product `id` for that row

### Requirement: Products table SHALL support sortable columns with stored sort state

The products screen SHALL allow sorting by supported columns (including name, price, and rating), and SHALL store current sort state for consistent re-render behavior.

Sorting in v1 SHALL apply only to the currently loaded page of results (because results are paginated via API). This limitation SHALL be documented in the product UI/help text to avoid confusion.

The sortable table state SHALL be implemented via TanStack Table sorting state and row model while preserving the existing user-facing sorting behavior.

#### Scenario: User sorts by price

- **WHEN** a user selects sorting by price
- **THEN** table rows are ordered by price according to selected direction and sort state is retained in screen state

#### Scenario: User changes sort field

- **WHEN** a user switches sorting from one supported field to another
- **THEN** the table updates ordering to match the active sort descriptor

#### Scenario: Sorting applies to current page only

- **WHEN** a user sorts products while viewing a paginated page of results
- **THEN** only the currently loaded page is re-ordered and the app does not claim global sorting across all pages

### Requirement: Sort state SHALL persist per remember-me policy

The app SHALL persist the active sort descriptor using the same storage policy as the auth session:
- use `localStorage` when remember-me is enabled
- use `sessionStorage` when remember-me is disabled

#### Scenario: Remember-me enabled persists sort across browser restart

- **WHEN** remember-me is enabled and a user sets a sort order
- **THEN** the sort order is restored after closing and reopening the browser

#### Scenario: Remember-me disabled does not persist sort across browser restart

- **WHEN** remember-me is disabled and a user sets a sort order
- **THEN** the sort order is not restored in a new browser session

### Requirement: Low ratings SHALL be visually highlighted

The products table SHALL render rating values below `3` in red.

#### Scenario: Product rating below threshold

- **WHEN** a product has rating value less than `3`
- **THEN** the rating cell is rendered with red text styling

### Requirement: Products list SHALL support pagination via API parameters

The products screen SHALL support paginated loading from the products API using `limit` and `skip` (or equivalent) parameters, and SHALL provide UI controls to navigate pages.

#### Scenario: User navigates to next page

- **WHEN** a user requests the next page of products
- **THEN** the app requests products with updated pagination parameters and renders the new page results

#### Scenario: Loading indicator on page change

- **WHEN** the user changes the active page
- **THEN** a visible loading indicator is shown while the next page is being fetched
