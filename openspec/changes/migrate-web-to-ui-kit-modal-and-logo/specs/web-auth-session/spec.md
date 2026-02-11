# web-auth-session Spec

## MODIFIED Requirements

### Requirement: Login screen header SHALL render ui-kit Logo

The web app login screen header SHALL render the UI Kit `Logo` primitive rather than app-local placeholder assets.

**Logo accessibility mode decision record**: `openspec/changes/migrate-web-to-ui-kit-modal-and-logo/design.md` (“ADR: Logo accessibility mode”).

Allowed values are `"decorative"` and `"labeled"`. The login header SHALL default to `"decorative"` unless the decision record specifies otherwise, and any decision-record-specified value MUST be applied consistently.

#### Scenario: Login screen renders Logo

- **WHEN** a user visits the login screen
- **THEN** the header includes the UI Kit `Logo` primitive
