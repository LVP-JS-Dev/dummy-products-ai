## ADDED Requirements

### Requirement: Add-product dialog SHALL use UI-kit Modal

The add-product dialog on the products screen SHALL be implemented using the `@dummy-products/ui-kit/Modal` primitive to provide consistent accessibility, focus handling, and close semantics.

#### Scenario: User opens the add-product dialog
- **WHEN** the user triggers the add-product action
- **THEN** the UI-kit `Modal` opens and contains the add-product form content

#### Scenario: User closes the add-product dialog
- **WHEN** the user activates the modal close control or dismiss action
- **THEN** the dialog closes using the UI-kit Modal close behavior
