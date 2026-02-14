# E2E Checklist (FR-1..FR-7)

Scope: automated end-to-end verification for functional requirements in `apps/web`.

## FR-1. Форма входа

- [ ] Submit with empty fields → required validation errors appear.
- [ ] Invalid credentials → API error is shown under the form.

## FR-2. Remember me

- [ ] Checkbox ON → auth stored in `localStorage` (`dummy-products.auth`).
- [ ] Checkbox OFF → auth stored in `sessionStorage` only.
- [ ] Session persists across new context when ON.
- [ ] Session does not persist across new context when OFF.

## FR-3. Вывод списка товаров

- [ ] Products request is made to API and table renders results.
- [ ] Progress indicator appears while loading and resolves when loaded.
- [ ] Pagination controls render and are disabled/enabled at edges.

## FR-4. Сортировка

- [ ] Sorting by price or rating updates row order.
- [ ] Sorting indicator toggles direction.
- [ ] Sorting state is preserved after reload.

## FR-5. Добавление товара

- [ ] Add form opens from “Добавить”.
- [ ] Required field validation shows 4 errors.
- [ ] Successful add shows toast and closes modal.

## FR-6. Логика отображения рейтинга

- [ ] Rating `< 3` renders in red.

## FR-7. Поиск товаров

- [ ] Search query uses API and renders results.
