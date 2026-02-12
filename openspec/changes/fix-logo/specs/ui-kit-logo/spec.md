## ADDED Requirements

### Requirement: UI Kit SHALL export a Logo foundation primitive
The UI kit SHALL export `Logo` from `@dummy-products/ui-kit` as a contract-first component with matching contract, states, and generated artifacts.

#### Scenario: Consumer imports Logo from UI kit
- **WHEN** a consumer imports `{ Logo }` from `@dummy-products/ui-kit`
- **THEN** the import resolves without internal-path imports and the component renders successfully

### Requirement: Logo SHALL render as wrapper + mark SVG with Figma-defined default sizing
The `Logo` component SHALL render:
- A circular wrapper sized `52px × 52px` by default
- A centered mark SVG sized `35px × 35px` by default

#### Scenario: Default Logo rendering
- **WHEN** `Logo` is rendered with no `size` prop
- **THEN** the wrapper renders at `52px × 52px` and the inner mark renders at `35px × 35px`, centered

### Requirement: Logo size prop SHALL scale wrapper and mark proportionally
When `size` is provided, it SHALL set the wrapper width/height. The mark size SHALL scale proportionally so that at `size=52` the mark is `35`, preserving the design ratio.

#### Scenario: Custom Logo size
- **WHEN** `Logo` is rendered with `size=104`
- **THEN** the wrapper renders at `104px × 104px` and the inner mark scales proportionally (≈`70px × 70px`) and remains centered

### Requirement: Logo wrapper SHALL match Figma effects
The wrapper SHALL visually match the Figma-defined effects:
- Base fill: solid surface
- Fill overlay gradient: vertical, transitioning from 0% to ~6% opacity of the text color (starting around 50% down)
- Stroke: 1px inside-like border with a vertical gradient that fades from ~70% opacity at the top to 0% around 70% down
- Shadows: a subtle outer white “spread” and a low-opacity drop shadow (`0 12px 8px` at ~3% black)

#### Scenario: Wrapper effects are applied
- **WHEN** `Logo` is rendered
- **THEN** the wrapper shows the fill overlay, gradient stroke, and both shadow effects per the design

### Requirement: Logo SHALL preserve accessibility semantics
The `Logo` component SHALL support both decorative and labeled usage:
- If `decorative` is true, it SHALL render with `aria-hidden="true"` and no required label.
- Otherwise it SHALL render as an image role with an accessible label derived from `label` (defaulting to a non-empty string).

#### Scenario: Decorative logo
- **WHEN** `Logo` is rendered with `decorative={true}`
- **THEN** the rendered output has `aria-hidden="true"` and does not require a label for accessibility

#### Scenario: Non-decorative logo with label
- **WHEN** `Logo` is rendered with `decorative={false}` and `label="Dummy Products"`
- **THEN** assistive technology can access the logo with the label "Dummy Products"

### Requirement: className and style SHALL apply to the wrapper container
`className` and `style` props SHALL be applied to the wrapper container element rather than the inner SVG mark.

#### Scenario: Wrapper styling passthrough
- **WHEN** `Logo` is rendered with `className="my-logo"` and inline styles
- **THEN** the wrapper element receives the class and styles, and the inner SVG sizing remains governed by the Logo sizing rules
