# UI Kit Modal

## ADDED Requirements

### Requirement: UI Kit SHALL expose a reusable Modal component
The UI Kit SHALL provide a public `Modal` (or `Dialog`) component suitable for product flows that require an accessible overlay dialog.

#### Scenario: Consumer renders modal
- **WHEN** a consumer renders `Modal` in an open state
- **THEN** it renders a dialog surface with accessible semantics and deterministic structure

### Requirement: Modal contract SHALL be schema-defined and event-driven
The `Modal` component SHALL define contract-first serializable props and runtime event handlers (e.g. close), and MUST be represented in generated schemas and `manifest.json`.

#### Scenario: Contract artifacts are generated
- **WHEN** UI-kit generation runs
- **THEN** `manifest.json` and JSON schema files include `Modal` props schema and event payload schema(s) as applicable

### Requirement: Modal interaction SHALL be accessible and deterministic
Modal SHALL support keyboard interaction (including Escape-to-close when dismissible), focus management, and programmatic labeling via `aria-labelledby` (and optional `aria-describedby`).

#### Scenario: User presses Escape
- **WHEN** the modal is dismissible and user presses Escape
- **THEN** the modal emits a close event and focus is restored deterministically

