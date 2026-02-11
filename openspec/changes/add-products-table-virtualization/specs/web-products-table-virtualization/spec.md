# Web Products Table Virtualization

## ADDED Requirements

### Requirement: Products table SHALL virtualize body rows using TanStack Virtual when enabled

When virtualization is adopted for the products table, the app SHALL render only the visible body rows using `@tanstack/react-virtual` while preserving the existing header and footer layout.

#### Scenario: User views a page with many rows

- **WHEN** the products table renders a page size at or above the configured virtualization threshold
- **THEN** only the visible body rows are mounted and rendered via TanStack Virtual

#### Scenario: Header and footer layout remain consistent

- **WHEN** the products table is virtualized
- **THEN** the header and footer pagination layout remains identical to the non-virtualized table

### Requirement: Virtualized table SHALL preserve keyboard navigation and reading order

Virtualized rendering SHALL maintain a consistent and accessible reading order that matches the non-virtualized table behavior, including keyboard navigation across rows and cells.

#### Scenario: User navigates rows with keyboard

- **WHEN** a user navigates the table using keyboard controls
- **THEN** focus order proceeds through the visible rows in the same order as the non-virtualized table
