# Context

`packages/ui-kit` currently exposes low-level `PageNumber` but not a full pagination control that owns windowing logic, previous/next controls, and consistent accessibility semantics. `apps/web` currently composes pagination ad-hoc in the products route, which couples navigation behavior to page code and makes it harder to keep Figma-aligned visuals consistent across screens. The change must preserve the existing contract-first workflow (`contracts` + `states` + generated schemas + manifest) and keep products pagination API behavior (`limit`/`skip`) unchanged.

## Goals / Non-Goals

**Goals:**
- Introduce a reusable `Pagination` component in `ui-kit` with contract-defined props/events/states.
- Provide deterministic page-window rendering around the active page, with previous/next actions and disabled edge behavior.
- Ensure component is accessible (`aria-current`, clear labels, disabled semantics) and consumable from `apps/web`.
- Validate behavior via TDD and browser-level interaction checks using Playwright.

**Non-Goals:**
- Changing backend/API pagination strategy (`limit`/`skip`) or introducing cursor pagination.
- Redesigning unrelated table controls or replacing all existing pagination consumers outside the products flow.
- Introducing new design token primitives for this change.

## Decisions

1. Decision: Add a new top-level `Pagination` component instead of extending `PageNumber`.
Rationale: `PageNumber` is a primitive button-like atom and lacks container-level logic (page range computation, previous/next behavior, orchestration). A separate component keeps composition clean and preserves backward compatibility for existing `PageNumber` usage.
Alternatives considered:
- Extend `PageNumber` with container logic: rejected because it mixes atom and composite responsibilities.
- Keep pagination logic only in app code: rejected because it duplicates behavior and weakens UI-kit ownership.

1. Decision: Define contract as controlled component API (`currentPage`, `totalPages`, optional `maxVisiblePages`, `disabled`) plus `pageChange` event.
Rationale: Controlled API matches existing app state flow and is deterministic for tests and generated schemas.
Alternatives considered:
- Uncontrolled internal state in component: rejected due to harder synchronization with route-driven data fetching.

1. Decision: Keep page-window algorithm centered around active page with boundary clamping.
Rationale: Matches expected pagination UX and supports compact controls for large page sets.
Alternatives considered:
- Always render all pages: rejected due to poor scalability and visual noise.

1. Decision: Migrate products route from ad-hoc `PageNumber` trio to `Pagination` consumer.
Rationale: Ensures immediate real use of the new UI-kit component and validates fit against existing workflow.
Alternatives considered:
- Ship component without integration: rejected because it leaves behavior unproven in product flow.

## Risks / Trade-offs

- [Risk] Visual mismatch with exact Figma spacing/icons. -> Mitigation: align dimensions/colors to existing token set and validate interaction/appearance with Playwright checks in the running app/docs.
- [Risk] Off-by-one bugs in page window computation. -> Mitigation: add focused TDD tests for boundaries (first, middle, last page).
- [Risk] API drift between contract/states/generated artifacts. -> Mitigation: keep `gen` and `ui-kit` validation test in acceptance flow.
- [Trade-off] Controlled API requires consumers to manage state updates explicitly. -> Benefit: predictable behavior and easier testability.

## Migration Plan

1. Add `Pagination` contract, states, component, and public exports in `packages/ui-kit`.
1. Update generation/test scripts to include new artifact schemas.
1. Regenerate UI-kit manifest/schemas and run validation tests.
1. Replace products route pagination composition with the new `Pagination` component.
1. Add/adjust docs stories for `Pagination` in `apps/fumadocs`.
1. Execute TDD suite and Playwright interaction checks before merge.

Rollback strategy: revert consumer usage in `apps/web` back to previous `PageNumber` composition and remove `Pagination` export if regressions are found.

## Open Questions

- Should ellipsis rendering be part of v1 (`...`) for large page ranges, or deferred while keeping fixed window buttons only?
- Should previous/next buttons reuse existing icon sizing exactly as table controls, or use pagination-specific sizing tokens in a follow-up?
