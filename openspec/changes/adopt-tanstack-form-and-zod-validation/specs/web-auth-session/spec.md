# web-auth-session Spec

## ADDED Requirements

### Requirement: Login form state SHALL be modeled via TanStack Form
The web app login form SHOULD use `@tanstack/react-form` as the canonical mechanism for field state, submit lifecycle, and validation gating.

#### Scenario: Form submit lifecycle is deterministic
- **WHEN** a user submits valid credentials
- **THEN** the UI enters a submitting state, prevents duplicate submissions, and exits submitting state on completion

### Requirement: Login validation SHALL be defined via zod schema
The login form SHALL define required-field validation using a `zod` schema and SHALL display field-level errors and a form-level API error when applicable.

#### Scenario: Empty required fields
- **WHEN** a user submits without username or password
- **THEN** submission is blocked and required-field errors are displayed

