# CSS Token Usage Specification

## Purpose

Define the UI Kit token consumption boundary and the public CSS token surface contract so product code can safely style components and documentation can stay in sync with the source of truth.

## Definitions

**Public tokens**: Tokens exported in the UI kit public API, documented for external consumption, not marked as internal or experimental, and covered by semantic stability guarantees.

**Approved token definition or generation files**: JS/TS files allowed to define or generate token values for consumption in UI kit component code.

- `packages/ui-kit/src/Tokens.ts`

**CSS token entrypoint**: CSS file that exposes public tokens as variables for consumption by UI kit components and external consumers.

- `packages/ui-kit/src/tokens.css`

## Requirements

### Requirement: CSS token surface is provided

The UI kit SHALL provide a documented CSS token surface that exposes all public tokens as CSS variables.

#### Scenario: Tokens available via CSS entrypoint

- **WHEN** a consumer imports the UI kit token stylesheet
- **THEN** all public tokens are available as CSS variables for component styling

### Requirement: Components consume tokens only via CSS

The UI kit SHALL ensure components consume tokens through CSS variables (e.g. `var(--ui-color-text-primary)`) or CSS classes derived from those variables, and SHALL NOT rely on direct JS/TS token modules for styling.

#### Scenario: Component styling uses CSS variables

- **WHEN** a UI kit component is styled
- **THEN** its styles reference CSS variables (not JS/TS token modules)

### Requirement: Linting enforces token usage boundary

The UI kit SHALL provide linting rules that fail when component code directly imports or uses token modules outside approved token definition or generation files.

#### Scenario: Prohibited token import in component code

- **WHEN** a UI kit component file imports token modules directly
- **THEN** linting reports an error and the check fails
