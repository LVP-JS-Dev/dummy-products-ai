## Why

The current design-tokens docs page is static and does not provide an interactive preview of how token groups affect rendered UI examples. Adding a docs story-driven preview makes token semantics easier to validate and reduces ambiguity when adopting tokens in product code.

## What Changes

- Add an interactive token preview Story for Fumadocs that demonstrates token usage for core groups (colors, typography, spacing, radius).
- Embed the token preview Story in the design-tokens docs page using the same docs-story integration pattern used by component pages.
- Define docs requirements for naming/location/export conventions for the token preview story so MDX imports remain reliable.
- Keep generated token reference tables intact; the story preview is additive and does not replace token reference content.

## Capabilities

### New Capabilities

<!-- none -->

### Modified Capabilities

- `fumadocs-docs`: require an interactive token preview story on the design-tokens docs page with enforceable Story file conventions and MDX embedding behavior.

## Impact

- Docs content: `apps/fumadocs/content/docs/design-tokens.mdx`
- Docs story source: `apps/fumadocs/src/stories/` (new token preview story file)
- Spec delta: `openspec/changes/docs-story-token-preview/specs/fumadocs-docs/spec.md`
