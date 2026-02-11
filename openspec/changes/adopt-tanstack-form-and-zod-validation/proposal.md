# Adopt TanStack Form + Zod Validation

## Why

Forms in `apps/web` are currently implemented with ad-hoc local state and imperative validation. The repository already depends on `@tanstack/react-form` and `zod`, but the app does not use them. Standardizing on a single form model improves:

- consistency across login + add-product flows
- validation ergonomics and type-safety
- UI state handling (submitting/disabled/errors) without duplicating patterns

## What Changes

- Adopt `@tanstack/react-form` for interactive forms in `apps/web`.
- Use `zod` as the single source of truth for form validation schemas.
- Define an app-level form utility layer (thin, non-UI) for shared patterns:
  - required-field validation
  - mapping server errors to form errors
  - consistent submit lifecycle semantics

## Scope

### In scope

- Login form refactor to TanStack Form + zod validation
- Add-product modal form refactor to TanStack Form + zod validation

### Out of scope

- Introducing a UI-kit-level Form component (contract-first constraints make it ambiguous)
- Changing UI-kit component contracts or states
- Adding new UI-kit components

## Capabilities

### Modified capabilities

- `web-auth-session`: clarify that login validation is zod-backed and uses TanStack Form lifecycle states
- `web-products-search-and-create`: clarify that add-product validation is zod-backed and uses TanStack Form lifecycle states

## PRD impact

- [ ] Root PRD
- [ ] UI Kit PRD
- [ ] Docs PRD
- [x] Web PRD

