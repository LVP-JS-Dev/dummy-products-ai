# Operational Rules for Contract-First UI Monorepo

## 0. Назначение файла

Этот файл описывает как вносить изменения в репозиторий.

`AGENT.md` обязателен к прочтению:

- для ИИ-агента,
- для любого контрибьютора,
- перед началом работы над фичей или рефакторингом.

`AGENT.md` не описывает требования (это делают PRD),
он описывает процесс и порядок действий.

---

## 1. Базовые инварианты (НЕ обсуждаются)

1. `packages/ui-kit` — единственный источник истины для UI API.
2. **Контракты → Types → States → Docs → Apps** (односторонний поток).
3. `states` — публичный API, а не demo-примеры.
4. Docs и Main App не определяют props, states или контракты.
5. Generated-артефакты (schemas, manifest) обязаны быть актуальными.

Нарушение любого пункта = архитектурная ошибка.

---

## 1.1 Generated-артефакты и ревью

1. Generated-код не является объектом ручного ревью:
   - `packages/ui-kit/src/generated/**`
   - `packages/gen-api/generated/**`
   - `apps/web/src/routeTree.gen.ts`
   - `**/*.gen.ts`
2. Линтеры и агент-ревьюверы обязаны игнорировать эти пути; любые замечания по ним невалидны.

---

## 2. Архитектура проекта

```text
apps/
  web/          # Main app (Vite + TanStack Router) — продуктовое использование UI Kit
  fumadocs/     # Docs (Next.js + Fumadocs) — документация + интерактивные stories
packages/
  ui-kit/       # UI Kit — contracts + components + states + generated spec
  gen-api/      # Generated typed API client from OpenAPI (Kubb)
  agent-orchestrator/ # Agent workflow orchestration: skill matrix + skill gate
  config/       # Shared config (biome, TypeScript)
  env/          # Environment validation (zod)
```

### Контракты и ключевые пути

- `packages/ui-kit/src/contracts/*.ts` — Zod schemas (React-free)
- `packages/ui-kit/src/components/*.tsx` — React-компоненты
- `packages/ui-kit/src/states/*.ts` — Serializable fixtures
- `packages/ui-kit/src/generated/` — JSON schemas + manifest.json

---

## 3. Команды

### Разработка

```bash
pnpm dev              # Запуск web + fumadocs
pnpm dev:web          # Только web app
```

### Генерация

```bash
pnpm gen              # Все артефакты (UI Kit + API client)
pnpm gen:ui           # UI Kit schemas + manifest
pnpm gen:api          # Typed API client (Kubb)
```

### Тестирование

```bash
pnpm test             # UI Kit контрактные тесты
pnpm e2e              # Playwright E2E для web
pnpm e2e:ui           # Playwright UI runner
```

### Quality gates

```bash
pnpm check            # Полный гейт: gen + test + docs:check-tokens + no-drift
pnpm check-types      # TypeScript type checking
pnpm fix              # Auto-fix lint (ultracite)
```

### Per-package

```bash
pnpm -C packages/ui-kit gen     # UI Kit только
pnpm -C packages/ui-kit test    # UI Kit тесты
pnpm -C packages/gen-api gen    # API client только
pnpm -C packages/agent-orchestrator skills:gate -- \
  --matrix ./agent-skills-matrix.json \
  --stage coder \
  --agent claude
```

---

## 4. Какой файл читать первым

Перед началом работы агент обязан определить контекст:

| Задача                 | Читать                 |
| ---------------------- | ---------------------- |
| Общая ориентация       | PRD.md (root)          |
| Работа с компонентами  | packages/ui-kit/PRD.md |
| Работа с документацией | apps/fumadocs/PRD.md   |
| Работа с приложением   | apps/web/PRD.md        |
| Процесс и шаги         | AGENT.md (этот файл)   |

---

## 5. Decision flow: можно ли сразу писать код?

Перед началом работы агент обязан ответить на вопрос:

**Укладывается ли изменение в существующий PRD?**

### 5.1 Если ДА

- Сохранить PRD без изменений
- Следовать шагам из этого файла
- Делать изменения локальными

### 5.2 Если НЕТ

- агент сначала предлагает изменения в PRD
- код не пишется, пока PRD не обновлён

**Важно:** агент не имеет права вводить новые паттерны без фиксации в PRD.

---

## 6. Типовые сценарии и точные шаги

### Сценарий A: Добавление нового компонента (основной)

Шаги (строго в этом порядке)

1. **Контракт**: `packages/ui-kit/src/contracts/<Name>Contract.ts`
   - описать props
   - не использовать React
2. **Компонент**: `packages/ui-kit/src/components/<Name>.tsx`
   - props только из контракта
   - без бизнес-логики
3. **States**: `packages/ui-kit/src/states/<Name>States.ts`
   - минимум 3 состояния
   - data-only
   - без функций
4. **Экспорт**
   - `packages/ui-kit/src/index.ts`
   - `packages/ui-kit/src/states/index.ts`
5. **Генерация и тесты**:

   ```bash
   pnpm -C packages/ui-kit gen
   pnpm -C packages/ui-kit test
   ```

6. **Docs**
   - Story: `apps/fumadocs/src/stories/<Name>Story.tsx`
     - `'use client'`
     - экспорт story
   - MDX: `apps/fumadocs/content/components/<name>.mdx`
     - использовать states из ui-kit
     - `<story.WithControl />`

---

### Сценарий B: Изменение контракта существующего компонента

1. Обновить контракт
2. Обновить компонент
3. Обновить states
4. Перегенерировать schemas + manifest
5. Обновить docs (если API изменился)
6. Проверить PRD:
   - если изменение расширяет правила → обновить PRD

---

### Сценарий C: Изменение документации

Допустимо:

- тексты
- структура MDX
- Story presentation

Запрещено:

- добавлять новые states
- менять shape props
- определять поведение компонентов

---

### Сценарий D: Изменение manifest / спецификации

**Важно:** всегда требует обновления PRD (`packages/ui-kit/PRD.md`).

Порядок:

1. PRD
2. Генератор
3. Generated files
4. Consumers (docs / tools)

---

## 7. Обновление PRD (Change Management)

### 7.1 Когда PRD ОБЯЗАН быть обновлён

- добавление новых полей в manifest.json
- изменение требований к states
- изменение роли пакета
- ослабление или усиление инвариантов
- новый допустимый паттерн

### 7.2 Какой PRD обновлять

| Изменение                 | PRD                    |
| ------------------------- | ---------------------- |
| Архитектурный принцип     | Root PRD               |
| Контракты / states / spec | packages/ui-kit/PRD.md |
| Docs / Story / MDX        | apps/fumadocs/PRD.md   |
| UX / Routing              | apps/web/PRD.md        |

### 7.3 Порядок

1. PRD
2. Код
3. PR с указанием PRD impact

---

## 8. Обязательные команды перед PR

Из корня репозитория:

```bash
pnpm gen
pnpm test
pnpm check
```

PR не может быть принят, если `pnpm check` не проходит.

---

## 9. Требования к PR-описанию

Каждый PR обязан содержать:

### What

Кратко: что изменено

### Why

Зачем это изменение

### How to verify

Команды + куда смотреть

### PRD impact

- [ ] Root PRD
- [ ] UI Kit PRD
- [ ] Docs PRD
- [ ] Web PRD

Если PRD не изменялся — это должно быть явно указано.

---

## 10. Запрещённые действия (жёстко)

Агенту запрещено:

- менять UI Kit из `apps/*`
- добавлять props без контракта
- создавать states только для docs
- коммитить generated файлы без `gen`
- "угадывать" архитектурные решения

---

## 11. Поведение при неопределённости

Если агент:

- не уверен, укладывается ли изменение в PRD
- не понимает архитектурное последствие

Он обязан остановиться и:

1. явно сформулировать вопрос
2. предложить вариант изменения PRD
3. дождаться подтверждения

---

## 12. Короткая формула системы (для агента)

**PRD определяет правила → AGENT определяет процесс → код следует им.**

---

## 13. Работа с сессиями (Git Worktree)

### 13.1 Зачем нужны сессии

Для изолированной параллельной работы над несколькими задачами:
- Каждая сессия получает свою git-ветку из ветки `develop`
- Каждая сессия имеет отдельный worktree (изолированная копия репозитория)
- Все git-команды автоматически логируются
- Полный аудит всех изменений в сессии

### 13.2 Команды для работы с сессиями

```bash
# Начать сессию
bash .claude/skills/session-worktree/session.sh start <slug> "<description>"

# Пример
bash .claude/skills/session-worktree/session.sh start "add-auth" "Add user authentication"

# Получить информацию о сессии
bash .claude/skills/session-worktree/session.sh info <session-id>

# Список всех активных сессий
bash .claude/skills/session-worktree/session.sh list

# Завершить сессию (сохранить лог, оставить worktree)
bash .claude/skills/session-worktree/session.sh end <session-id>

# Завершить сессию и удалить worktree
bash .claude/skills/session-worktree/session.sh end <session-id> --remove

# Удалить worktree сессии
bash .claude/skills/session-worktree/session.sh remove <session-id>
```

### 13.3 Структура сессии

```
.tmp/
  ├── sessions/
  │   └── <timestamp>/
  │       ├── context.md          # Контекст и описание задачи
  │       ├── git-log.md          # Лог всех git-команд
  │       ├── manifest.md         # Что сделано (deliverables)
  │       └── metadata.json       # Метаданные сессии
  └── worktrees/
      └── <timestamp>/
          └── <repo-files>        # Изолированная копия через worktree
```

### 13.4 Workflow с сессиями

**Перед началом работы:**
1. Запустить сессию:
   ```bash
   bash .claude/skills/session-worktree/session.sh start "<slug>" "<description>"
   ```
2. Перейти в worktree:
   ```bash
   cd .tmp/worktrees/<timestamp>
   ```
3. Работать как обычно - все команды логируются автоматически

**После завершения работы:**
1. Завершить сессию:
   ```bash
   bash .claude/skills/session-worktree/session.sh end <session-id> --remove
   ```
2. Ветка сохраняется для создания PR
3. Worktree удаляется, session-файлы архивируются

### 13.5 Параллельная работа

Можно работать над несколькими задачами одновременно:

```bash
# Терминал 1: Auth feature
bash .claude/skills/session-worktree/session.sh start "add-auth" "Add user authentication"
cd .tmp/worktrees/<timestamp1>

# Терминал 2: Login fix (параллельно)
bash .claude/skills/session-worktree/session.sh start "fix-login" "Fix login bug"
cd .tmp/worktrees/<timestamp2>
```

### 13.6 Когда использовать сессии

- Параллельная работа над несколькими фичами
- Безопасный рефакторинг (если что-то сломается - просто удалить worktree)
- PR-ревью с изменениями (отдельная ветка от review-сессии)
- Эксперименты и прототипы

### 13.7 Интеграция с workflow

Агент обязан использовать сессии при работе над задачами:
- Создавать сессию перед началом работы
- Логировать все git-команды через git-log.md
- Завершать сессию после завершения задачи
- Архивировать session-файлы для аудита

---

## 14. Agent Skills Matrix (обязательно)

Единый источник истины для ролей и skill-gate:

- `packages/agent-orchestrator/agent-skills-matrix.json`

Перед запуском стадии оркестратор обязан проверить:

- `requiredSkills` присутствуют (иначе стадия `blocked`);
- `requiredPolicies` переданы в gate (через `--policies`) для стадий, где они обязательны;
- `forbiddenSkills` не используются в стадии;
- ограничения роли соблюдены (например, для `Coder` только `Claude Code` путь).

Примечание:
- проверка фактического использования `forbiddenSkills` выполняется только при передаче `--log <path>` в gate.

Роли и базовая матрица:

- Manager/Architect
  - required: `prd`
  - optional: `find-skills`, `web-search`, `ui-design-system`
  - forbidden: `coding-agent`, `yeet`
- Coder (Claude Code only)
  - required: `coding-agent`, `react-best-practices`, `typescript-advanced-types`
  - optional: `ui-skills`, `design-system-patterns`, `openai-docs`
  - forbidden: `yeet`, `security-best-practices`
- Tester
  - required: `e2e-testing-patterns`, `playwright`
  - optional: `chrome-devtools`, `screenshot`
  - forbidden: `coding-agent`
- Reviewer
  - required: review-mode + ignore generated paths
  - optional: `security-best-practices` (только для security review)
  - forbidden: `coding-agent`
- DevOps
  - required: фиксированные CI/deploy команды
  - optional: `coding-agent` (только для infra-изменений)
  - forbidden: изменение продуктового scope

---

## 15. Ruler integration (обязательно)

`AGENTS.md` генерируется из `./ruler/*`.

Правила:

1. Любые изменения процессных правил вносить в `.ruler/*.md` как source-of-truth.
2. После изменений запускать:

   ```bash
   pnpm ruler:apply
   ```

3. Изменения в сгенерированных `AGENTS.md`/`CLAUDE.md` коммитить вместе с правками `./ruler/*`.
4. Не редактировать `AGENTS.md`/`CLAUDE.md` вручную как source-of-truth: эти файлы считаются generated-выходом Ruler и могут быть под `.gitignore`.
5. Roadmap правила см. `.ruler/roadmap.md`.

---

## 16. Пустые коммиты запрещены

Запрещено:

- создавать пустые коммиты (`git commit --allow-empty`);
- завершать story без нового коммита с изменениями.

Если изменений нет, story не считается завершенной и возвращается в работу/эскалацию.

---

## 17. Typography Tokens

Использовать CSS-переменные для шрифтов:

- `--ui-font-heading` — заголовки, section labels (`"Cairo", "Inter", system-ui, sans-serif`)
- `--ui-font-body` — основной текст, описания (`"Open Sans", "Inter", system-ui, sans-serif`)
- `--ui-font-ui` — инпуты, контролы, компактный UI (`"Inter", "Inter Variable", system-ui, sans-serif`)
- `--ui-font-roboto` — Roboto-совместимые UI кейсы (`"Roboto", "Inter", system-ui, sans-serif`)

```css
font-family: var(--ui-font-heading);  /* для h1/h2 */
font-family: var(--ui-font-body);     /* для paragraph/helper text */
font-family: var(--ui-font-ui);       /* для form controls */
font-family: var(--ui-font-roboto);   /* для Roboto-specific UI */
```

---

## 18. Package Manager

Проект использует **pnpm v10**. Всегда использовать `pnpm` команды.

---

## 19. Мини-чеклист перед коммитом

- [ ] Контракт есть
- [ ] States валидны
- [ ] Generated актуален (`pnpm gen`)
- [ ] Docs используют states
- [ ] PRD не нарушен
- [ ] `pnpm check` зелёный
- [ ] Сессия завершена (если использовалась)
- [ ] Нет пустого коммита
