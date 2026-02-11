## ADDED Requirements

### Requirement: Login screen SHALL render the UI-kit Logo primitive

The login screen header area SHALL use `@dummy-products/ui-kit/Logo` in place of any placeholder emblem or custom icon.

#### Scenario: User opens the login screen
- **WHEN** the login screen renders its header area
- **THEN** the UI-kit `Logo` primitive is displayed as the brand emblem
