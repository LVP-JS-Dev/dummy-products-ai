## ADDED Requirements

### Requirement: Products table UI SHALL compose available ui-kit primitives
The products screen SHALL use available `@dummy-products/ui-kit` primitives for table UI elements where they exist, including `Checkbox` for selection controls and `Icon` for iconography.

#### Scenario: Selection controls use ui-kit Checkbox
- **WHEN** a user views the products table
- **THEN** selection controls are rendered using `@dummy-products/ui-kit` `Checkbox`

#### Scenario: Iconography uses ui-kit Icon
- **WHEN** the products table shows icon-only affordances (e.g., refresh, add, row actions)
- **THEN** icons are rendered using `@dummy-products/ui-kit` `Icon` (directly or via composition)
