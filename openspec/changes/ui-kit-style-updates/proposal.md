## Why

Current UI kit visuals and component states do not match the updated design requirements, which causes inconsistency across docs and app screens. We need to align foundation components and token definitions now so future UI work stays contract-first and token-driven.

## What Changes

- Update `Button` variants: fix default variant border behavior, add a bordered white `secondary` variant, and add a transparent borderless icon-oriented variant.
- Extend UI kit token set with missing color and typography tokens required by the new component styles (including `#ECECEB`, white border token usage, and Roboto typography token).
- Update `Card` visual contract to use dark background (`#232323`) with a 6px white border using tokens.
- Update `Checkbox` checked state behavior to switch background color to `#3C538E` without rendering an internal checkmark glyph.
- Introduce/update a reusable `Icon` component contract to support token-driven color, 24px default sizing, non-square SVG fit/center behavior, and transparent/no-border container styling.
- Remove the `Modal` variant with disabled close button from the public state surface.
- Update `Search` component/icon usage to the new icon asset set.

## Capabilities

### New Capabilities
- `ui-kit-icon-primitives`: Define standardized UI kit icon component requirements for SVG sizing, fitting, centering, and token-driven color.

### Modified Capabilities
- `ui-kit-foundation-components`: Adjust foundation component requirements and states for button variants, card border/background, checkbox checked behavior, modal state surface, search icon updates, and token-only styling expectations.

## Impact

- Affected package: `packages/ui-kit` (contracts, components, states, tokens, generated artifacts).
- Affected consumers: `apps/fumadocs` stories/docs and `apps/web` component usage where variant/state names change.
- Requires regeneration of UI kit schemas/manifest and follow-up docs updates to keep generated and documented APIs in sync.
