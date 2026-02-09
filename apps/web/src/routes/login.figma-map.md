# Login Figma Mapping

Source: `requirements/auth-form.png` and Figma node `1046:50` from the assignment link.

## Screen Structure

1. Full-screen centered auth card on a light gray background.
2. Top badge/icon inside a small circular plate.
3. Heading: `Добро пожаловать!`
4. Subtitle: `Пожалуйста, авторизируйтесь`
5. Login field block:
   - Label `Логин`
   - Leading user icon
   - Text input
   - Trailing clear action
6. Password field block:
   - Label `Пароль`
   - Leading lock icon
   - Password input
   - Trailing visibility action
7. Checkbox: `Запомнить данные`
8. Primary CTA button: `Войти`
9. Divider: `ИЛИ`
10. Footer action: `Нет аккаунта? Создать`

## Interaction States To Support

- Default, focus, error for both fields.
- Disabled/loading state for submit action while auth request is pending.
- Inline field validation messages.
- Form-level API error message without route change.

## Accessibility Notes

- Inputs must be linked to labels.
- Field errors must be associated with controls via `aria-describedby`.
- Validation and API errors should be announced through `role="alert"`.

## Intentional Deviations

- The top emblem in the mock is approximated with the existing `square` icon from `@dummy-products/ui-kit` because no dedicated logo asset is stored in the repository.
- The `Создать` action points to `/register` as a forward-compatible navigation target, while the registration flow itself remains out of scope for this change.
