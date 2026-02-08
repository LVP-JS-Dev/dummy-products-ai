# Web Products Admin PRD Specification

## Purpose

Define normative PRD-level requirements for `apps/web` as a products-admin test application and keep consistency with monorepo architecture boundaries.

## Requirements

### Requirement: `apps/web` PRD SHALL define products-admin assignment scope

`apps/web` PRD SHALL define the application as a products-admin test task and SHALL include login and products workflows aligned with the assignment document (`/Users/leonidpetrov/Downloads/фронт React.pdf`).

#### Scenario: Scope reflects assignment intent

- **WHEN** a reviewer reads `/apps/web/PRD.md`
- **THEN** the primary goal is described as delivering assignment-required auth and product-management behavior
- **AND** the PRD is not framed as UI Kit demo-only scope

### Requirement: `apps/web` PRD SHALL include normative functional requirements

`apps/web` PRD SHALL define, at minimum, the following functional requirements:
- login form with required-field validation and API error handling
- remember-me persistence semantics (persistent vs session-lifetime token)
- products list loaded from API with loading progress indication
- sortable columns with stored sorting state
- add-product form with fields (name, price, vendor, SKU/article) and success toast
- rating `< 3` rendered in red
- product search via API

#### Scenario: Functional completeness is auditable

- **WHEN** a reviewer checks `/apps/web/PRD.md`
- **THEN** all assignment functional behaviors are listed as explicit requirements
- **AND** each behavior can be mapped to acceptance criteria/DoD

### Requirement: `apps/web` PRD SHALL define acceptance criteria and traceability

`apps/web` PRD SHALL include DoD criteria that cover functional behavior, visual parity with Figma structure, and TypeScript strictness expectations, plus a traceability mapping from assignment requirements to PRD sections.

#### Scenario: DoD can be used for objective acceptance

- **WHEN** implementation is reviewed
- **THEN** reviewers can validate each assignment requirement against the PRD DoD and traceability section

### Requirement: Root PRD SHALL avoid contradiction with `apps/web` external API usage

The root PRD SHALL preserve monorepo architecture boundaries while explicitly allowing `apps/web` to integrate external auth/products APIs required by the assignment.

#### Scenario: Root and app PRDs remain consistent

- **WHEN** a reviewer compares `/PRD.md` and `/apps/web/PRD.md`
- **THEN** there is no contradiction between global out-of-scope and assignment-required external API integration

### Requirement: UI Kit source-of-truth boundary SHALL remain intact

PRD alignment SHALL NOT reassign component contract ownership from `packages/ui-kit` to application-level PRDs.

#### Scenario: Architecture boundary is preserved

- **WHEN** PRD updates are completed
- **THEN** `apps/web` remains a consumer of `@dummy-products/ui-kit`
- **AND** no PRD states that app-level docs define component API contracts
