# UI Kit Foundation Components Specification

## ADDED Requirements

### Requirement: UI Kit foundation surface SHALL include Modal and Logo primitives

The UI kit SHALL include `Modal` and `Logo` as foundation primitives when required by product flows, and SHALL document them via contracts, states, generated schemas, and docs.

#### Scenario: Consumer imports new primitives

- **WHEN** `Modal` and `Logo` are added to the UI kit
- **THEN** they are available via `@dummy-products/ui-kit` public exports and are documented in Fumadocs
