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

The web app SHALL persist the auth token and the last-used username in `localStorage` when remember-me is enabled, and SHALL persist them in `sessionStorage` when remember-me is disabled.

#### Scenario: Remember-me enabled

- **WHEN** a user logs in with remember-me checked
- **THEN** the session token and username are restored after closing and reopening the browser

#### Scenario: Remember-me disabled

- **WHEN** a user logs in with remember-me unchecked
- **THEN** the session ends after browser session termination and is not restored in a new browser session

### Requirement: Session storage precedence SHALL be deterministic

If both `sessionStorage` and `localStorage` contain session data, the app SHALL prefer the `sessionStorage` session.

#### Scenario: Both storages contain session data

- **WHEN** the app initializes and finds session data in both `sessionStorage` and `localStorage`
- **THEN** it uses the session from `sessionStorage` as the active session

### Requirement: Logout SHALL clear session data in both storages

The app SHALL provide a logout action that clears auth session data in both `sessionStorage` and `localStorage` and navigates the user to the login screen.

#### Scenario: User clicks logout

- **WHEN** an authenticated user triggers logout
- **THEN** the session data is removed from `sessionStorage` and `localStorage`
- **AND** the user is redirected to the login screen

### Requirement: Products access SHALL require an active session

The web app SHALL protect products functionality behind an active auth session and SHALL redirect unauthenticated users to login.

#### Scenario: Anonymous user opens products route

- **WHEN** a user without a valid stored session navigates to the products route
- **THEN** the app redirects the user to the login screen

#### Scenario: Authenticated user opens app

- **WHEN** a user with a valid stored session opens the app
- **THEN** the user is allowed to access products functionality without re-authenticating
