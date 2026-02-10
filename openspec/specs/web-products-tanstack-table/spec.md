# web-products-tanstack-table Specification

## Purpose

TBD - created by syncing change add-products-table-tanstack-table. Update Purpose after implementation.

## Requirements

### Requirement: Products table SHALL be powered by TanStack Table
The products screen SHALL construct and render the products table via `@tanstack/react-table` using declarative column definitions and TanStack row models as the table state engine.

#### Scenario: Products data is rendered through TanStack row model
- **WHEN** products data is loaded for the products screen
- **THEN** rows are rendered from the TanStack table row model and not from ad-hoc manual row iteration logic

### Requirement: TanStack sorting state SHALL integrate with persisted app sort policy
The products screen SHALL map persisted application sort state to TanStack sorting state and SHALL persist TanStack sort changes back to the existing app storage policy.

#### Scenario: Sort state is restored on page load
- **WHEN** a persisted sort descriptor exists in storage
- **THEN** the TanStack table initializes with the equivalent active sorting state

#### Scenario: User updates sort order
- **WHEN** a user toggles sort in a supported table column
- **THEN** the TanStack sorting state updates and the app persists the updated sort descriptor
