## Context

The UI kit already follows a contract-first flow (`contracts -> components -> states -> generated artifacts`), but several component visuals and states no longer match current product requirements. The requested updates span multiple foundation components (`Button`, `Card`, `Checkbox`, `SearchInput`, `Modal` states), add token surface changes (new semantic colors plus Roboto typography token), and add stricter icon rendering rules. Because these changes affect both public component API behavior and token contracts consumed by docs/apps, design-level alignment is required before implementation.

## Goals / Non-Goals

**Goals:**
- Define a token-first implementation path for all requested visual updates without hardcoded color/font literals.
- Keep UI-kit public API consistent by updating contracts/states before consumers.
- Standardize icon behavior with deterministic sizing/fitting/centering rules and token-driven color.
- Ensure generated UI-kit artifacts and docs stories stay in sync with updated states and variants.

**Non-Goals:**
- Redesigning unrelated components outside the requested set.
- Changing app-level business logic in `apps/web`.
- Introducing runtime theming architecture changes beyond adding required tokens.

## Decisions

1. Implement all new/updated visual values through tokens first, then consume via component styles.
Rationale: Existing specs require token-driven styling and prohibit direct color/font literals in components.
Alternative considered: Apply direct literals in component CSS for speed. Rejected due to token contract drift and review failures.

2. Model button updates as explicit variant semantics (`default` borderless, `secondary`, icon-oriented transparent variant).
Rationale: Variant-level contract keeps behavior testable and reusable across docs/apps.
Alternative considered: Conditional style flags instead of a variant. Rejected because it weakens public API clarity and state discoverability.

3. Remove modal no-close state from exported states instead of runtime gating.
Rationale: Requirement is about public state surface; removing the state avoids unsupported usage at source.
Alternative considered: Keep state but mark deprecated. Rejected because it preserves invalid behavior in API.

4. Introduce dedicated icon capability constraints (24x24 default box, longest-side fit, centered non-square SVGs).
Rationale: Asset set includes non-square SVGs and needs deterministic cross-component rendering.
Alternative considered: Let each consumer/component size SVG independently. Rejected due to inconsistency risk.

5. Treat Search icon change as an asset contract update in UI kit, not app-level override.
Rationale: Search visual should stay consistent in all consumers through shared component behavior.
Alternative considered: Override icon per app usage site. Rejected because it fragments UI behavior.

## Risks / Trade-offs

- [Risk] Variant/state renames can break existing consumers in docs or web app. -> Mitigation: update ui-kit states exports and all stories/usages in same change, then run monorepo checks.
- [Risk] Token additions may conflict with existing naming conventions. -> Mitigation: follow current token naming patterns and regenerate token artifacts immediately.
- [Risk] Non-square SVG fitting can regress visual alignment for some icons. -> Mitigation: add story/test cases for square and non-square assets with snapshot or DOM style assertions.
- [Risk] Removing modal state can break references in docs/examples. -> Mitigation: remove/replace invalid modal story states in docs during the same implementation.

## Migration Plan

1. Add missing tokens (button secondary border color, card border/background mapping, checkbox checked color, Roboto typography token).
2. Update contracts and component implementations for Button, Card, Checkbox, Icon, SearchInput, and modal states.
3. Update `states` exports and remove deprecated modal no-close state.
4. Regenerate UI-kit schemas/manifest and validate generated artifacts.
5. Update docs stories/MDX that rely on changed variants/states.
6. Run `pnpm gen`, `pnpm test`, and `pnpm check` from repo root.

Rollback strategy:
- Revert this change commit set; previous variants/states and token surface remain intact because no data migration is involved.

## Open Questions

- Exact naming for the new icon-oriented button variant in public API (`ghost-icon`, `icon`, or another approved name).
- Whether Search icon replacement should include additional size/spacing adjustments or only asset swap.
