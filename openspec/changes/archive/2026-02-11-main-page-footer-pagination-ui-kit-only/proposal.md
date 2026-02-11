## Why

На странице товаров элементы управления должны быть собраны из доступных компонентов `@dummy-products/ui-kit`, чтобы избежать расхождений с дизайн-системой и закрепить единый UX для пагинации в футере таблицы.

## What Changes

- Формализовать на уровне требований: футер пагинации на `/products` использует доступные компоненты UI-kit (в частности `Pagination`, а также `SearchInput`/`Button` там, где они применимы).
- Уточнить поведение футера в режимах обычного списка и активного поиска: одинаковые состояния (loading/disabled), одинаковые aria-лейблы и правила границ.
- Добавить/обновить route-level тесты, которые подтверждают использование UI-kit компонента пагинации и корректные запросы с `limit`/`skip` (+ `q` в режиме поиска).

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `web-products-catalog`: требования к футеру пагинации с обязательным использованием доступных UI-kit компонентов.
- `web-products-search-and-create`: требования к пагинации в режиме поиска с теми же UI-kit примитивами и состояниями.

## Impact

- Affected code: `apps/web/src/routes/products.tsx`.
- Affected tests: `apps/web/src/test/Products.test.tsx`.
- Affected docs: `apps/web/src/routes/products.figma-map.md`.
- Dependencies: только `@dummy-products/ui-kit` (без новых внешних зависимостей).
