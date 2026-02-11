# fumadocs-docs Specification

## Purpose

Define repository-wide documentation conventions for `apps/fumadocs` so UI Kit component docs are consistent, traceable, and build reliably (including on case-sensitive filesystems).

## Requirements

### Requirement: Story files SHALL follow PRD naming for MDX imports

The documentation system SHALL place Story files under `apps/fumadocs/src/stories` using kebab-case `<component>.story.tsx` names that match MDX imports.

#### Scenario: MDX story import resolves on case-sensitive filesystems

- **WHEN** an MDX page imports `@/stories/<component>.story`
- **THEN** the import resolves without case-sensitive filename mismatches

### Requirement: Component API sections SHALL link to manifest and schema

Each component MDX page SHALL include links to the UI Kit manifest and the component's schema JSON in the API section.

#### Scenario: Reader can reach spec sources from API section

- **WHEN** a reader views a component API section
- **THEN** they can navigate to `packages/ui-kit/src/generated/manifest.json` and the component schema JSON

### Requirement: Docs SHALL cover all public UI Kit components

The documentation SHALL provide an MDX page for every public component exported from `@dummy-products/ui-kit`.

#### Scenario: Adding a new public component requires a doc page

- **WHEN** a new component is exported publicly from the UI Kit
- **THEN** a corresponding MDX page is required for the docs to be considered complete
