# Figma Parity Report (Auth + Products)

## Scope

- Figma source file: `0X0Ez6ixeONpSKwr3njSLd`
- Channel: `q7ox9jhh`
- Compared screens:
  - Auth desktop (`1046:50`)
  - Products desktop/full page (`1:368`)

## Token sync summary

Synced into UI Kit:

- Fonts:
  - Added `--ui-font-mono` (`Roboto Mono` stack)
- Screen-level colors:
  - Added `--ui-color-surface-app` (`#f6f6f6`)
  - Added `--ui-color-surface-auth` (`#f9f9f9`)
  - Added `--ui-color-border-strong` (`#e2e2e2`)
  - Added `--ui-color-text-secondary` (`#333333`)

## Key UI divergences found and fixed

1. Products table header/cells were not aligned to Figma spacing/alignment.
   - Fixed column center alignment for vendor/article/rating/price.
   - Fixed header paddings and row paddings.
2. Products table row visuals differed from Figma values.
   - Fixed image tile size `48x48`, border color, row divider color.
   - Fixed action pill button geometry (`52x27`, radius `23`).
3. Typography mismatches in products data cells.
   - Price now uses `var(--ui-font-mono)`.
   - Vendor/article/rating text sizes and line heights aligned to Figma.
4. Screen background/card radius mismatches.
   - Products shell now uses `--ui-color-surface-app`.
   - Auth shell now uses `--ui-color-surface-auth`.
   - Products card radius set to `12`.

## Automated screenshot diff

Artifacts:

- Captured screenshots:
  - `openspec/changes/ui-kit-figma-playwright-parity/artifacts/screenshots/round1/web-requirements/login.png`
  - `openspec/changes/ui-kit-figma-playwright-parity/artifacts/screenshots/round1/web-requirements/products.png`
- Diff images:
  - `openspec/changes/ui-kit-figma-playwright-parity/artifacts/diffs/round1/login-diff.png`
  - `openspec/changes/ui-kit-figma-playwright-parity/artifacts/diffs/round1/products-diff.png`
- JSON summary:
  - `openspec/changes/ui-kit-figma-playwright-parity/artifacts/diffs/round1/requirements-diff.json`
  - `openspec/changes/ui-kit-figma-playwright-parity/artifacts/diffs/round2/requirements-diff.json`

Result snapshot:

- Login diff: `17.0078%`
- Products diff: `13.1616%`

Round 2 (deterministic mock capture aligned to Figma content state):

- Login diff: `16.8321%`
- Products diff: `12.6708%`

Round 2 capture script:

- `scripts/ui-kit-parity/capture-web-figma-state.mjs`

## Functional requirements status

From `requirements/requirement.md`:

- [x] Login required field validation.
- [x] Login API error handling.
- [x] Remember me persistence/session behavior.
- [x] Products list from API with progress indicator.
- [x] Column sorting with stored state.
- [x] Add product form with required fields + success toast (local only).
- [x] Rating `< 3` red highlight.
- [x] Search products via API.

## Notes

- TalkToFigma full tree scan timed out; export was assembled from accessible node snapshots and used to drive token sync.
- `pnpm check` is expected to fail in this branch while changes are uncommitted because check includes `git diff --exit-code`.

## UI Kit deep-pass (post round7)

Applied component-level baseline tuning in UI Kit:

- `Input`: auth-control border switched to `--ui-color-border-control`.
- `Button`: primary variant now uses `--ui-color-primary-border` stroke and Cairo-equivalent `md` metrics.
- `Checkbox`: unchecked stroke switched to `--ui-color-border-control`.
- `SearchInput`: placeholder/icon tone and typography aligned.
- `Pagination`: compact spacing tuning.

Added token:

- `--ui-color-border-control` (`#c9c9c9`)

Round 8 after UI Kit deep-pass:

- Login diff: `16.8353%`
- Products diff: `12.8033%`

Round 9-10 (`VITE_FIGMA_PARITY=true` deterministic mode):

- Round 9: login `16.8353%`, products `12.8067%`
- Round 10: login `16.8353%`, products `12.8067%`

Parity mode adjustments:

- Products table sorting is suppressed in parity mode.
- Footer shown-range uses API `limit` in parity mode.
- Router devtools are hidden unless explicitly enabled.
