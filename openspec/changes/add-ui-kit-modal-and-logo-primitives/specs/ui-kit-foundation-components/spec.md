# UI Kit Foundation Components Specification

## ADDED Requirements

### Requirement: UI Kit foundation surface SHALL include Modal and Logo primitives

The UI kit SHALL include `Modal` and `Logo` as foundation primitives when inclusion meets the `ModalLogoRequirementChecklist` below, and SHALL document them via contracts, states, generated schemas, and docs.

**ModalLogoRequirementChecklist**

- `Modal` inclusion is required when a product flow needs: focus trap + focus restore, Escape/backdrop close semantics, and deterministic a11y labeling (`role="dialog"`, `aria-modal`, `aria-labelledby`).
- `Logo` inclusion is required when product surfaces need a stable brand mark/lockup that is reusable across apps and docs and is Figma-aligned.

#### Scenario: Consumer imports new primitives

- **WHEN** `Modal` and `Logo` are added to the UI kit
- **THEN** they are available via `@dummy-products/ui-kit` public exports and are documented in Fumadocs
