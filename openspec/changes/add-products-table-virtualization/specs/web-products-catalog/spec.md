# web-products-catalog Specification

## ADR: Products Table Virtualization

**Decision locus**: this ADR section (plus supporting detail in `openspec/changes/add-products-table-virtualization/design.md`).

**Status**: Pending implementation spike.

### Evaluated page sizes (target)

| Page size | Complexity assessment | Accessibility assessment |
| --- | --- | --- |
| 10 | Low; no expected benefit | Low risk; standard table semantics |
| 20 | Low; likely no benefit | Low risk; standard table semantics |
| 50 | Medium; may help if cells become heavier | Medium risk; ensure focus order remains stable |
| 100 | Medium/High; likely the first size where virtualization could matter | Medium/High risk; validate SR reading order + keyboard navigation |

### Minimal a11y checklist (if adopted)

- Keyboard navigation works across rows/cells with predictable focus order
- Screen reader announces headers/row context without losing semantics
- Focus trap is not introduced; focus remains within the page and restores predictably after interactions

## ADDED Requirements

### Requirement: Products table virtualization decision SHALL be documented

The products table SHALL adopt row virtualization for supported page sizes.

If virtualization is deferred for any supported page size, the deferral MUST be explicitly documented with justification and a timeline for re-evaluation.

The decision record SHALL include the evaluated page sizes (`10/20/50/100`) and a brief assessment of complexity and accessibility implications.

#### Scenario: Reviewer validates virtualization decision

- **WHEN** a reviewer inspects the change artifacts for virtualization
- **THEN** they can find a clear adopt/defer decision with rationale and the evaluated page sizes

### Requirement: Virtualized products table SHALL preserve semantics and interactions

If virtualization is adopted, the products table SHALL preserve header/footer layout, keyboard navigation, and accessible reading order while virtualizing only the table body rows.

#### Scenario: User navigates a virtualized products table

- **WHEN** the products table is rendered with virtualization enabled
- **THEN** header and pagination controls remain stable
- **AND** keyboard navigation and focus order remain deterministic
