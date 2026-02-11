## Context

The products page already supports API-backed search, debouncing, URL query restoration, and pagination behavior, but the header composition and search control placement required by the Figma design are not codified as a page-level contract. This change aligns UI structure with the assignment design while preserving the existing search behavior and API integration.

Constraints:
- Keep existing search semantics from `web-products-search-and-create`.
- Avoid API contract changes.
- Maintain compatibility with current products route architecture in `apps/web`.

## Goals / Non-Goals

**Goals:**
- Implement a deterministic header structure on the products page that includes title/actions and a primary search control.
- Define responsive layout behavior for header and search so desktop and mobile render consistently.
- Preserve search behavior (debounce, URL state, pagination interaction) while moving/standardizing the UI entry point.

**Non-Goals:**
- Rewriting products data fetching or search API logic.
- Introducing new backend endpoints or query parameters.
- Full-page redesign outside the header/search area.

## Decisions

1. Introduce a dedicated header container in the products route.
- Decision: Build an explicit header section in the page layout instead of embedding search inline with table controls.
- Rationale: Keeps the Figma-aligned visual hierarchy stable and testable.
- Alternative considered: Minimal CSS adjustment on existing search block. Rejected because it does not establish a durable structure contract.

2. Reuse existing controlled search state and handlers.
- Decision: Keep current search state machine (input state, debounced query, URL sync) and bind it to the new header input.
- Rationale: Reduces regression risk and keeps behavior aligned with current specs.
- Alternative considered: Create a new header-specific search state implementation. Rejected due to duplicated logic and higher bug risk.

3. Define responsive behavior as layout rules in spec and CSS implementation.
- Decision: Specify row/stack transitions and width constraints for header elements across viewport sizes.
- Rationale: Prevents ambiguous behavior during review and future refactors.
- Alternative considered: Leave responsiveness implicit to implementation. Rejected because acceptance criteria require predictable rendering.

4. Keep search capability modification as a requirement delta.
- Decision: Update `web-products-search-and-create` with a requirement that the primary search control is presented in the main header.
- Rationale: The behavior remains, but the requirement location/presentation changes at spec level.
- Alternative considered: New capability only, without modifying existing search spec. Rejected because search entry-point placement affects the existing capability contract.

## Risks / Trade-offs

- [Risk] Visual mismatch with Figma spacing/typography details -> Mitigation: add explicit acceptance requirements and verify in UI review.
- [Risk] Header refactor may break search URL synchronization wiring -> Mitigation: preserve existing hooks/state plumbing and add regression checks.
- [Risk] Responsive rules may conflict with existing UI-kit primitives -> Mitigation: prefer composition with existing primitives and limit custom overrides.

## Migration Plan

1. Add/adjust products page layout to include the new header container and search field placement.
2. Connect header search input to existing search handlers/state.
3. Apply responsive styles and spacing tokens for desktop/mobile parity.
4. Validate search behavior parity (debounce, URL restore, pagination with active query).
5. Rollback: revert header container and style changes while retaining existing search behavior path.

## Open Questions

- Should the header include only search + title in this change, or should additional controls (e.g., add-product trigger positioning) also be normalized to Figma now?
- Is exact pixel parity with Figma expected, or token-level visual equivalence acceptable for acceptance?
