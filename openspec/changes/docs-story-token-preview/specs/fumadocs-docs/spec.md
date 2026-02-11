# Fumadocs Docs Token Story Preview Delta

## MODIFIED Requirements

### Requirement: Story files follow PRD naming for MDX imports

The documentation system SHALL place Story files under `apps/fumadocs/src/stories` using kebab-case `<name>.story.tsx` names that match MDX imports, including component pages and the generated design-tokens page.

#### Scenario: MDX story import resolves on case-sensitive filesystems

- **WHEN** an MDX page imports `@/stories/<name>.story`
- **THEN** the import resolves without case-sensitive filename mismatches

#### Scenario: Design tokens page imports token preview story

- **WHEN** token docs generation produces `design-tokens.mdx`
- **THEN** the page imports `WithControl` from `@/stories/design-tokens.story`
- **AND** the referenced file name matches the import casing exactly

## ADDED Requirements

### Requirement: Design tokens docs include interactive story preview

The design tokens documentation page SHALL render a dedicated interactive preview story in addition to generated token tables and static CSS usage examples.

#### Scenario: Reader accesses interactive token preview

- **WHEN** a reader opens `/docs/design-tokens`
- **THEN** the page includes an `Interactive` section
- **AND** the section renders the token preview `WithControl` story component

#### Scenario: Token docs regeneration preserves interactive section

- **WHEN** `pnpm docs:generate-tokens` regenerates `design-tokens.mdx`
- **THEN** the output includes the token preview story import and the interactive render block
- **AND** generated token tables for each group remain present
