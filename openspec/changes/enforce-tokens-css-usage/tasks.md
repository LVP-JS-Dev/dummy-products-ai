## 1. Token CSS Surface

- [x] 1.1 Define the CSS variable naming scheme for public tokens
- [x] 1.2 Add a CSS token entrypoint in `packages/ui-kit` (e.g., tokens stylesheet)
- [x] 1.3 Document how apps/components import and use the CSS token entrypoint

## 2. Lint Enforcement

- [x] 2.1 Select the lint mechanism (Biome/Ultracite rule or equivalent) for token import restrictions
- [x] 2.2 Implement the lint rule to block direct token imports in component TS/TSX files
- [x] 2.3 Add allowlist exceptions for token definition/generation files

## 3. Migration & Validation

- [x] 3.1 Update UI kit components to consume tokens via CSS variables
- [x] 3.2 Update docs/examples to reflect the CSS-only token usage
- [x] 3.3 Run `pnpm check` and fix any violations
