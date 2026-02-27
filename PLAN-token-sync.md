# План синхронизации токенов: spec ↔ CSS

**Ветка:** `fix/styles`  
**Дата:** 2026-02-26  
**Цель:** Полная синхронизация токенов между `tokens.spec.json` (источник истины) и `tokens.css`

---

## Проблема

Валидация `pnpm tokens:validate` выявила 27 расхождений:
- 7 deprecated aliases (не используются)
- 10 алиасов, которые можно заменить на токены из spec
- 8 семантических токенов, отсутствующих в spec
- 2 токена требуют решения

---

## Фаза 1: Обновление спецификации (2 задачи)

### 1.1 Добавить 8 semantic токенов в `tokens.spec.json`

| Токен | Значение | Роль |
|-------|----------|------|
| `--ui-color-overlay` | `rgb(17 24 39 / 45%)` | Modal overlay |
| `--ui-color-success` | `#15803d` | Success text/icon |
| `--ui-color-success-surface` | `#dcfce7` | Success background |
| `--ui-color-info` | `#2563eb` | Info text/icon |
| `--ui-color-warning` | `#d97706` | Warning text/icon |
| `--ui-color-danger` | `#dc2626` | Error text/icon |
| `--ui-color-danger-surface` | `#fee2e2` | Error background |
| `--ui-color-card-surface` | `#232323` | Dark card background |

### 1.2 Добавить `--ui-space-10xl: 24px` в `tokens.spec.json`

---

## Фаза 2: Миграция в компонентах (12 задач)

| # | Старый токен | Новый токен | Файлы |
|---|--------------|-------------|-------|
| 2.1 | `--ui-color-focus-ring` | `--ui-color-accent` | SearchInput.tsx, products.tsx |
| 2.2 | `--ui-color-link` | `--ui-color-primary` | Link.tsx |
| 2.3 | `--ui-color-surface-app` | `--ui-color-page-background` | index.css (apps/web) |
| 2.4 | `--ui-color-surface-auth` | `--ui-color-auth-background` | index.css (apps/web) |
| 2.5 | `--ui-color-text-secondary` | `--ui-color-text-body` | products.tsx |
| 2.6 | `--ui-color-card-border` | `--ui-color-surface` | Tokens.ts |
| 2.7 | `--ui-color-border-control` | `--ui-color-icon-muted` | Input.tsx, Checkbox.tsx |
| 2.8 | `--ui-color-border-strong` | `--ui-color-border-row` | products.tsx |
| 2.9 | `--ui-color-border-secondary` | `--ui-color-border-subtle` | Button.tsx |
| 2.10 | `--ui-color-checkbox-checked` | `--ui-color-checkbox-selected` | Checkbox.tsx, products.tsx |
| 2.11 | `--ui-color-border-faint` | `--ui-color-border` | Divider.tsx |
| 2.12 | `--ui-space-xxl` | `--ui-space-10xl` | Spinner.tsx, Modal.tsx |

---

## Фаза 3: Очистка CSS (3 задачи)

### 3.1 Удалить 7 deprecated aliases из `tokens.css`

```css
--ui-color-white
--ui-color-blue-primary
--ui-color-blue-accent
--ui-color-gray-200
--ui-color-gray-400
--ui-color-text-primary
--ui-color-green-soft
```

### 3.2 Удалить 11 мигрированных алиасов из `tokens.css`

```css
--ui-color-focus-ring
--ui-color-link
--ui-color-surface-app
--ui-color-surface-auth
--ui-color-text-secondary
--ui-color-card-border
--ui-color-border-control
--ui-color-border-strong
--ui-color-border-secondary
--ui-color-checkbox-checked
--ui-color-border-faint
--ui-space-xxl
```

### 3.3 Удалить те же 18 токенов из `tokens.docs.json`

---

## Фаза 4: Обновление TypeScript (1 задача)

### 4.1 Обновить `Tokens.ts`

- Удалить экспорты deprecated алиасов
- Обновить имена на соответствие spec

---

## Фаза 5: Верификация (3 задачи)

| # | Команда | Ожидаемый результат |
|---|---------|---------------------|
| 5.1 | `pnpm docs:generate-tokens` | Успешная генерация |
| 5.2 | `pnpm tokens:validate` | `✅ All tokens in sync!` |
| 5.3 | `pnpm check` | Все проверки пройдены |

---

## Итого

| Фаза | Задач | Оценка времени |
|------|-------|----------------|
| 1. Spec | 2 | 5 мин |
| 2. Миграция | 12 | 15 мин |
| 3. Очистка | 3 | 5 мин |
| 4. TypeScript | 1 | 3 мин |
| 5. Верификация | 3 | 2 мин |
| **Всего** | **21** | **~30 мин** |

---

## Критерии готовности (DoD)

- [x] `pnpm tokens:validate` выводит `✅ All tokens in sync!`
- [x] `pnpm docs:check-tokens` проходит без ошибок
- [x] `pnpm check` проходит полностью
- [x] Все компоненты используют токены из spec
- [x] Deprecated алиасы удалены из CSS и docs.json
