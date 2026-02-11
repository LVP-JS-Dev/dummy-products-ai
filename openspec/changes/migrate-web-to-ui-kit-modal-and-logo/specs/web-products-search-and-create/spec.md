# web-products-search-and-create Specification

## MODIFIED Requirements

### Requirement: Add-product dialog SHALL use ui-kit Modal

The add-product flow SHALL render its dialog surface via the UI Kit `Modal` primitive rather than an app-local overlay implementation, while preserving close semantics and focus management behavior.

#### Scenario: User opens add-product dialog

- **WHEN** a user triggers the add-product action
- **THEN** the UI Kit `Modal` opens and focus is moved inside the dialog

#### Scenario: User dismisses add-product dialog

- **WHEN** the dialog is dismissible and the user presses Escape or clicks the backdrop
- **THEN** the dialog closes and focus is restored deterministically

