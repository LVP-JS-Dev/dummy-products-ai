## Why

The current Logo component does not match the Figma source of truth (wrapper effects, sizing, and SVG sizing), causing inconsistent branding across the app and docs. This change aligns the implementation with the approved design.

## What Changes

- Update the Logo wrapper to be a circular 52px × 52px container with the Figma-defined fill, stroke, and shadow effects.
- Ensure the SVG inside the Logo renders at 35px × 35px (with consistent centering).
- Keep the Logo as a contract-first UI-kit primitive (contracts → component → states → docs → apps).

## Capabilities

### New Capabilities

- `ui-kit-logo`: Defines the required public API and visual requirements for the UI-kit Logo primitive (wrapper size/effects + SVG sizing).

### Modified Capabilities

<!-- None -->

## Impact

- `packages/ui-kit`: Logo primitive contract/component/states and generated artifacts (schemas/manifest) will need regeneration.
- `apps/fumadocs` and `apps/web`: Consumers may need small updates if the Logo API or exported name changes (expected to be non-breaking).
