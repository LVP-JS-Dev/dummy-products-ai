## 1. Contracts and Public API

- [x] 1.1 Add new UI-kit contracts for `Input`, `Divider`, `Link`, `Text`, `Toast`, `Card`, `Spinner`, and `Image` with serializable/runtime prop separation where needed.
- [x] 1.2 Update existing `Button` and `Checkbox` contracts to support required composition use cases while preserving backward compatibility.
- [x] 1.3 Wire new and updated contracts into `packages/ui-kit/src/contracts/index.ts` and `packages/ui-kit/src/index.ts` exports.

## 2. Foundation Form and Typography Components

- [x] 2.1 Implement `Input` with start/end adornments, label, error state/text, and password support.
- [x] 2.2 Update `Button` implementation to support child composition (including icon-as-children flow) and retain loading/disabled semantics.
- [x] 2.3 Update `Checkbox` implementation to support optional label via children with controlled checked behavior.
- [x] 2.4 Implement `Divider`, `Link` (secure external defaults), and `Text` (`as` polymorphism + token variants).

## 3. Feedback, Layout, and Media Components

- [x] 3.1 Implement `Toast`/toaster primitives in UI kit with configurable screen placement.
- [x] 3.2 Implement reusable `Card` composition primitives in UI kit.
- [x] 3.3 Implement `Spinner` with accessible loading semantics and size/variant options.
- [x] 3.4 Implement `Image` with best-practice defaults (a11y, loading/decoding behavior, stable sizing, fallback/error handling).

## 4. States, Manifest, and Documentation

- [x] 4.1 Add/expand `states` fixtures for all added/updated foundation components.
- [x] 4.2 Update generation/validation scripts (`Gen.ts`, `Test.ts`) so schemas and manifest include the expanded component surface.
- [x] 4.3 Audit component styles for token-only usage and extend UI-kit tokens where missing values are required.
- [x] 4.4 Add or update Fumadocs component pages and interactive stories for new/changed components.

## 5. Consumer Migration

- [x] 5.1 Migrate `apps/web` usage from route-level inline primitives and local `components/ui` wrappers to `@dummy-products/ui-kit` components where covered.
- [x] 5.2 Update login/products UI composition to use `ui-kit` `Input`/`Divider`/`Link`/`Card`/`Spinner` and toast primitives as applicable.
- [x] 5.3 Remove or minimize redundant app-local UI wrappers superseded by `ui-kit`.

## 6. Validation and Readiness

- [x] 6.1 Run UI-kit generation and validation checks (`pnpm gen`, `pnpm test`) and fix schema/state drift.
- [x] 6.2 Run repository checks (`pnpm check`, relevant app type/tests) and resolve regressions from migration.
- [x] 6.3 Re-verify OpenSpec artifact consistency and ensure the change is implementation-ready.
