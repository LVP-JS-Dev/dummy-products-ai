# web-products-search-and-create Specification

## ADDED Requirements

### Requirement: Add-product form state SHALL be modeled via TanStack Form
The add-product modal form SHOULD use `@tanstack/react-form` as the canonical mechanism for field state, submit lifecycle, and validation gating.

#### Scenario: Validation blocks submission
- **WHEN** required fields are missing or invalid
- **THEN** the form blocks submission and shows validation errors

### Requirement: Add-product validation SHALL be defined via zod schema
The add-product form SHALL define required-field and value validation rules using a `zod` schema, including price numeric validation.

#### Scenario: Price is invalid
- **WHEN** a user enters a non-numeric or non-positive price
- **THEN** the form shows a validation error and blocks submission

