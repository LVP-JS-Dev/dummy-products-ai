# Migrate `apps/web` To UI Kit Modal + Logo

## Why

UI Kit now provides `Modal` and `Logo` primitives with contract-first schemas, events, and documented states. `apps/web` currently:

- uses a placeholder icon in the login header
- implements an ad-hoc modal for add-product

Migrating to UI Kit primitives reduces bespoke accessibility logic in the app and makes UI behavior consistent with docs/states.

## What Changes

- Login page uses `@dummy-products/ui-kit/Logo` instead of placeholder icon.
- Add-product dialog uses `@dummy-products/ui-kit/Modal` instead of custom modal implementation.

## Scope

### In scope

- Minimal migrations with no UX regression
- Preserve existing keyboard/focus behavior and close semantics
- Update tests accordingly

### Out of scope

- Introducing page-size selector, React Query, or TanStack Form refactors

## Capabilities

### Modified capabilities

- `web-login-form-ui`: replace placeholder emblem implementation with Logo primitive
- `web-products-search-and-create`: replace app-local modal implementation with UI-kit Modal

## PRD impact

- [ ] Root PRD
- [ ] UI Kit PRD
- [ ] Docs PRD
- [ ] Web PRD

