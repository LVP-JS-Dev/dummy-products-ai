# PRD: `packages/gen-api`

## 1. Назначение пакета

`packages/gen-api` — это workspace-пакет, который стандартизирует **генерацию API-клиента из OpenAPI** для использования в приложениях монорепозитория.

Цели:
- единая точка входа для генерации (`pnpm -C packages/gen-api gen`);
- детерминированные generated-артефакты, которые коммитятся и проверяются на no-drift;
- стабильный публичный импорт для consumers: `@dummy-products/gen-api`.

## 2. Границы ответственности

`gen-api` отвечает за:
- OpenAPI input (локальный файл в репозитории) и правила его расположения;
- генерацию TypeScript моделей/схем, клиентского слоя запросов и вспомогательных адаптеров;
- структуру и расположение generated-выходов (commit + no-drift).

`gen-api` НЕ отвечает за:
- кэширование, retries, invalidation, optimistic updates;
- бизнес-логику приложения.

Важно про React Query:
- базовый импорт `@dummy-products/gen-api` остаётся пригодным для использования без React;
- интеграция с React Query предоставляется отдельным entrypoint `@dummy-products/gen-api/react-query` и подключается только при необходимости (React и `@tanstack/react-query` объявлены как optional peer deps).

## 3. Toolchain

Генерация выполняется через **Kubb**:
- `@kubb/cli` + `@kubb/core` (`defineConfig`)
- `@kubb/plugin-oas` (парсинг OpenAPI)
- `@kubb/plugin-ts` (TypeScript types)
- `@kubb/plugin-client` (typed HTTP client, настроен на `fetch`)
- `@kubb/plugin-react-query` (опциональные React Query hooks)
- `@kubb/plugin-zod` (Zod schemas)
- `@kubb/plugin-redoc` (HTML docs)

## 4. Структура пакета

```text
packages/gen-api/
  dummyjson.openapi.yaml    # OpenAPI input (versioned in repo)
  kubb.config.ts            # generator config
  generated/                # generated output (committed, no-drift)
  src/
    index.ts                # public API exports
```

## 5. Generated artifacts (no-drift)

Generated outputs:
- находятся в `packages/gen-api/generated/**`
- коммитятся в репозиторий
- обязаны быть актуальными: `pnpm check` проваливается, если после `pnpm gen` есть diff или появились untracked generated файлы.
