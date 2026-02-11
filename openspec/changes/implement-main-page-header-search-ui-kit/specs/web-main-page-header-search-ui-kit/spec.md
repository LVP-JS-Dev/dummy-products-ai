## ADDED Requirements

### Requirement: Products page SHALL render a dedicated main header with a UI kit search control
The products page SHALL render a dedicated header section that includes the page heading content and the primary search input used for product lookup, implemented using the available `@dummy-products/ui-kit/SearchInput` component.

#### Scenario: Header is visible on products page
- **WHEN** a user opens the products page
- **THEN** a dedicated header section is displayed above the products content area
- **AND** the section includes a visible primary search input

### Requirement: Header interactive controls SHALL use available UI kit components
All interactive controls introduced or modified by the products page header/toolbar composition SHALL be implemented using the available components from `@dummy-products/ui-kit`.

#### Scenario: Reviewer checks component usage
- **WHEN** a reviewer inspects the products page implementation
- **THEN** the search input uses `@dummy-products/ui-kit/SearchInput`
- **AND** action buttons use `@dummy-products/ui-kit/Button`
- **AND** pagination uses `@dummy-products/ui-kit/Pagination`

### Requirement: Header layout SHALL be responsive
The products page header SHALL adapt its layout for smaller viewports while preserving access to the page heading content and the primary search input.

#### Scenario: Mobile viewport layout
- **WHEN** the products page is rendered on a narrow/mobile viewport
- **THEN** the header layout reflows to avoid overlap or clipping
- **AND** the search input remains fully visible and usable
