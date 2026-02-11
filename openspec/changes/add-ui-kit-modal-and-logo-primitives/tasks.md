# Tasks: Add UI Kit Modal And Logo Primitives

## 1. UI Kit: Modal

- [x] Add contract `packages/ui-kit/src/contracts/ModalContract.ts`
- [x] Add component `packages/ui-kit/src/components/Modal.tsx`
- [x] Add states `packages/ui-kit/src/states/ModalStates.ts` (min 3: default, dismissDisabled, longContent edge-case)
- [x] Export in `packages/ui-kit/src/index.ts` and `packages/ui-kit/src/states/index.ts`
- [x] Generate artifacts `pnpm -C packages/ui-kit gen` and validate `pnpm -C packages/ui-kit test`
- [x] Add docs story + MDX page

## 2. UI Kit: Logo

- [x] Add contract `packages/ui-kit/src/contracts/LogoContract.ts`
- [x] Add component `packages/ui-kit/src/components/Logo.tsx`
- [x] Add states `packages/ui-kit/src/states/LogoStates.ts`
- [x] Export + generate + test + docs

## 3. PRD / Specs

- [ ] Update `packages/ui-kit/PRD.md` to include `Modal` + `Logo` as foundation primitives
- [ ] Update `apps/fumadocs/PRD.md` coverage expectations (new MDX pages)
- [ ] Add OpenSpec capability specs `ui-kit-modal` and `ui-kit-logo`

## 4. Follow-up migrations (optional)

- [ ] Migrate `apps/web` login to use `Logo`
- [ ] Migrate `apps/web` add-product modal to use UI-kit `Modal`

## 5. Verification

- [ ] Run `pnpm check`
