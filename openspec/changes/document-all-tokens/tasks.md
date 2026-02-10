# Document all tokens

## 1. Token documentation metadata

- [x] 1.1 Decide the metadata format/location for token descriptions (e.g. `packages/ui-kit/src/tokens.docs.ts` or `.json`)
- [x] 1.2 Populate metadata for every public token in `packages/ui-kit/src/tokens.css` (description + group/subgroup if needed)

## 2. Generator script

- [x] 2.1 Implement a parser that extracts `--ui-*` variables and values from `packages/ui-kit/src/tokens.css` `:root` block
- [x] 2.2 Implement a generator that merges parsed CSS tokens with the metadata and produces a stable MDX output (sorted, grouped)
- [x] 2.3 Make generation fail if CSS has a token without metadata or metadata references a missing CSS token
- [x] 2.4 Add a CLI entry/script to run the generator from the repo (e.g. `pnpm docs:generate-tokens`)

## 3. Docs integration (Fumadocs)

- [x] 3.1 Choose the destination MDX path under `apps/fumadocs/content/docs/` (e.g. `design-tokens.mdx`) and generate frontmatter + content
- [x] 3.2 Add/adjust docs index/nav to link to the token reference page (update `apps/fumadocs/content/docs/index.mdx` or docs tree ordering as needed)
- [x] 3.3 Wire the generator into docs workflows (predev/prebuild for `apps/fumadocs`, plus CI) so the page stays up to date

## 4. Verification

- [x] 4.1 Add a lightweight check that runs in CI/local (script or test) to ensure token docs are generated and in sync
- [x] 4.2 Run docs build/dev locally to confirm the tokens page renders correctly (tables, code blocks, grouping)
