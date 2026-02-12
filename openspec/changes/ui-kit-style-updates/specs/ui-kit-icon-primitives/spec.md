## ADDED Requirements

### Requirement: Icon SHALL support token-driven color and fixed bounding box rendering
The UI kit `Icon` component SHALL render SVG assets inside a `24x24` bounding box by default, SHALL accept color via CSS token-driven styling, and SHALL render with transparent background and no border.

#### Scenario: Icon uses token-based color
- **WHEN** a consumer passes icon color through a CSS token variable
- **THEN** the icon foreground color is derived from that token value without hardcoded color literals in component styles

#### Scenario: Non-square SVG fits inside default box
- **WHEN** a non-square SVG is rendered without explicit width or height props
- **THEN** the longest SVG side is fitted to `24px`
- **AND** the rendered SVG remains centered on both axes inside the `24x24` icon box

#### Scenario: Icon container remains visually neutral
- **WHEN** the icon is rendered in any supported state
- **THEN** the icon container has transparent background and no border styles by default
