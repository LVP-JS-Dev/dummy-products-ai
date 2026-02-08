## ADDED Requirements

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

### Requirement: Products table SHALL support sortable columns with stored sort state

The products screen SHALL allow sorting by supported columns (including price and rating), and SHALL store current sort state in application state for consistent re-render behavior.

#### Scenario: User sorts by price

- **WHEN** a user selects sorting by price
- **THEN** table rows are ordered by price according to selected direction and sort state is retained in screen state

#### Scenario: User changes sort field

- **WHEN** a user switches sorting from one supported field to another
- **THEN** the table updates ordering to match the active sort descriptor

### Requirement: Low ratings SHALL be visually highlighted

The products table SHALL render rating values below `3` in red.

#### Scenario: Product rating below threshold

- **WHEN** a product has rating value less than `3`
- **THEN** the rating cell is rendered with red text styling
