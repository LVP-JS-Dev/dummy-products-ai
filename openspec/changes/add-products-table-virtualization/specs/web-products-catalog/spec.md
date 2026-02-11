# web-products-catalog Specification

## ADDED Requirements

### Requirement: Products table virtualization decision SHALL be documented

The products table implementation SHALL either adopt row virtualization or explicitly document why virtualization is deferred for the supported page sizes.

The decision record SHALL include the evaluated page sizes (`10/20/50/100`) and a brief assessment of complexity and accessibility implications.

#### Scenario: Reviewer validates virtualization decision

- **WHEN** a reviewer inspects the change artifacts for virtualization
- **THEN** they can find a clear adopt/defer decision with rationale and the evaluated page sizes

### Requirement: Virtualized products table SHALL preserve semantics and interactions

If virtualization is adopted, the products table SHALL preserve header/footer layout, keyboard navigation, and accessible reading order while virtualizing only the table body rows.

#### Scenario: User navigates a virtualized products table

- **WHEN** the products table is rendered with virtualization enabled
- **THEN** header and pagination controls remain stable
- **AND** keyboard navigation and focus order remain deterministic
