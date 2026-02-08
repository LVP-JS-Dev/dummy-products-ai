## Why

UI kit tokens are currently consumed directly in component code, which makes styling rules harder to enforce and obscures the contract between design tokens and CSS output. We need a clear, enforceable rule so token usage stays consistent and auditable as the UI kit grows.

## What Changes

- Define a new capability that requires UI kit tokens to be consumed through CSS (e.g., CSS variables or classes), not through direct JS constants.
- Introduce linter rules that flag direct token usage outside the approved CSS pathway.
- Update documentation to describe the required token usage pattern and lint expectations.

## Capabilities

### New Capabilities
- `tokens-css-usage`: Define the required token consumption pathway (CSS-only) and enforceability requirements.

### Modified Capabilities
- (none)

## Impact

- `packages/ui-kit` token consumption patterns and component implementation guidance.
- Lint configuration and CI checks.
- Documentation for UI kit usage patterns.
