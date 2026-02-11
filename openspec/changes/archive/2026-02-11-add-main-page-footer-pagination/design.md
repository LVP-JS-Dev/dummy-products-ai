# Main Page Footer Pagination

## Context

`apps/web/src/routes/products.tsx` already supports API pagination (`limit`/`skip`) and renders UI controls. The change requires formalizing footer placement and behavior to match the assignment/Figma expectation for the main products page while keeping one consistent interaction model between default list mode and search mode.

Constraints:
- Reuse existing `@dummy-products/ui-kit` `Pagination` component rather than implementing page controls ad hoc.
- Keep current data contract with DummyJSON (`limit`, `skip`, total count).
- Preserve accessibility semantics (`aria-current`, disabled boundary controls, labeled prev/next buttons).

## Goals / Non-Goals

**Goals:**
- Define an explicit footer pagination pattern under the products table.
- Ensure the same pagination behavior in both default list and active search results.
- Make loading, empty-state, and first/last-page behavior testable via specs and tasks.

**Non-Goals:**
- Redesigning the `Pagination` component API in UI-kit.
- Changing backend/data-source behavior beyond existing pagination params.
- Introducing infinite scroll or virtualized pagination patterns.

## Decisions

- Use UI-kit `Pagination` as the only pagination control on the products route.
  Rationale: ensures visual/system consistency and avoids duplicate interaction logic.
  Alternative considered: custom footer buttons in `apps/web`; rejected due to design drift risk.

- Place pagination controls in a dedicated footer row directly below the products table content.
  Rationale: aligns with assignment layout and improves scanability of list controls.
  Alternative considered: top-only controls; rejected because assignment expects footer placement.

- Keep page state as single source of truth shared by list/search fetch logic.
  Rationale: avoids divergent behavior between search and non-search modes.
  Alternative considered: separate page state per mode; rejected due to extra complexity and transition bugs.

- Require deterministic boundary behavior (`prev` disabled on page 1, `next` disabled on last page) and loading-safe transitions.
  Rationale: predictable UX and straightforward automated tests.
  Alternative considered: allow clicks during loading with request cancellation; deferred as unnecessary complexity.

## Risks / Trade-offs

- [Risk] Search and default list may drift if one code path bypasses footer state conventions.
  → Mitigation: spec both capabilities and add route-level behavior tests for each mode.

- [Risk] Figma spacing/tokens can mismatch if local style wrappers diverge from UI-kit assumptions.
  → Mitigation: keep footer wrapper minimal and document expected layout constraints.

- [Trade-off] A single shared pagination control reduces flexibility for mode-specific UX.
  → Mitigation: prioritize consistency first; revisit only if product requirements diverge.

## Migration Plan

- No data migration required.
- Rollout is code-only on products route and tests/docs updates.
- Rollback path: revert products-route footer integration and associated spec deltas.

## Open Questions

- None at this stage; requirements are constrained to placement and behavior of existing pagination primitives.
