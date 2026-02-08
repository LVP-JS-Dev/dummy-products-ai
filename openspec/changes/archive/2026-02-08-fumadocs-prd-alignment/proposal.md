## Why

PRD для `apps/fumadocs` требует:
- корректной интеграции Story-блоков (импорты должны разрешаться, структура `src/stories/*` соответствует рекомендациям PRD);
- наличия ссылок на спецификацию (schema / manifest) в API-секции каждой страницы компонента.

Сейчас есть два расхождения:
- MDX-страницы импортируют `@/stories/*.story`, но фактические файлы Story имеют PascalCase имена (например, `ButtonStory.tsx`), что ломает резолвинг на case-sensitive окружениях и не соответствует рекомендованной структуре PRD.
- В API-секциях нет ссылок на schema/manifest, хотя PRD это требует.

## What Changes

1) **Согласовать Story-импорты и структуру файлов**
- Привести Story-файлы к формату `src/stories/<component>.story.tsx`, как в PRD (button, checkbox, icon, page-number, search-input).
- Оставить MDX-импорты вида `@/stories/<component>.story` и убедиться, что они резолвятся без учёта регистра.

2) **Добавить ссылки на спецификацию в API-секции**
- В каждой MDX-странице компонента добавить ссылки на:
  - общий manifest: `packages/ui-kit/src/generated/manifest.json`
  - компонентный schema JSON: `packages/ui-kit/src/generated/schemas/<component>.schema.json`
- Формат ссылок: простой список в секции API (или отдельный подзаголовок “Specification”).

3) **Проверить покрытие компонентов**
- Убедиться, что для каждого публичного компонента UI Kit есть соответствующая MDX-страница.

## Non-goals

- Изменения в `packages/ui-kit` (контракты, states, генерация).
- Изменения в Fumadocs/Next конфигурации.
- Добавление новых компонентов или новых примеров.

## Capabilities

### Modified Capabilities
- `fumadocs-docs`: приведение документации UI Kit в `apps/fumadocs` к требованиям PRD.

## Impact

- `apps/fumadocs`
  - переименование/перемещение Story-файлов;
  - обновление API-секций в MDX-страницах;
  - без изменения UI Kit контрактов и `states`.

## Acceptance Criteria

- Все MDX-страницы компонентов корректно импортируют `story` на case-sensitive окружении.
- В каждой API-секции присутствуют ссылки на manifest и соответствующий schema JSON.
- Документация продолжает использовать `states` из `@dummy-products/ui-kit` и имеет `<story.WithControl />`.
- Для каждого публичного компонента UI Kit есть MDX-страница.
