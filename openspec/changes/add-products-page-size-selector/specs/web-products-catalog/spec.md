# web-products-catalog Specification

## ADDED Requirements

### Requirement: Products footer SHALL include a page-size selector

The products screen SHALL provide a control in the table footer area that allows selecting the number of items per page (API `limit`).

#### Scenario: Reviewer checks footer controls

- **WHEN** the products table is rendered
- **THEN** the footer includes pagination controls and a page-size selector

### Requirement: Changing page size SHALL update API params deterministically

When the user changes page size, the products screen SHALL update the API `limit` and SHALL reset or clamp the active page deterministically, while preserving loading/disabled behavior.

#### Scenario: User increases page size

- **WHEN** a user changes page size from `10` to `50`
- **THEN** the next request uses `limit=50` and the active page is reset/clamped deterministically
