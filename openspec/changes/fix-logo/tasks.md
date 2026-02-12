## 1. UI Kit: Contract + Component

- [x] 1.1 Update `packages/ui-kit/src/contracts/LogoContract.ts` defaults/semantics so `size` represents wrapper size (default 52) while keeping API non-breaking
- [x] 1.2 Update `packages/ui-kit/src/components/Logo.tsx` to render a 52×52 circular wrapper with CSS-based fill/stroke/shadow effects and a centered mark SVG sized 35×35 by default
- [x] 1.3 Ensure `className`/`style` apply to the wrapper container and accessibility behavior matches the spec (`decorative`/`label`)

## 2. UI Kit: States + Exports + Generated Artifacts

- [x] 2.1 Update `packages/ui-kit/src/states/LogoStates.ts` to include states covering default, decorative, and custom-size scenarios (data-only)
- [x] 2.2 Run generation for UI-kit schemas/manifest: `pnpm -C packages/ui-kit gen`
- [x] 2.3 Run UI-kit tests: `pnpm -C packages/ui-kit test`

## 3. Docs: Fumadocs Story + MDX

- [x] 3.1 Update/add story in `apps/fumadocs/src/stories/LogoStory.tsx` (or existing logo story) to visually validate wrapper effects and size scaling via states
- [x] 3.2 Update `apps/fumadocs/content/components/logo.mdx` (or relevant doc) to use UI-kit states and render `<story.WithControl />`

## 4. Consumers: Web App Alignment

- [x] 4.1 Verify `apps/web` logo usage renders correctly after the UI-kit change; adjust any layout/styling assumptions if needed (no internal imports)

## 5. Repo Verification

- [x] 5.1 Run root checks: `pnpm gen`
- [x] 5.2 Run root tests: `pnpm test`
- [x] 5.3 Run root verification: `pnpm check`
