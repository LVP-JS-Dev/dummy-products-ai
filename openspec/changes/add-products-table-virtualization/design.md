# Design: TanStack Virtual For Products Table

## Decision Criteria

Virtualization SHOULD be adopted only if one or more are true:

- Page size selector introduces larger page sizes where rendering becomes measurably slower.
- The table grows additional heavy cells (images, actions, rich formatting) that increase per-row cost.
- We want to demonstrate senior-level performance considerations as part of the portfolio narrative.

If none of the above are true for `limit <= 50`, virtualization is likely unnecessary complexity.

## Integration Options

1. Virtualize only the `tbody` rows
- Keep `thead` and footer pagination unchanged.
- Maintain current table semantics as much as possible.

2. Replace `<table>` with div-based grid layout
- Higher control, easier virtualization.
- Higher risk of a11y and styling regressions.

Preferred starting point: option 1.

## Risks

- Table semantics + virtualization can be tricky; need to avoid broken focus order and layout glitches.
- Testing becomes harder if DOM structure differs from a classic table.

## Decision

Defer adoption for now.

## Rationale

- Target page sizes for evaluation: `10/20/50/100`.
- Current UI renders a simple table with lightweight cells (text, checkbox, icons) and a fixed default page size of `10`.
- There is no evidence of render bottlenecks at `<= 50` rows given the current column complexity.

Revisit once a page-size selector increases default limits or the table adds heavier cell content (images, rich actions).
