## ADDED Requirements

### Requirement: UI Kit SHALL export foundation components from a single public API
The UI kit SHALL expose `Input`, `Button`, `Checkbox`, `Divider`, `Link`, `Text`, `Toast`, `Card`, `Spinner`, and `Image` from `packages/ui-kit/src/index.ts` so application code can consume a unified component surface.

#### Scenario: Consumer imports foundation components
- **WHEN** a consumer imports components from `@dummy-products/ui-kit`
- **THEN** all listed foundation components are available without internal-path imports

### Requirement: Input SHALL support start/end composition, label, errors, and password mode
The `Input` component SHALL support a leading adornment and trailing adornment rendered inside input bounds, optional label rendering, error visual state, error message text below the field, and password-type usage.

#### Scenario: Input renders with both adornments
- **WHEN** a consumer provides both start and end adornments with text value
- **THEN** adornments render inside the control bounds and text content does not overlap or escape adornment regions

#### Scenario: Input renders error state
- **WHEN** a consumer provides an error state and error text
- **THEN** the input border/error styling is rendered and the error text is shown below the control

#### Scenario: Input renders password mode
- **WHEN** a consumer sets input type to password
- **THEN** the control behaves as a password input while preserving label/error/adornment behavior

### Requirement: Button SHALL support child content composition
The `Button` component SHALL support rendering icon/content via children while preserving existing actionable semantics, disabled/loading behavior, and contract-first compatibility.

#### Scenario: Button renders icon and text via children
- **WHEN** a consumer passes icon and text as child content
- **THEN** both are rendered in button layout and button interaction semantics remain intact

### Requirement: Checkbox SHALL support label composition via children
The `Checkbox` component SHALL support optional label content passed as children and keep controlled checked behavior with change events.

#### Scenario: Checkbox with child label
- **WHEN** a consumer passes label text/node as children
- **THEN** checkbox and label render together as a single interactive labeled control

### Requirement: Divider SHALL support optional centered content
The `Divider` component SHALL render a horizontal separator and SHALL support optional centered text/content between line segments.

#### Scenario: Divider with text
- **WHEN** a consumer passes text content to divider
- **THEN** divider renders left/right line segments with centered text content

### Requirement: Link SHALL enforce safe external-link defaults
The `Link` component SHALL implement secure defaults for external links, including `rel="noopener noreferrer"` when opening in a new tab.

#### Scenario: External link with target blank
- **WHEN** a consumer renders a link with `target="_blank"`
- **THEN** rendered output includes safe `rel` attributes to prevent opener vulnerabilities

### Requirement: Text SHALL support typography tokens and polymorphic tag rendering
The `Text` component SHALL support UI typography token variants and SHALL allow selecting the rendered HTML tag through an optional `as` prop.

#### Scenario: Text rendered as heading tag
- **WHEN** a consumer sets `as="h2"` with a heading token
- **THEN** output uses an `h2` element and applies mapped heading typography styles

### Requirement: Toast SHALL support configurable screen placement
The toast system SHALL render notification cards and SHALL allow configuring display position through component props.

#### Scenario: Toaster position is configured
- **WHEN** a consumer mounts toast provider with a non-default position
- **THEN** emitted toast notifications appear in the configured screen position

### Requirement: Card SHALL provide reusable container composition primitives
The `Card` component SHALL provide a reusable content container and composition slots suitable for form and panel layouts.

#### Scenario: Card wraps login-like content
- **WHEN** a consumer composes a card with header/content/footer sections
- **THEN** card layout renders consistent container structure and spacing for form UI

### Requirement: Spinner SHALL expose loading indicator variants
The `Spinner` component SHALL provide an accessible visual loading indicator with configurable size and/or visual variant.

#### Scenario: Spinner in loading state
- **WHEN** a consumer renders spinner during async loading
- **THEN** spinner appears with configured size and communicates loading intent in accessible markup

### Requirement: Image SHALL apply frontend best-practice defaults
The `Image` component SHALL provide best-practice defaults for accessibility and performance, including explicit alt handling, lazy/async defaults for non-critical images, and layout-stability-friendly sizing behavior.

#### Scenario: Decorative image
- **WHEN** a consumer marks an image as decorative
- **THEN** rendered output uses decorative-accessibility semantics and does not announce redundant text

#### Scenario: Content image with intrinsic dimensions
- **WHEN** a consumer renders an image with intrinsic dimensions
- **THEN** image renders without avoidable layout shift and uses performance-oriented loading defaults unless explicitly overridden

### Requirement: Foundation components SHALL remain contract-first and schema-backed
All foundation components SHALL be represented in UI-kit contracts/states and generated schemas/manifest artifacts where applicable.

#### Scenario: Contract and generated artifacts are validated
- **WHEN** UI-kit generation and validation scripts run
- **THEN** schemas/manifest reflect the updated component surface and states validate against declared contracts

### Requirement: Foundation components SHALL use design-system tokens
All foundation components SHALL use design-system tokens for visual styling (including color, spacing, typography, border radius, and state styling) instead of hardcoded design values.

#### Scenario: Component styling is token-driven
- **WHEN** foundation components are implemented or updated
- **THEN** visual styles are derived from UI-kit token variables rather than hardcoded numeric or color literals

#### Scenario: Required token is missing
- **WHEN** a required visual primitive is not represented by existing tokens
- **THEN** the token set is extended in the design-system token source and component styles consume the new token
