# UI Kit SortIndicator

## ADDED Requirements

### Requirement: UI Kit SHALL expose a reusable SortIndicator component

The UI Kit SHALL provide a public `SortIndicator` component that can be used to render the current sort direction in sortable UIs.

#### Scenario: Consumer renders SortIndicator

- **WHEN** a consumer renders `SortIndicator`
- **THEN** the component renders deterministically according to its `direction` prop

### Requirement: SortIndicator contract SHALL be schema-defined and generated

The `SortIndicator` component SHALL define contract-first serializable props and SHALL appear in `src/generated/manifest.json` and generated JSON schema files.

#### Scenario: Contract artifacts are generated

- **WHEN** ui-kit generation runs
- **THEN** the generated manifest and schemas include the `SortIndicator` props schema

### Requirement: SortIndicator rendering SHALL be deterministic

The `SortIndicator` component SHALL use existing ui-kit icon assets to render direction:
- `direction="asc"` renders a caret rotated to indicate ascending
- `direction="desc"` renders a caret rotated to indicate descending
- missing `direction` renders nothing

#### Scenario: Ascending direction

- **WHEN** `SortIndicator` is rendered with `direction="asc"`
- **THEN** an ascending direction indicator is visible

#### Scenario: Descending direction

- **WHEN** `SortIndicator` is rendered with `direction="desc"`
- **THEN** a descending direction indicator is visible

#### Scenario: No direction

- **WHEN** `SortIndicator` is rendered without `direction`
- **THEN** the component renders nothing
