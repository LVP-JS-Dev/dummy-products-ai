# web-auth-session Spec

## MODIFIED Requirements

### Requirement: Login screen header SHALL render ui-kit Logo

The web app login screen header SHALL render the UI Kit `Logo` primitive rather than app-local placeholder assets, and SHALL follow the chosen accessibility mode (`decorative` vs labeled) consistently.

#### Scenario: Login screen renders Logo

- **WHEN** a user visits the login screen
- **THEN** the header includes the UI Kit `Logo` primitive

