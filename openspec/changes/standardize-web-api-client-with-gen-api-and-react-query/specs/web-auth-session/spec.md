# web-auth-session Spec

## ADDED Requirements

### Requirement: Auth API calls SHALL use generated gen-api client

The web app SHALL call DummyJSON auth endpoints using `@dummy-products/gen-api` client functions (or generated React Query hooks), rather than app-local ad-hoc `fetch` wrappers.

#### Scenario: Reviewer inspects auth client usage

- **WHEN** the login flow is reviewed
- **THEN** the auth request code path uses `@dummy-products/gen-api` as the only DummyJSON client surface

### Requirement: Auth token propagation SHALL configure the generated client

After login, the web app SHALL configure `@dummy-products/gen-api` to include the auth token in subsequent requests, and SHALL remove the token on logout/forced logout.

#### Scenario: User logs out

- **WHEN** a user triggers logout
- **THEN** the generated client is cleared of auth token and the user is redirected to login
