## Why

Component stories in documentation are currently styled by Fumadocs defaults (fonts + `.prose` typography rhythm), so they do not match the visual appearance of the real web/app UI. We need a token-driven “story preview” mode so component pages can be used for reliable visual QA against the product styling.

## What Changes

- Add public UI Kit typography scale tokens (font sizes + line-heights) so app-like type scale and rhythm can be expressed via CSS variables.
- Apply a scoped “UI story preview” theme for docs component pages (`content/docs/components/*`) that:
  - Loads the same Google Fonts as the web app
  - Maps docs theme variables to UI Kit tokens (colors, borders, etc.)
  - Overrides `.prose` typography to use UI Kit tokens for font families, sizes, line-heights, and spacing rhythm
- Ensure the preview theme is limited to component story pages only, leaving the rest of the docs UI unchanged.

## Capabilities

### New Capabilities
- `ui-kit-typography-tokens`: Defines a public, documented typography scale (font-size + line-height tokens) in `@dummy-products/ui-kit/tokens.css` for app-like type rhythm and consistent visual testing.

### Modified Capabilities
- `fumadocs-docs`: Component story pages MUST support a scoped “UI story preview” theme that is fully driven by UI Kit tokens (including typography sizes and rhythm) to match the web/app appearance.

## Impact

- UI Kit token surface and documentation:
  - `packages/ui-kit/src/tokens.css`
  - `packages/ui-kit/src/tokens.docs.json`
  - docs generation checks that validate metadata completeness
- Fumadocs rendering and styling:
  - `apps/fumadocs/src/app/global.css` (font import + scoped overrides)
  - docs page rendering for `/docs/components/*` to apply the scoped preview theme
