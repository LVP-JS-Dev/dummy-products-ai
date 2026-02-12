## MODIFIED Requirements

### Requirement: Button SHALL support child content composition
The `Button` component SHALL support rendering icon/content via children while preserving existing actionable semantics, disabled/loading behavior, and contract-first compatibility.

The component SHALL expose variant behavior that includes:
- a default variant with no border,
- a `secondary` variant with white background and `1px` border,
- a transparent borderless icon-oriented variant intended for icon-only actions.

#### Scenario: Button renders icon and text via children
- **WHEN** a consumer passes icon and text as child content
- **THEN** both are rendered in button layout and button interaction semantics remain intact

#### Scenario: Default button uses borderless style
- **WHEN** a consumer renders the default button variant
- **THEN** the computed border style is none

#### Scenario: Secondary button uses tokenized border color
- **WHEN** a consumer renders `secondary` button variant
- **THEN** the button uses a white background and `1px` border
- **AND** the border color value is resolved from a UI-kit token rather than a hardcoded color literal

#### Scenario: Icon button variant is transparent and borderless
- **WHEN** a consumer renders the icon-oriented button variant
- **THEN** the button renders with transparent background and no border for icon placement

### Requirement: Checkbox SHALL support label composition via children
The `Checkbox` component SHALL support optional label content passed as children and keep controlled checked behavior with change events.

For checked state rendering, the component SHALL change checkbox background to the tokenized color value matching `#3C538E` and SHALL NOT render an internal checkmark glyph.

#### Scenario: Checkbox with child label
- **WHEN** a consumer passes label text/node as children
- **THEN** checkbox and label render together as a single interactive labeled control

#### Scenario: Checked checkbox uses fill-only indicator
- **WHEN** checkbox state is checked
- **THEN** checkbox background changes to the token-driven checked color
- **AND** no visual checkmark icon is rendered inside the checkbox

### Requirement: Card SHALL provide reusable container composition primitives
The `Card` component SHALL provide a reusable content container and composition slots suitable for form and panel layouts.

The default card visual style SHALL use token-driven values equivalent to `#232323` for background color and `6px` solid white border.

#### Scenario: Card wraps login-like content
- **WHEN** a consumer composes a card with header/content/footer sections
- **THEN** card layout renders consistent container structure and spacing for form UI

#### Scenario: Card applies required border and background tokens
- **WHEN** a card is rendered with default style
- **THEN** card background and border values are resolved from UI-kit tokens
- **AND** effective styles match the required dark background and `6px` white border treatment

### Requirement: Foundation components SHALL use design-system tokens
All foundation components SHALL use design-system tokens for visual styling (including color, spacing, typography, border radius, and state styling) instead of hardcoded design values.

The token set SHALL include required values for updated button, card, and checkbox styles and SHALL include a Roboto typography token for component-level typography usage.

#### Scenario: Component styling is token-driven
- **WHEN** foundation components are implemented or updated
- **THEN** visual styles are derived from UI-kit token variables rather than hardcoded numeric or color literals

#### Scenario: Required token is missing
- **WHEN** a required visual primitive is not represented by existing tokens
- **THEN** the token set is extended in the design-system token source and component styles consume the new token

#### Scenario: New typography token is available
- **WHEN** a consumer references the Roboto typography token in UI-kit styles
- **THEN** the token resolves through the public token surface without direct hardcoded font family usage

## ADDED Requirements

### Requirement: UI kit modal states SHALL exclude no-close variant
The public modal state surface SHALL NOT include a variant where the close button is disabled or removed.

#### Scenario: Consumer inspects exported modal states
- **WHEN** a consumer imports modal states from the UI-kit public states API
- **THEN** no state variant exposes a disabled-close-button modal configuration

### Requirement: Search input SHALL use the current icon asset
The UI kit search input component SHALL use the current approved search icon asset from the shared icon source.

#### Scenario: Search input renders leading icon
- **WHEN** a consumer renders the search component in default state
- **THEN** the rendered icon corresponds to the current approved search icon asset and not the deprecated icon
