# Proposal

## Why

The login screen is close to the intended design, but the title/subtitle text treatments and the card width constraint are not currently captured or enforced, which makes the UI drift-prone.

## What Changes

- Add two reusable CSS classes for the login title/subtitle inner shadow treatments: `.inner-shadow-top` and `.inner-shadow` (implemented as `text-shadow`).
- Apply `.inner-shadow-top` to the title text “Добро пожаловать!” and `.inner-shadow` to the subtitle text “Пожалуйста, авторизируйтесь”.
- Constrain the login form card/container to an adaptive `max-width: 420px` so it stays narrow without overflowing small screens.

## Capabilities

### New Capabilities

- `web-login-form-ui`: Defines the login screen UI constraints for title/subtitle text treatments and the login card width.

### Modified Capabilities

<!-- None -->

## Impact

- Affected area: `apps/web` login route UI and CSS.
- No changes to `packages/ui-kit` contracts/states.
