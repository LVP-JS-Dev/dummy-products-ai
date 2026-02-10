## MODIFIED Requirements

### Requirement: CSS token surface is provided

The UI kit SHALL provide a documented CSS token surface that exposes all public tokens as CSS variables.

Documentation for the CSS token surface SHALL include a complete reference of all public tokens, grouped by category (e.g., colors, typography, spacing, radius), and SHALL list each token’s CSS variable name, current value, and intended semantic meaning, with at least one usage example per group.

The token reference documentation SHALL be automatically generated from the CSS token entrypoint to ensure it stays in sync with the actual token surface.

#### Scenario: Tokens available via CSS entrypoint

- **WHEN** a consumer imports the UI kit token stylesheet
- **THEN** all public tokens are available as CSS variables for component styling

#### Scenario: Documentation lists all public tokens

- **WHEN** a reader opens the UI Kit token reference documentation
- **THEN** they can find every public token exposed by the CSS token entrypoint, grouped by category
- **AND** each listed token shows its CSS variable name and current value
