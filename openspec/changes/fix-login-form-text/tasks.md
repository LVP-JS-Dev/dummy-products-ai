# Tasks

## 1. Login screen styling utilities

- [x] 1.1 Add `.inner-shadow` and `.inner-shadow-top` (as `text-shadow`) to `apps/web/src/index.css`
- [x] 1.2 Verify the shadow values match the Figma offsets/blur/opacity used for the login heading/subtitle

## 2. Login route updates

- [x] 2.1 Apply `.inner-shadow-top` to the “Добро пожаловать!” `Text` element in `apps/web/src/routes/login.tsx`
- [x] 2.2 Apply `.inner-shadow` to the “Пожалуйста, авторизируйтесь” `Text` element in `apps/web/src/routes/login.tsx`
- [x] 2.3 Update the login page container width constraint to `width: 100%` + `max-width: 420px` (adaptive)

## 3. Regression coverage

- [x] 3.1 Update/add a login route test to assert the heading/subtitle have the expected CSS class names
- [x] 3.2 Run `pnpm test` (or workspace-scoped equivalent) and ensure login tests pass
