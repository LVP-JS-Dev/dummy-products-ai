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

## 2. Какой файл читать первым

Перед началом работы агент обязан определить контекст:

| Задача                 | Читать                 |
| ---------------------- | ---------------------- |
| Общая ориентация       | PRD.md (root)          |
| Работа с компонентами  | packages/ui-kit/PRD.md |
| Работа с документацией | apps/fumadocs/PRD.md   |
| Работа с приложением   | apps/web/PRD.md        |
| Процесс и шаги         | AGENT.md (этот файл)   |

---

## 3. Decision flow: можно ли сразу писать код?

Перед началом работы агент обязан ответить на вопрос:

**Укладывается ли изменение в существующий PRD?**

### 3.1 Если ДА

- PRD не меняется
- агент следует шагам из этого файла
- изменения локальны

### 3.2 Если НЕТ

- агент сначала предлагает изменения в PRD
- код не пишется, пока PRD не обновлён

**Важно:** агент не имеет права вводить новые паттерны без фиксации в PRD.

---

## 4. Типовые сценарии и точные шаги

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
5. **Генерация**: `pnpm -C packages/ui-kit gen`
6. **Тесты**: `pnpm -C packages/ui-kit test`
7. **Docs**
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

## 5. Обновление PRD (Change Management)

### 5.1 Когда PRD ОБЯЗАН быть обновлён

- добавление новых полей в manifest.json
- изменение требований к states
- изменение роли пакета
- ослабление или усиление инвариантов
- новый допустимый паттерн

### 5.2 Какой PRD обновлять

| Изменение                 | PRD                    |
| ------------------------- | ---------------------- |
| Архитектурный принцип     | Root PRD               |
| Контракты / states / spec | packages/ui-kit/PRD.md |
| Docs / Story / MDX        | apps/fumadocs/PRD.md   |
| UX / Routing              | apps/web/PRD.md        |

### 5.3 Порядок

1. PRD
2. Код
3. PR с указанием PRD impact

---

## 6. Обязательные команды перед PR

Из корня репозитория:

- `pnpm gen`
- `pnpm test`
- `pnpm check`

PR не может быть принят, если `pnpm check` не проходит.

---

## 7. Требования к PR-описанию

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

## 8. Запрещённые действия (жёстко)

Агенту запрещено:

- менять UI Kit из `apps/*`
- добавлять props без контракта
- создавать states только для docs
- коммитить generated файлы без `gen`
- “угадывать” архитектурные решения

---

## 9. Поведение при неопределённости

Если агент:

- не уверен, укладывается ли изменение в PRD
- не понимает архитектурное последствие

Он обязан остановиться и:

- не уверен, укладывается ли изменение в PRD
- не понимает архитектурное последствие

Он обязан остановиться и:

1. явно сформулировать вопрос
2. предложить вариант изменения PRD
3. дождаться подтверждения

---

## 10. Короткая формула системы (для агента)

**PRD определяет правила → AGENT определяет процесс → код следует им.**

---

## 11. Работа с сессиями (Git Worktree)

### 11.1 Зачем нужны сессии

Для изолированной параллельной работы над несколькими задачами:
- Каждая сессия получает свою git-ветку от `develop`
- Каждая сессия имеет отдельный worktree (изолированная копия репозитория)
- Все git-команды автоматически логируются
- Полный аудит всех изменений в сессии

### 11.2 Команды для работы с сессиями

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

### 11.3 Структура сессии

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

### 11.4 Workflow с сессиями

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

### 11.5 Параллельная работа

Можно работать над несколькими задачами одновременно:

```bash
# Терминал 1: Auth feature
bash .claude/skills/session-worktree/session.sh start "add-auth" "Add user authentication"
cd .tmp/worktrees/<timestamp1>

# Терминал 2: Login fix (параллельно)
bash .claude/skills/session-worktree/session.sh start "fix-login" "Fix login bug"
cd .tmp/worktrees/<timestamp2>
```

### 11.6 Когда использовать сессии

- Параллельная работа над несколькими фичами
- Безопасный рефакторинг (если что-то сломается - просто удалить worktree)
- PR-ревью с изменениями (отдельная ветка от review-сессии)
- Эксперименты и прототипы

### 11.7 Интеграция с workflow

Агент обязан использовать сессии при работе над задачами:
- Создавать сессию перед началом работы
- Логировать все git-команды через git-log.md
- Завершать сессию после завершения задачи
- Архивировать session-файлы для аудита

---

## 12. Мини-чеклист перед коммитом

- Контракт есть
- States валидны
- Generated актуален
- Docs используют states
- PRD не нарушен
- pnpm check зелёный
- Сессия завершена (если использовалась)
