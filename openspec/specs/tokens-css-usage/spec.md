## ADDED Requirements

### Requirement: CSS token surface is provided
The UI kit SHALL provide a documented CSS token surface that exposes all public tokens as CSS variables.

#### Scenario: Tokens available via CSS entrypoint
- **WHEN** a consumer imports the UI kit token stylesheet
- **THEN** all public tokens are available as CSS variables for component styling

### Requirement: Components consume tokens only via CSS
The UI kit SHALL ensure components consume tokens through CSS variables or CSS classes derived from those variables, and SHALL NOT rely on direct JS/TS token modules for styling.

#### Scenario: Component styling uses CSS variables
- **WHEN** a UI kit component is styled
- **THEN** its styles reference CSS variables (not JS/TS token modules)

### Requirement: Linting enforces token usage boundary
The UI kit SHALL provide linting rules that fail when component code directly imports or uses token modules outside approved token definition or generation files.

#### Scenario: Prohibited token import in component code
- **WHEN** a UI kit component file imports token modules directly
- **THEN** linting reports an error and the check fails
