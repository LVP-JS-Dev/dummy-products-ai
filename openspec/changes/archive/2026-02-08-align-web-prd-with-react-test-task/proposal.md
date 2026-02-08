# Proposal: Align Web PRD With React Test Task

## Why

Current `/apps/web/PRD.md` is oriented to a UI Kit demo and directly conflicts with the React test assignment captured in `requirements/requirement.md` that requires auth and product-data workflows. This mismatch creates planning drift and inconsistent scope across monorepo PRDs.

## What Changes

- Replace `apps/web` PRD scope with the test-task product flow: login, remember-me session behavior, products table from API, sorting, search, add-item form, and rating highlight rule.
- Align `apps/web` DoD with assignment acceptance criteria, including Figma parity and strict TypeScript expectations.
- Update root PRD out-of-scope wording so `apps/web` can consume external auth/products APIs without introducing a custom backend.
- Keep monorepo architecture boundaries explicit: `apps/web` remains a consumer of `packages/ui-kit`; no source-of-truth movement to apps.
- Add requirement traceability (`PDF requirement -> PRD section -> DoD`) to reduce future spec drift.

## Capabilities

### New Capabilities
- `web-products-admin-prd`: Defines normative PRD requirements for `apps/web` as a products-admin test application and enforces cross-PRD consistency with root architecture constraints.

### Modified Capabilities
- None.

## Impact

- Affected docs:
  - `/PRD.md`
  - `/apps/web/PRD.md`
  - optional clarifications in `/packages/ui-kit/PRD.md` and `/apps/fumadocs/PRD.md`
- Affected process:
  - PRD review and acceptance criteria for `apps/web`
  - no runtime code, API contracts, or package exports changed in this proposal
