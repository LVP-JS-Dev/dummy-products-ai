# Web Login Form UI

## ADDED Requirements

### Requirement: Login heading and subtitle SHALL render specified inner-shadow text treatments

The login screen SHALL render the heading text “Добро пожаловать!” with the `.inner-shadow-top` text treatment and SHALL render the subtitle text “Пожалуйста, авторизируйтесь” with the `.inner-shadow` text treatment.

#### Scenario: User opens login screen

- **WHEN** the user navigates to the login screen
- **THEN** the heading “Добро пожаловать!” is rendered with the `.inner-shadow-top` class applied
- **AND** the subtitle “Пожалуйста, авторизируйтесь” is rendered with the `.inner-shadow` class applied

### Requirement: Login form card SHALL be constrained to an adaptive max width of 420px

The login screen SHALL constrain the login form card/container to `max-width: 420px` while allowing `width: 100%` so the UI remains usable on narrow viewports.

#### Scenario: User opens login screen on wide viewport

- **WHEN** the viewport width is greater than 420px
- **THEN** the login card/container does not exceed 420px wide

#### Scenario: User opens login screen on narrow viewport

- **WHEN** the viewport width is less than 420px
- **THEN** the login card/container shrinks to fit within the viewport without horizontal overflow
