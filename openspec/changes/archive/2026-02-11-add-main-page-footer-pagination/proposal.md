# Main Page Footer Pagination

## Why

On the products page, pagination must live in the footer area below the table content and match the UI-kit look and behavior to align with the assignment/Figma and keep navigation consistent across modes. This is formalized as a spec-level requirement so implementation and verification are unambiguous.

## What Changes

- Clarify the products catalog requirements: pagination renders in the footer under the products table and uses the UI-kit `Pagination` component.
- Clarify the products search requirements: when search is active, the same footer pagination block and the same accessibility/state rules apply.
- Specify footer states (loading, empty results, first/last page) and prev/next boundary behavior.
- Add verification via tests and update mapping notes for Figma alignment.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `web-products-catalog`: clarify pagination placement and footer behavior with mandatory UI-kit `Pagination` usage.
- `web-products-search-and-create`: clarify search-results pagination to use the same footer pattern and navigation states.

## Impact

- Affected code: `apps/web/src/routes/products.tsx` and related products-page wrappers/styles.
- Affected tests: route-level pagination placement/behavior tests for the products page.
- Affected docs/specs: delta specs for `web-products-catalog` and `web-products-search-and-create`.
- Dependencies: reuse `@dummy-products/ui-kit` `Pagination` (no new external APIs or libraries).

## How to verify

- Run `pnpm -C apps/web exec vitest run src/test/Products.test.tsx`
- Run `pnpm check` from repo root
- Manually verify on `/products`:
  - pagination renders in the table footer area
  - boundary controls disable correctly on first/last page
  - search mode uses the same footer pagination pattern

## PRD impact

- [x] Root `PRD.md`
- [x] `packages/ui-kit/PRD.md`
- [x] `apps/web/PRD.md`
- [x] `apps/fumadocs/PRD.md`
