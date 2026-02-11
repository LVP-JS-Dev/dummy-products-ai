# UI-kit SortIndicator Design

## Context

`packages/ui-kit` already provides `Icon` and other reusable UI primitives, and `Pagination` demonstrates use of caret icons. Table sorting UIs across the app need a consistent visual indicator of direction (ascending/descending) without duplicating arrow logic in each consumer.

The change must follow the ui-kit contract-first workflow:
- Define Zod contract in `packages/ui-kit/src/contracts`
- Provide example `states`
- Update generation (`scripts/Gen.ts`) and validation (`scripts/Test.ts`)
- Export the component from `packages/ui-kit/src/index.ts`

## Goals / Non-Goals

**Goals:**
- Add a minimal `SortIndicator` component to `@dummy-products/ui-kit`.
- Provide a schema-generated, serializable props contract and manifest entry.
- Render direction deterministically using existing icon assets.
- Provide a small fumadocs story for quick visual checks.

**Non-Goals:**
- Adding new icons to the icon set (use existing `caret_right`).
- Changing ui-kit `Button` variants/sizes.
- Owning table header behavior (sorting state, click behavior) in ui-kit.

## Decisions

1. Implement `SortIndicator` as a thin wrapper over `Icon`.
- Rationale: keeps the component minimal and consistent with existing icon primitives.
- Alternative: accept raw SVG or text arrows. Rejected due to duplication and inconsistency.

2. Use `Icon` name `caret_right` and rotate it for direction.
- `asc`: rotate `-90deg`
- `desc`: rotate `90deg`
- missing direction: render nothing
- Rationale: avoids adding new assets while preserving a clear direction cue.

3. Contract: `direction?: "asc" | "desc"`, optional `size`, optional `color`.
- Rationale: keeps props serializable and sufficient for most consumers.

## Risks / Trade-offs

- [Risk] Visual mismatch vs Figma arrow style -> Mitigation: keep size/color overrideable and validate in fumadocs + consuming screen.
- [Trade-off] Using rotated caret may not match “arrow up/down” exactly -> Benefit: minimal change without expanding icon set.

## Migration Plan

1. Add contract, states, component, and exports in `packages/ui-kit`.
2. Update gen/test scripts and regenerate schemas/manifest.
3. Add fumadocs story for manual visual checks.

