## ADDED Requirements

### Requirement: Products page SHALL render a dedicated main header with search
The products page SHALL render a dedicated header section that includes the page heading content and the primary search input used for product lookup.

#### Scenario: Header is visible on products page
- **WHEN** a user opens the products page
- **THEN** a dedicated header section is displayed above the products content area
- **AND** the section includes a visible search input for product search

### Requirement: Header search control SHALL preserve existing search behavior
The search input rendered in the main header SHALL use the same search behavior contract as the products search feature, including debounced query updates, API-backed search, and URL-restorable query state.

#### Scenario: User searches from header input
- **WHEN** a user enters a non-empty query in the header search input
- **THEN** the app performs product search using the existing API-backed and debounced behavior
- **AND** the query remains restorable via URL state

### Requirement: Header layout SHALL be responsive
The products page header SHALL adapt its layout for smaller viewports while preserving access to heading content and the primary search input.

#### Scenario: Mobile viewport layout
- **WHEN** the products page is rendered on a narrow/mobile viewport
- **THEN** the header layout reflows to avoid overlap or clipping
- **AND** the search input remains fully visible and usable
