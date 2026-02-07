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

---

## Команды

Из корня:

| Команда | Что делает |
|---|---|
| `pnpm dev` | Запускает `apps/web` и `apps/fumadocs`. |
| `pnpm gen` | Генерирует спецификацию UI Kit (schemas + manifest). |
| `pnpm test` | Контрактные тесты UI Kit (валидация `states` по контрактам). |
| `pnpm check` | Полный гейт: gen + test + no-drift (generated артефакты должны быть актуальны). |

---

## Как устроена система

### Contract-first

В `packages/ui-kit` каждый компонент имеет контракт (runtime schema).
От контракта производятся:
- TS типы props
- states (fixtures)
- JSON Schema + `manifest.json`

### `states` — публичный API

states экспортируются из `@repo/ui-kit` и используются:
- в docs как примеры
- в тестах как контрактные фикстуры
- как input для агентной разработки

### Docs не являются source of truth

Docs (Fumadocs) отображают компоненты и states, а интерактивность даёт Story.
Stories живут в `apps/fumadocs` и импортируют states из `@repo/ui-kit`.

---

## Workflow: добавить новый компонент

Высокоуровнево:

1) **Контракт**  
   `packages/ui-kit/src/contracts/<name>.contract.ts`

2) **Компонент**  
   `packages/ui-kit/src/components/<Name>.tsx`

3) **States**  
   `packages/ui-kit/src/states/<name>.states.ts`  
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
   - `apps/fumadocs/content/components/<name>.mdx`

Полный порядок и правила см. в `AGENT.md`.

---

## Требования и управление изменениями

Требования разбиты по пакетам:
- `PRD.md` — системные принципы (root)
- `packages/ui-kit/PRD.md` — контракты, states, спецификация
- `apps/fumadocs/PRD.md` — docs + Story правила
- `apps/web/PRD.md` — требования к main app

Правило:
- если изменение выходит за рамки требований или меняет инварианты, сначала обновляется соответствующий PRD, потом код.

Подробно: `AGENT.md`.

---

## Спецификация для агентов

UI Kit генерирует:
- `packages/ui-kit/src/generated/schemas/*.schema.json`
- `packages/ui-kit/src/generated/manifest.json`

`manifest.json` — входная точка для инструментов/агентов: индекс компонентов и путей к схемам.

---

## Non-goals

- Полноценная замена Storybook (аддоны, visual testing и т.п.)
- Backend, auth, database
- Большой дизайн-системный объём

---

## License

MIT
