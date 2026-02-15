# Contract-first UI Monorepo

Monorepo с **UI Kit (contract-first)**, **main app (TanStack Router)** и **docs (Next.js + Fumadocs Story)**.

Идея проекта: сделать UI не только визуальным набором компонентов, но и **формальной, машиночитаемой системой**:
- контракты как источник истины
- `states` как публичный API и валидные примеры
- генерация спецификации (JSON Schema + manifest)
- docs и приложение как потребители, а не “вторая правда”

---

## Состав репозитория

```txt
apps/
  web/            # Main app (TanStack Router) — “продуктовое” использование UI Kit
  fumadocs/       # Docs (Next.js + Fumadocs) — документация + интерактивные story
packages/
  ui-kit/         # UI Kit — contracts + components + states + generated spec
  gen-api/        # Gen API — OpenAPI -> typed client/types (Kubb), committed generated output
```

---

## Быстрый старт

```bash
pnpm i
pnpm dev
```

Обычно поднимаются:
- main app: `apps/web`
- docs: `apps/fumadocs`

## CI/CD и деплой

- CircleCI собирает `web` и `docs` образы и пушит в GHCR по `push` в `main` (и через ручной триггер).
- npm пакет `packages/burlaki` публикуется только по тегам `vX.Y.Z` с проверкой версии.
- Докплой разворачивает по digest для воспроизводимости.

Подробности и локальный fallback: `deploy/README.md`.

## Roadmap

- Source: `docs/ROADMAP.md`
- Generated view: `docs/ROADMAP.generated.md` (обновляется через `pnpm roadmap:gen`)

## Configuration management

See `docs/configuration.md` for the configuration layout, decision rationale,
and instructions for adding new tool configs.

## MCP Environment (`.env.mcp`)

Файл `.env.mcp` используется MCP-серверами (например Figma MCP) для переменных окружения, которые нужны только MCP-интеграциям.

- Храните в нем только MCP-переменные (минимально необходимый набор).
- Обычно это токены вида `FIGMA_API_KEY`/`FIGMA_ACCESS_TOKEN` (точный набор зависит от MCP-сервера).
- Файл чувствительный: не коммитьте его в репозиторий.

## Submission (reviewer entrypoint)

- Run + verification checklist: `SUBMISSION.md`
- AI usage disclosure: `AI_USAGE.md`

---

## Команды

Из корня:

| Команда | Что делает |
|---|---|
| `pnpm dev` | Запускает `apps/web` и `apps/fumadocs`. |
| `pnpm gen` | Генерирует все generated-артефакты (UI Kit spec + Gen API client). |
| `pnpm gen:ui` | Генерирует спецификацию UI Kit (schemas + manifest). |
| `pnpm gen:api` | Генерирует typed API client из OpenAPI (Kubb). |
| `pnpm test` | Контрактные тесты UI Kit (валидация `states` по контрактам). |
| `pnpm e2e` | Запускает Playwright E2E тесты для `apps/web`. |
| `pnpm e2e:ui` | Запускает Playwright UI runner. |
| `pnpm check` | Полный гейт: gen + test + no-drift (generated артефакты должны быть актуальны). |

---

## E2E тесты (apps/web)

```bash
pnpm e2e
```

Playwright сам поднимет `apps/web` через встроенный `webServer` в `playwright.config.ts`.

---

## Как устроена система

### Contract-first

В `packages/ui-kit` каждый компонент имеет контракт (runtime schema).
От контракта производятся:
- TS типы props
- states (fixtures)
- JSON Schema + `manifest.json`

### `states` — публичный API

states экспортируются из `@dummy-products/ui-kit` и используются:
- в docs как примеры
- в тестах как контрактные фикстуры
- как input для агентной разработки

### Docs не являются source of truth

Docs (Fumadocs) отображают компоненты и states, а интерактивность даёт Story.
Stories живут в `apps/fumadocs` и импортируют states из `@dummy-products/ui-kit`.

---

## Workflow: добавить новый компонент

Высокоуровнево:

1) **Контракт**  
   `packages/ui-kit/src/contracts/<Name>Contract.ts`

2) **Компонент**  
   `packages/ui-kit/src/components/<Name>.tsx`

3) **States**  
   `packages/ui-kit/src/states/<Name>States.ts`  
   Минимум 3 состояния (default, variant, edge-case)

4) **Экспорт**  
   `packages/ui-kit/src/index.ts` и `packages/ui-kit/src/states/index.ts`

5) **Генерация и тесты**

```bash
pnpm -C packages/ui-kit gen
pnpm -C packages/ui-kit test
```

6) **Docs**
   - `apps/fumadocs/src/stories/<name>.story.tsx` (client component)
   - `apps/fumadocs/content/docs/components/<name>.mdx`

Полный порядок и правила см. в `.ruler/agent.md`.

---

## Требования и управление изменениями

Требования разбиты по пакетам:
- `PRD.md` — системные принципы (root)
- `packages/ui-kit/PRD.md` — контракты, states, спецификация
- `apps/fumadocs/PRD.md` — docs + Story правила
- `apps/web/PRD.md` — требования к main app

Правило:
- если изменение выходит за рамки требований или меняет инварианты, сначала обновляется соответствующий PRD, потом код.

Подробно: `.ruler/agent.md`.

---

## Спецификация для агентов

UI Kit генерирует:
- `packages/ui-kit/src/generated/schemas/*.schema.json`
- `packages/ui-kit/src/generated/manifest.json`

`manifest.json` — входная точка для инструментов/агентов: индекс компонентов и путей к схемам.

---

## `packages/gen-api` (OpenAPI client generation)

`packages/gen-api` — workspace-пакет, который стандартизирует генерацию typed API-клиента из OpenAPI и даёт единый импорт для consumers:

```ts
import { login, listProducts } from "@dummy-products/gen-api";
```

Зачем нужен:
- чтобы не держать “ручные” API-обёртки в `apps/*` без общей схемы и правил;
- чтобы generated output был детерминированным, коммитился и проверялся на no-drift;
- чтобы toolchain и структура выходов были однозначно задокументированы.

Toolchain:
- Kubb: `@kubb/cli` + `@kubb/core`
- Plugins: `@kubb/plugin-oas`, `@kubb/plugin-ts`, `@kubb/plugin-client` (client на `fetch`), `@kubb/plugin-zod`, `@kubb/plugin-redoc` (+ опционально `@kubb/plugin-react-query`)

Важно:
- базовый импорт `@dummy-products/gen-api` остаётся пригодным для использования без React
- React Query entrypoint есть отдельным экспортом `@dummy-products/gen-api/react-query` (React и `@tanstack/react-query` — optional peer deps)
- кэш/инвалидация/ретраи делаются в app-layer (например, `apps/web`) поверх `@dummy-products/gen-api`/хуков

---

## CI/CD

- Сборка с помощью GitLab CI/CD

__раздел будет дополняться__

---

## Non-goals

- Полноценная замена Storybook (аддоны, visual testing и т.п.)
- Backend, auth, database
- Большой дизайн-системный объём

---

## License

MIT
