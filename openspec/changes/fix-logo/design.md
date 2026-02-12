## Context

`packages/ui-kit` already exports a `Logo` component. Today it renders as a single SVG that includes the wrapper (52×52 rounded rect), gradients, and shadow filter inside the SVG. The updated Figma source of truth describes the Logo as:

- A circular wrapper with specific fill/stroke/shadow effects (52px × 52px)
- A separate inner SVG mark (35px × 35px)

We need to align the UI-kit Logo primitive with these requirements while keeping the contract-first flow (contracts → component → states → docs → apps) and preserving accessibility behavior (`decorative` / `label`).

## Goals / Non-Goals

**Goals:**
- Match the Figma wrapper size (52×52) and effects using CSS (fill gradient overlay, gradient stroke, drop shadows).
- Render the provided mark SVG at 35×35 centered within the wrapper.
- Preserve existing `Logo` public export and prop shape where possible (non-breaking), updating defaults to the Figma sizes.
- Keep styling token-driven using existing CSS variables where feasible.

**Non-Goals:**
- Introducing new `variant` values beyond the existing `"mark"` (wordmark, lockups, etc.).
- Creating a fully themeable “brand system” beyond matching the current Figma logo.
- Refactoring unrelated UI-kit styling patterns (continue using inline style objects + CSS variables).

## Decisions

1) **Wrapper will be an HTML element (not part of the SVG)**
- **Decision:** Render a wrapper `<span>`/`<div>` sized to `size` (default 52), with border radius 9999px, background layers and box-shadows matching Figma.
- **Why:** Figma describes wrapper effects separate from the SVG mark; implementing via CSS makes the mark SVG simpler and avoids complex SVG filter/gradient maintenance.
- **Alternatives considered:** Keep the wrapper inside a single SVG (current approach). Rejected because the requested composition is explicitly wrapper + inner SVG, and CSS more directly matches “fill/stroke/effects” semantics.

2) **Keep `LogoProps.size` as the wrapper size; derive mark size from it**
- **Decision:** Default `size` becomes 52. The inner mark defaults to 35 when `size=52`, and scales proportionally for other sizes (`markSize = round(size * 35 / 52)`).
- **Why:** Preserves the existing prop (non-breaking) while guaranteeing the Figma-correct default sizes.
- **Alternatives considered:** Remove `size` and hardcode 52/35. Rejected due to breaking API and reduced flexibility.

3) **Token-first colors; allow direct alpha via CSS color-mix/rgb()**
- **Decision:** Implement:
  - Base fill: `var(--ui-color-surface)`
  - Fill overlay gradient: derived from `var(--ui-color-text)` with 0%→6% opacity (Figma’s `#232323` at 0–6%)
  - Stroke gradient: derived from `var(--ui-color-border-secondary)` with 70%→0% opacity
  - Shadow: `0 12px 8px rgb(0 0 0 / 3%)` and an outer “white spread” as `0 0 0 2px var(--ui-color-surface)`
- **Why:** Keeps the component aligned with the repo’s token approach while matching the specific Figma visual.
- **Alternatives considered:** Introduce new dedicated tokens for the logo. Deferred unless consumers require broader reuse; this change focuses on correctness.

4) **`className`/`style` apply to the wrapper**
- **Decision:** Move `className`/`style` to the wrapper element so consumers can position/size it consistently; the inner SVG uses fixed sizing derived from `size`.
- **Why:** Wrapper is now the primary visual container; applying styles to SVG only would be confusing for layout.

## Risks / Trade-offs

- **[CSS gradient border complexity]** → Use the standard “multiple background layers + transparent border” approach; add a visual regression check via docs story states.
- **[CSS var color parsing]** If a token is not an rgb()/hex value usable in `rgb(... / alpha)` contexts → fall back to hardcoded equivalents for this component only (as a last resort).
- **[API expectations for `size`]** Consumers expecting `size` to change only the SVG (old behavior) will now change the wrapper + mark together → treat as intended; keep proportional scaling to minimize surprises.

