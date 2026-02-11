## 1. Token Preview Story

- [x] 1.1 Create `apps/fumadocs/src/stories/design-tokens.story.tsx` as a client component with a named `WithControl` export and `story` export object.
- [x] 1.2 Implement `WithControl` to render interactive examples that demonstrate tokenized colors, typography, spacing, and radius usage via CSS variables.

## 2. Generated Token Docs Integration

- [x] 2.1 Update `scripts/generate-token-docs.mjs` to emit an import for `WithControl` from `@/stories/design-tokens.story`.
- [x] 2.2 Update generated MDX output to include an `## Interactive` section that renders `<WithControl />` while preserving existing token tables/examples.
- [x] 2.3 Regenerate `apps/fumadocs/content/docs/design-tokens.mdx` using `pnpm docs:generate-tokens` and confirm generated output includes the new import and interactive section.

## 3. Verification

- [x] 3.1 Run token-doc generation check path (or equivalent) to verify generated docs are up to date and deterministic.
- [x] 3.2 Run docs build/dev checks for `apps/fumadocs` to confirm the design-tokens page renders without import/runtime errors.
- [x] 3.3 Validate the new story file naming/casing and MDX import path match exactly (`design-tokens.story`) for case-sensitive environments.
