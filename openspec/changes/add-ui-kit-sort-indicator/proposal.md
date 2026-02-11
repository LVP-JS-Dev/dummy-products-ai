## Why

Table UIs need a consistent, reusable visual indicator for sort direction. Today sort arrows are implemented ad-hoc per screen/component, which makes Figma-aligned behavior and maintenance harder. Adding a minimal `SortIndicator` to `@dummy-products/ui-kit` centralizes this UI primitive and enables mandatory ui-kit usage in table headers.

## What Changes

- Add a new public `SortIndicator` component to `packages/ui-kit` that renders sort direction (`asc`/`desc`/none) using existing ui-kit `Icon` assets.
- Define a contract-first API for `SortIndicator` (serializable props) and include generated JSON schema + `manifest.json` entry.
- Add a small fumadocs story for visual verification.

## Capabilities

### New Capabilities
- `ui-kit-sort-indicator`: Reusable, contract-defined sort direction indicator built on ui-kit `Icon`.

### Modified Capabilities

## Impact

- `packages/ui-kit`: new component, contract, states, and generated schemas/manifest; public exports updated.
- `apps/fumadocs`: add a story for `SortIndicator`.
- No new runtime dependencies.
