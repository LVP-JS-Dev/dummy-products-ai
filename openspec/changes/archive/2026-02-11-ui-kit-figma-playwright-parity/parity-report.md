# UI Kit Figma + Playwright Parity Report

## Scope

- Change: `ui-kit-figma-playwright-parity`
- Components: `Button`, `Card`, `Checkbox`, `Divider`, `Icon`, `Image`, `Input`, `Link`, `PageNumber`, `Pagination`, `SearchInput`, `Spinner`, `Text`, `Toast`
- Ralph Loop: `Reference Pull` → `Runtime Capture` → `Diff & Diagnose` → `Patch` → `Recheck` → `Baton`

## Reference Source

- Primary: Figma nodes `1046:50`, `1046:71`, `1:417`, `1:451`
- Reference summary: `artifacts/figma/reference-summary.json` (TalkToFigma MCP channel `wd3ly4mp`)
- Fallback (if Figma unavailable):
  - `requirements/auth-form.png`
  - `requirements/goods-list.png`
  - `apps/web/src/routes/login.figma-map.md`
  - `apps/web/src/routes/products.figma-map.md`

## Runtime Captures

- Docs component pages:
  - Round 1: `artifacts/screenshots/round1/docs/*.png`
  - Round 2: `artifacts/screenshots/round2/docs/*.png`
- Web routes:
  - Full-page (Round 1): `artifacts/screenshots/round1/web/*.png`
  - Requirements-size (Round 1): `artifacts/screenshots/round1/web-ref/*.png`
  - Requirements-size (Round 2): `artifacts/screenshots/round2/web-ref/*.png`
- Web diffs (raw ImageMagick compare, AE metric):
  - Round 1: `artifacts/diff/round1/*`
  - Round 2: `artifacts/diff/round2/*`

## Parity Matrix

| Component | Group | Round 1 | Round 2 | Notes | Screenshots |
| --- | --- | --- | --- | --- | --- |
| Input | A | FAIL | PASS | Figma auth inputs: 55px height, 12px radius, Inter 18/27; add `ariaLabel` for label-less usage; focus ring via `:focus-within`. | `artifacts/screenshots/round1/docs/input.png`, `artifacts/screenshots/round2/docs/input.png` |
| Button | A | FAIL | PASS | Figma primary button: gradient highlight + primary border stroke, lg size 54px height, 12px radius, Inter semibold with letterSpacing. | `artifacts/screenshots/round1/docs/button.png`, `artifacts/screenshots/round2/docs/button.png` |
| Checkbox | A | FAIL | PASS | Figma checkbox: 24px box, muted label typography, accent fill on checked. | `artifacts/screenshots/round1/docs/checkbox.png`, `artifacts/screenshots/round2/docs/checkbox.png` |
| Link | A | PASS | PASS | `_blank` links include `rel=\"noopener noreferrer\"`; inherit typography from surrounding text. | `artifacts/screenshots/round1/docs/link.png`, `artifacts/screenshots/round2/docs/link.png` |
| SearchInput | A | FAIL | PASS | Figma search: 48px height, 8px radius, muted surface, 24px icon; add `ariaLabel` + placeholder styling. | `artifacts/screenshots/round1/docs/search-input.png`, `artifacts/screenshots/round2/docs/search-input.png` |
| Card | B | PASS | PASS | Token-based container; no breaking changes. | `artifacts/screenshots/round1/docs/card.png`, `artifacts/screenshots/round2/docs/card.png` |
| Divider | B | FAIL | PASS | Add `role=\"separator\"`; typography and line color aligned with Figma (muted, 16/24). | `artifacts/screenshots/round1/docs/divider.png`, `artifacts/screenshots/round2/docs/divider.png` |
| Toast | B | PASS | PASS | Functional; token-based. | `artifacts/screenshots/round1/docs/toast.png`, `artifacts/screenshots/round2/docs/toast.png` |
| Spinner | B | PASS | PASS | Accessible `aria-label` retained; sizes/tone token-based. | `artifacts/screenshots/round1/docs/spinner.png`, `artifacts/screenshots/round2/docs/spinner.png` |
| Image | C | PASS | PASS | Best-practice defaults retained; fallback state produces expected network error for `example.invalid`. | `artifacts/screenshots/round1/docs/image.png`, `artifacts/screenshots/round2/docs/image.png` |
| Text | C | FAIL | PASS | Heading/muted variants aligned closer to Figma login typography (Inter-based). | `artifacts/screenshots/round1/docs/text.png`, `artifacts/screenshots/round2/docs/text.png` |
| Icon | C | PASS | PASS | No regressions detected. | `artifacts/screenshots/round1/docs/icon.png`, `artifacts/screenshots/round2/docs/icon.png` |
| PageNumber | C | FAIL | PASS | Figma pagination pills: 4px radius, accent selection fill, Cairo 14/26 line-height. | `artifacts/screenshots/round1/docs/page-number.png`, `artifacts/screenshots/round2/docs/page-number.png` |
| Pagination | C | FAIL | PASS | Figma: 20px carets, 4px radius numbers, accent selected, subtle borders. | `artifacts/screenshots/round1/docs/pagination.png`, `artifacts/screenshots/round2/docs/pagination.png` |

## Baton

### Round 1

- Reference Pull
  - `framelink_mcp_for_figma` returned `429` in this run; TalkToFigma channel `wd3ly4mp` was used for node inspection/exports (e.g. `1046:50`, `1046:71`, `1:451`, `1002:2846`, `1:417`).
- Runtime Capture
  - Captured docs component pages: `artifacts/screenshots/round1/docs/*.png`.
  - Captured web routes:
    - Full-page: `artifacts/screenshots/round1/web/*.png`
    - Requirements-size: `artifacts/screenshots/round1/web-ref/*.png`
- Diff & Diagnose
  - Requirements pixel-diff (raw ImageMagick AE, not normalized for rendering differences):
    - `/login` vs `requirements/auth-form.png`: `96.0348%` different pixels (`artifacts/diff/round1/login-diff.png`)
    - `/products` vs `requirements/goods-list.png`: `88.5220%` different pixels (`artifacts/diff/round1/products-diff.png`)
  - Key component-level deltas: token values (border/surface/text), radii (4/8/12), control heights (55/48/54), auth typography.
- Patch
  - Aligned token surface and updated affected components; regenerated schemas/manifest; updated token docs.

### Round 2

- Runtime Capture
  - Captured recheck docs screenshots: `artifacts/screenshots/round2/docs/*.png`.
  - Captured requirements-size web screenshots: `artifacts/screenshots/round2/web-ref/*.png`.
- Behavior/A11y spot-checks (docs pages)
  - `Input` inputs have accessible names (label association) and focus styling via `:focus-within`.
  - `SearchInput` has `aria-label`.
  - External `_blank` links include `rel=\"noopener noreferrer\"`.
  - Pagination has `aria-current=\"page\"` for selected.
  - Divider has `role=\"separator\"`.
- Diff (raw ImageMagick AE)
  - `/login` vs `requirements/auth-form.png`: `94.9943%` different pixels (`artifacts/diff/round2/login-diff.png`)
  - `/products` vs `requirements/goods-list.png`: `87.5754%` different pixels (`artifacts/diff/round2/products-diff.png`)
