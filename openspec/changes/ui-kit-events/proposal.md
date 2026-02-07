## Why

UI Kit уже используется как формальная спецификация (`contracts` → `states` → `schemas/manifest`) и как источник истины для агентов, но текущая спецификация не описывает события (events), а часть компонентов пока не формализована как “реальные” (product-ready) интерактивные элементы.

Это ограничивает:
- агентное использование (агент не знает, какие события компонент может эмитить и какие payload’ы допустимы);
- продуктовую интеграцию (нужны стабильные handlers + семантика/a11y + формы).

## What Changes

- Добавить формальную **events spec** для интерактивных компонентов UI Kit.
- Разделить “serializable props” (для schemas/states/agents) и “runtime props” (React handlers/refs).
- Расширить generated спецификацию:
  - `manifest.json` содержит `propsSchema` и `events` с `payloadSchema` (где применимо).
- Обновить тесты, чтобы `states` валидировались через **generated JSON Schema** и чтобы drift между контрактами и generated-артефактами детектировался автоматически.
- Обновить реализацию компонентов до product-ready семантики (button/input/checkbox/a11y) без бизнес-логики.

## Capabilities

### New Capabilities
- `ui-kit-events`: Formal events spec + runtime/serializable split for agent-first and product-ready components

### Modified Capabilities
- *(none)*

## Impact

- `packages/ui-kit`
  - контракты компонентов: добавление events spec и runtime handlers;
  - генератор `gen`: новый формат manifest + генерация payload schemas;
  - тесты: schema-based валидация states + no-drift проверки.
- `apps/web`, `apps/fumadocs`
  - остаются потребителями через публичный API; обновления требуются только при изменениях публичного API/контрактов.
