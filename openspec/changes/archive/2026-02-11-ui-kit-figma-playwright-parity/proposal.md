## Why

UI-kit уже расширен, но нет формализованной верификации визуального и поведенческого соответствия Figma по всем публичным компонентам. Нужен повторяемый процесс с параллельным исполнением и фиксированными критериями качества.

## What Changes

- Добавить отдельный change для раунда visual QA всех публичных компонентов UI-kit (`14` компонентов).
- Ввести итерационный цикл Ralph Loop: reference pull (Figma) → runtime capture (Playwright) → diff/diagnose → patch → recheck → baton.
- Вести parity-отчёт по каждому компоненту и состоянию, включая ссылки на скриншоты и статус pass/fail.
- Выполнить целевые правки компонентов и связанных артефактов (`contracts/states/generated/docs/stories`) без breaking изменений.
- Добавить fallback-процедуру на локальные эталоны при недоступности Figma API (`429`).

## Capabilities

### New Capabilities
- `ui-kit-figma-playwright-parity`: Регламент и артефакты для повторяемой верификации соответствия UI-kit компонентам Figma с параллельным выполнением и критериями приёмки.

### Modified Capabilities
- _(none)_

## Impact

- UI Kit: `packages/ui-kit/src/components/*`, `packages/ui-kit/src/contracts/*`, `packages/ui-kit/src/states/*`, `packages/ui-kit/src/generated/*`, `packages/ui-kit/src/tokens.css`.
- Docs/Stories: `apps/fumadocs/content/docs/components/*`, `apps/fumadocs/src/stories/*`.
- Web composition checks: `apps/web/src/routes/login.tsx`, `apps/web/src/routes/products.tsx`.
- QA artifacts: new report and screenshot directories under `openspec/changes/ui-kit-figma-playwright-parity/`.
