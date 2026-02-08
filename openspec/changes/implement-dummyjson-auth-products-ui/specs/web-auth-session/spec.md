## ADDED Requirements

### Requirement: Login form SHALL enforce required credentials and show API failures

The web app SHALL require both username and password before submitting auth requests, and SHALL surface authentication API errors in the login UI.

#### Scenario: User submits empty credentials

- **WHEN** the user submits login with one or more required fields empty
- **THEN** the form blocks submission and shows validation errors for missing fields

#### Scenario: Authentication API returns an error

- **WHEN** the user submits validly shaped credentials and the auth API rejects them
- **THEN** the UI shows a user-visible error message without navigating to the products screen

### Requirement: Session persistence SHALL follow remember-me policy

The web app SHALL persist the auth token in `localStorage` when remember-me is enabled, and SHALL persist in `sessionStorage` when remember-me is disabled.

#### Scenario: Remember-me enabled

- **WHEN** a user logs in with remember-me checked
- **THEN** the session token is restored after closing and reopening the browser

#### Scenario: Remember-me disabled

- **WHEN** a user logs in with remember-me unchecked
- **THEN** the session ends after browser session termination and is not restored in a new browser session

### Requirement: Products access SHALL require an active session

The web app SHALL protect products functionality behind an active auth session and SHALL redirect unauthenticated users to login.

#### Scenario: Anonymous user opens products route

- **WHEN** a user without a valid stored session navigates to the products route
- **THEN** the app redirects the user to the login screen

#### Scenario: Authenticated user opens app

- **WHEN** a user with a valid stored session opens the app
- **THEN** the user is allowed to access products functionality without re-authenticating
