## Why

The repository currently splits UI primitives between `packages/ui-kit`, local app-level components, and route-level inline markup. This causes API drift, duplicate behavior, and prevents `ui-kit` from being the single source of truth for form, feedback, layout, and media primitives.

## What Changes

- Introduce a consolidated set of reusable foundation components in `packages/ui-kit`: `Input`, `Button` improvements, `Checkbox` improvements, `Divider`, `Link`, `Text`, `Toast`, `Card`, `Spinner`, and `Image`.
- Extend existing `Button` and `Checkbox` APIs to support composition via children/runtime slots while preserving contract-first serializable props for generated schemas and states.
- Move login/page-level inline UI patterns into reusable `ui-kit` primitives (icon slots in inputs, password mode, divider with text, link hardening, loading indicators).
- Add `Image` with frontend best-practice defaults (a11y, loading/decoding behavior, layout stability, fallback/error handling).
- Require all foundation components to consume design-system tokens for colors, spacing, radii, typography, and states; allow token-set expansion when existing tokens are insufficient.
- Keep docs, generated manifest/schemas, and states aligned with the expanded component surface.

## Capabilities

### New Capabilities
- `ui-kit-foundation-components`: Defines requirement-level behavior for `Input`, `Button`, `Checkbox`, `Divider`, `Link`, `Text`, `Toast`, `Card`, `Spinner`, and `Image` as contract-first, reusable UI-kit primitives.

### Modified Capabilities
- None.

## Impact

- `packages/ui-kit/src/components/*`, `packages/ui-kit/src/contracts/*`, `packages/ui-kit/src/states/*`, `packages/ui-kit/src/index.ts`
- `packages/ui-kit/scripts/Gen.ts`, `packages/ui-kit/scripts/Test.ts`, generated artifacts in `packages/ui-kit/src/generated/**`
- `apps/web` and `apps/fumadocs` consumers that currently use local `components/ui` wrappers or inline route-level markup
- Component docs/stories in `apps/fumadocs/content/docs/components/*` and `apps/fumadocs/src/stories/*`
