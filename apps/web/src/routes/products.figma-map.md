# Products Figma Mapping

Source: `requirements/goods-list.png` and Figma node `1:451` from the assignment link (`https://www.figma.com/design/zZovsAwSXtBZAWKhXS40Pj/Aiti-Guru-%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5?node-id=1-451`).

## Pagination Structure

1. Compact pagination row aligned to the table footer area.
2. Left chevron control for previous page.
3. Numeric page buttons with one active page.
4. Right chevron control for next page.
5. Disabled state on boundary pages.

## Accessibility Notes

- Active page uses `aria-current="page"`.
- Boundary controls are represented as native disabled `button` elements.
- Prev/next controls are labeled with explicit names: `Previous page` and `Next page`.

## Intentional Deviations

- The implementation uses existing UI-kit tokens and icon assets (`caret_left`, `caret_right`) to stay within current design system primitives.
- The current UI renders a centered window of visible page buttons without ellipsis in v1; this keeps behavior deterministic and aligned with the existing product constraints.
- Direct Figma API extraction for node `1:451` was rate-limited during implementation (`429`), so visual comparison was performed against the provided assignment image and the design URL.

## Playwright Validation

Validated on February 10, 2026, via Playwright in `apps/fumadocs` (`/docs/components/pagination`):
- Clicking `Следующая страница` in interactive example increments page value (`3 -> 4`).
- Setting current page to `1` disables `Предыдущая страница` in interactive example.
