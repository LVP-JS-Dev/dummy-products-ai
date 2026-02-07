## 1. Spec & PRD sync

- [ ] 1.1 Add events + runtime/serializable rules to `packages/ui-kit/PRD.md` (if missing details)
- [ ] 1.2 Ensure root/apps PRDs remain consistent with UI Kit PRD

## 2. Contracts & types

- [ ] 2.1 Define a consistent events spec pattern in `src/contracts/*`
- [ ] 2.2 Add event payload contracts for interactive components (Button, SearchInput, Checkbox, PageNumber)
- [ ] 2.3 Add runtime handler types for components derived from events spec

## 3. Generator

- [ ] 3.1 Extend `packages/ui-kit/scripts/gen.ts` to generate `propsSchema` and event `payloadSchema` files
- [ ] 3.2 Extend `manifest.json` output to include `events` (keep compatibility if needed)

## 4. Tests (schema-first)

- [ ] 4.1 Add JSON Schema validator (Ajv) and validate each `state` against generated `propsSchema`
- [ ] 4.2 Add no-drift checks: generated schemas/manifest match current contracts/generator

## 5. Product-ready components

- [ ] 5.1 Update `Checkbox` to use real `<input type="checkbox">` semantics
- [ ] 5.2 Add handlers/controlled patterns for `SearchInput`
- [ ] 5.3 Add `loading` + `onPress` for `Button`
- [ ] 5.4 Make `PageNumber` interactive (`<button>` + press event) and preserve `aria-current`

## 6. Repo checks

- [ ] 6.1 Add root `pnpm gen`/`pnpm test` scripts (or equivalent) to match no-drift process
- [ ] 6.2 Update root `pnpm check` to run gen+test+git diff in addition to linting
