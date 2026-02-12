# Code Standards (Monorepo)

Этот файл фиксирует соглашения по коду и стилю в репозитории. Он дополняет PRD (требования) и `AGENTS.md` (процесс).

## 1) Naming & Files

- **TypeScript/TSX**: PascalCase (например: `Button.tsx`, `SearchInput.tsx`, `ButtonContract.ts`, `ButtonStates.ts`, `ButtonStory.tsx`).
- **Не-скриптовые файлы** (например: JSON schemas, стили): kebab-case.
- **Generated**: `packages/ui-kit/src/generated/**` — коммитится, no-drift обязателен.

Исключения по необходимости инструментов/фреймворков (не переименовываем):

- Next.js App Router: `apps/**/src/app/**/page.tsx`, `layout.tsx`, `route.ts`, и т.п.
- Router/конфиги: `apps/web/src/routes/**`, `apps/fumadocs/.source/**`, `**/*.config.ts`, `**/index.ts`, `**/index.tsx`

## 2) Ternary

- В `.ts` файлах (не `.tsx`) не используем ternary operator (`cond ? a : b`) — предпочитаем `if/else`.
- В JSX (внутри `.tsx`) допускается условный рендеринг через ternary или `&&`.

## 3) Barrel files

- Входные точки пакетов (`packages/ui-kit/src/index.ts`, `packages/ui-kit/src/contracts/index.ts`, `packages/ui-kit/src/states/index.ts`) **могут** быть “barrel files”, это часть публичного API.
- В остальных местах избегаем barrel files.

## 4) React imports

- В `.tsx` использовать named imports из `react` (например: `useState`), избегать `import * as React`.

## 5) Styling

- Любое изменение подхода к стилям в `ui-kit` (inline styles → CSS modules/tokens pipeline) фиксируется в PRD (`packages/ui-kit/PRD.md`) перед массовой миграцией.
- ЗАПРЕЩЕНО использование инлайн стилей в компонентах, за исключением динамических стилей, зависящих от пропсов (например: `style={{ backgroundColor: props.bgColor }}`).

## 6) Generated Code

- Код в `packages/ui-kit/src/generated/**` и `packages/gen-api/src/generated/**` **не должен** быть изменен вручную. - Если изменения в контракте или API требуют обновления сгенерированного кода, сначала обновите контракт/API, затем запустите генерацию (`pnpm -C packages/ui-kit gen` или `pnpm -C packages/gen-api gen`). - Сгенерированные файлы должны быть коммитированы для обеспечения прозрачности изменений и предотвращения дрейфа. ## 7) PRD-driven Development - Все изменения должны соответствовать существующему PRD. Если изменения затрагивают фундаментальные принципы или вводят новые паттерны, PRD должен быть обновлен до начала разработки. - PRD является живым документом, который должен отражать текущие стандарты и соглашения проекта.

- Код в `packages/ui-kit/src/generated/**` и `packages/gen-api/src/generated/**` **не должен** быть изменен вручную.
- Если изменения в контракте или API требуют обновления сгенерированного кода, сначала обновите контракт/API, затем запустите генерацию (`pnpm -C packages/ui-kit gen` или `pnpm -C packages/gen-api gen`).
- Сгенерированные файлы должны быть коммитированы для обеспечения прозрачности изменений и предотвращения дрейфа.

## 7) PRD-driven Development

- Все изменения должны соответствовать существующему PRD. Если изменения затрагивают фундаментальные принципы или вводят новые паттерны, PRD должен быть обновлен до начала разработки.

- Все изменения должны соответствовать существующему PRD. Если изменения затрагивают фундаментальные принципы или вводят новые паттерны, PRD должен быть обновлен до начала разработки.
- PRD является живым документом, который должен отражать текущие стандарты и соглашения проекта.
