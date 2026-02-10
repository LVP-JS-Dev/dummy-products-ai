# UI Kit Pagination

## ADDED Requirements

### Requirement: UI Kit SHALL expose a reusable Pagination component
The UI Kit SHALL provide a public `Pagination` component that supports page navigation with previous/next actions and direct page selection.

#### Scenario: Consumer renders pagination with bounded page set
- **WHEN** a consumer renders `Pagination` with `currentPage` and `totalPages`
- **THEN** the component renders previous/next controls and visible numeric page buttons for the active window

### Requirement: Pagination contract SHALL be schema-defined and event-driven
The `Pagination` component SHALL define contract-first serializable props and event handlers, including `currentPage`, `totalPages`, optional `maxVisiblePages`, optional `disabled`, and a `pageChange` payload containing target page.

#### Scenario: Contract artifacts are generated
- **WHEN** UI-kit generation runs
- **THEN** `manifest.json` and JSON schema files include `Pagination` props schema and `pageChange` payload schema

### Requirement: Pagination interaction SHALL be accessible and deterministic
Pagination SHALL set `aria-current="page"` on the active page button, SHALL disable previous and next controls at boundaries, and SHALL emit `pageChange` only for valid target pages.

#### Scenario: User interacts at page boundaries
- **WHEN** the current page is the first or last page
- **THEN** the corresponding boundary control is disabled and no invalid page change event is emitted
