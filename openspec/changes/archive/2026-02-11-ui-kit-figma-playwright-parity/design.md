## Context

Текущий UI-kit содержит 14 публичных компонентов: `Button`, `Card`, `Checkbox`, `Divider`, `Icon`, `Image`, `Input`, `Link`, `PageNumber`, `Pagination`, `SearchInput`, `Spinner`, `Text`, `Toast`. Для них есть docs/stories в `apps/fumadocs`, но отсутствует единый цикл визуального сравнения с Figma и трассируемый parity-отчёт.

`framelink_mcp_for_figma` в текущей сессии может возвращать `429 Too Many Requests`, поэтому процесс должен иметь retry/backoff и fallback на локальные эталоны (`requirements/*.png`, `*.figma-map.md`) без остановки всего цикла.

## Goals / Non-Goals

**Goals:**
- Зафиксировать единый Ralph Loop процесс для проверки и исправлений UI-kit.
- Прогнать компоненты в 3 параллельных потоках по согласованным группам.
- Обеспечить критерии приёмки: визуальный порог ≤2%, обязательные состояния, a11y минимум, token-first styling.
- Подготовить parity-report и screenshot-артефакты, пригодные для последующих прогонов.

**Non-Goals:**
- Создание новой дизайн-системы или редизайн компонентного набора.
- Breaking API изменения `@dummy-products/ui-kit`.
- Перенос процесса на отдельный внешний сервис visual regression.

## Decisions

1. **Ralph Loop как процесс, не отдельный CLI dependency**
   - Используем Ralph Loop как операционный цикл внутри change-артефактов.
   - Результат каждой итерации фиксируется в parity-report (`Baton` секции).
   - Альтернатива (установка внешнего CLI) отклонена: повышает инфраструктурный риск и не нужна для текущего scope.

2. **Параллель в 3 потока по функциональным группам**
   - A: `Input`, `Button`, `Checkbox`, `Link`, `SearchInput`.
   - B: `Card`, `Divider`, `Toast`, `Spinner`.
   - C: `Image`, `Text`, `Icon`, `PageNumber`, `Pagination`.
   - Альтернатива (2 потока) отклонена как менее эффективная; максимум потоков отклонён как флаки.

3. **Figma source of truth + controlled fallback**
   - Primary: `framelink_mcp_for_figma` (ключевые nodes: `1046:50`, `1046:71`, `1:417`, `1:451`).
   - Retry policy: 5s/15s/30s.
   - Fallback: `requirements/auth-form.png`, `requirements/goods-list.png`, route figma maps.

4. **Acceptance gate перед завершением change**
   - Визуально: не более 2% diff на состояние.
   - Поведение/a11y: keyboard/aria/security checks по матрице сценариев.
   - Регрессия: `pnpm -C packages/ui-kit gen`, `pnpm -C packages/ui-kit test`, `pnpm -C apps/web check-types`, `pnpm -C apps/fumadocs types:check`.

## Risks / Trade-offs

- **[Figma API rate limit]** → Retry/backoff, fallback на локальные эталоны, явная маркировка источника в отчёте.
- **[Флейки в browser-capture]** → стандартизировать viewport, фиксированные сценарии, повтор capture на state change.
- **[Шум от визуальных micro-diff]** → порог ≤2%, приоритет на layout/spacing/typography и a11y над косметикой.
- **[Конфликты правок между потоками]** → приоритизация: a11y/behavior > layout parity > cosmetic, централизованный merge в финальном раунде.

## Migration Plan

1. Создать change артефакты и parity matrix.
2. Запустить round-1 Ralph Loop по 3 потокам и собрать baseline screenshots.
3. Внести минимальные правки компонентов/доков/состояний и синхронизировать generated artifacts.
4. Запустить round-2 recheck до прохождения acceptance gate.
5. Закрыть tasks, приложить parity-report и список фиксированных отклонений.

## Open Questions

- Нужна ли обязательная фиксация численного pixel-diff в репозитории или достаточно pass/fail + evidences.
- Нужен ли отдельный CI job для регулярного повторного parity-прогона после merge.
