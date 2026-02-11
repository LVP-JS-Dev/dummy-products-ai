# Main Page Footer Pagination (UI-kit Only)

## Context

The `/products` route already uses `@dummy-products/ui-kit` for core controls (`Button`, `SearchInput`, `Pagination`) but requirements do not explicitly state that UI-kit primitives are mandatory. This change makes that constraint explicit and testable, so the footer pagination and related controls cannot drift into ad hoc implementations.

Available UI-kit components in this repo are limited to: `Button`, `Checkbox`, `Icon`, `PageNumber`, `Pagination`, `SearchInput`. There is no UI-kit table component, so the table shell and layout wrappers will remain plain markup using UI-kit tokens.

## Goals / Non-Goals

**Goals:**
- Make UI-kit component usage mandatory for footer pagination on `/products`.
- Keep behavior identical for default list mode and active search mode.
- Make the constraint verifiable via route-level tests.

**Non-Goals:**
- Replacing the products table with a UI-kit table component (none exists).
- Introducing new UI-kit components or expanding `Button` variants.
- Changing API behavior beyond existing `limit`/`skip` (+ `q` for search).

## Decisions

- Pagination controls MUST use `@dummy-products/ui-kit` `Pagination`.
  Rationale: centralizes accessibility and styling behavior.
  Alternative considered: custom pagination markup; rejected due to drift risk.

- Search input and primary actions MUST use UI-kit controls where present (`SearchInput`, `Button`).
  Rationale: ensures consistent tokens/interaction.

- Layout wrappers and non-interactive text remain plain markup.
  Rationale: UI-kit does not provide layout primitives; enforcing UI-kit here would be artificial.

## Risks / Trade-offs

- [Risk] Over-interpreting “UI-kit only” and attempting to replace elements that UI-kit does not provide.
  → Mitigation: enumerate the available UI-kit components in this design and limit enforcement to matching primitives.

- [Risk] Tests may become coupled to markup.
  → Mitigation: assert presence of accessible roles/labels and stable footer container rather than brittle structure.

## Migration Plan

- Code-only change: adjust `/products` route and tests.
- Rollback: revert route/test changes.

## Open Questions

- None.
