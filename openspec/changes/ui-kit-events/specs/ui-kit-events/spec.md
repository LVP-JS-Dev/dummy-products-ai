## ADDED Requirements

### Requirement: Components SHALL publish an events specification
UI Kit SHALL provide a formal, machine-readable events specification for each interactive component.

#### Scenario: Agent discovers available events
- **WHEN** an agent reads `src/generated/manifest.json`
- **THEN** the agent can list each component’s supported event names

### Requirement: Serializable props SHALL remain schema/state compatible
Each component SHALL define a “serializable props” contract that:
- MUST be representable as JSON Schema
- MUST be the only shape used in `states`
- MUST NOT include functions, classes, React types, or side-effects

#### Scenario: States remain data-only
- **WHEN** `pnpm -C packages/ui-kit test` runs
- **THEN** each exported state validates against the component’s generated JSON Schema

### Requirement: Runtime props SHALL extend serializable props with handlers
React components SHALL accept runtime props that extend serializable props with event handlers.

#### Scenario: Product can wire handlers
- **WHEN** a product integrates a component
- **THEN** it can pass an `on*` handler for any declared event

### Requirement: Events MAY declare payload schemas
Events MAY define a payload schema that is generated and referenced from the manifest.

#### Scenario: Agent validates event payload
- **WHEN** an agent wants to emit an event payload
- **THEN** it can validate the payload against the event’s payload schema (if present)

### Requirement: Generated artifacts SHALL be no-drift
Generated artifacts (`src/generated/**`) SHALL be deterministic and committed, and the repository SHALL detect drift.

#### Scenario: Drift is detected
- **WHEN** generated files differ from the expected output for current contracts
- **THEN** `pnpm check` fails
