## Context

`packages/ui-kit` сегодня уже реализует contract-first (Zod contracts → inferred props types → `states` → generated JSON schemas + `manifest.json`), и используется `apps/web`/`apps/fumadocs` только как consumer.

Проблемы текущего состояния:
- Generated `manifest.json` описывает только schema пути, но не описывает события/интеракции.
- Тесты валидируют `states` Zod-контрактами, но не гарантируют корректность/актуальность generated JSON Schema.
- Часть компонентов реализована без продуктовой семантики (формы/a11y/интеракции), что снижает “product-ready” ценность.

Ограничения:
- `states` обязаны оставаться data-only.
- Specs должны быть пригодны для агентного потребления (детерминированные артефакты, явные контракты).
- Нельзя переносить определение API в `apps/*`.

## Goals / Non-Goals

**Goals:**
- Ввести единый паттерн “serializable props + events spec + runtime props”.
- Сгенерировать machine-readable манифест с `propsSchema` и `events` (payload schemas, если описаны).
- Перевести тесты на schema-based валидацию `states` + проверку no-drift.
- Сделать базовые компоненты product-ready: корректная семантика HTML, a11y, controlled patterns.

**Non-Goals:**
- Визуальный редизайн компонентов или введение новой дизайн-парадигмы.
- Полноценная система темизации/вариантов (кроме минимальных правок для интеракций).
- Storybook/visual regression как цель.

## Decisions

1) **Events spec хранится в ui-kit и не зависит от React**
- Формат: mapping `eventName` → payload contract (Zod).
- Payload по умолчанию — serializable object (может быть `{}`).

2) **Runtime handlers не входят в JSON Schema**
- JSON Schema описывает только serializable props.
- Runtime props = serializable props + `on<Event>` handlers, типизированные от events spec.

3) **Manifest расширяется без ломания потребителей**
- `manifest.json` добавляет `propsSchema` и `events`.
- Для обратной совместимости допускается сохранять `schema` как alias на `propsSchema` (если нужно).

4) **No-drift детектится через тест + root check**
- Тест:
  - валидирует states по generated JSON Schema (через JSON Schema validator);
  - сравнивает generated schemas/manifest с “ожидаемыми” (in-memory generation) для текущих контрактов.
- Root `pnpm check` включает gen/test и проверку чистого `git diff`.

## Risks / Trade-offs

- [Добавление Ajv] → Mitigation: держать его только как devDependency `ui-kit`, использовать draft-07 compat, не расширять runtime bundle.
- (опционально) [Валидатор без зависимости] → Mitigation: держать небольшой validator внутри `scripts/Test.ts`, покрывать только используемый сабсет JSON Schema.
- [Breaking changes в контрактах] → Mitigation: минимальные изменения API, сохранять alias-экспорты, обновлять docs/apps только через публичный API.
- [Сложность типизации events] → Mitigation: выбрать простой и повторяемый паттерн, не вводить сложную метапрограмминг-магии.
