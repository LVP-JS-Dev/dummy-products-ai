## MODIFIED Requirements

### Requirement: Login form SHALL enforce required credentials and show API failures

The web app SHALL require both username and password before submitting auth requests, SHALL surface authentication API errors in the login UI, and SHALL render validation, submitting, and API error states within the login form according to the approved login design.

#### Scenario: User submits empty credentials

- **WHEN** the user submits login with one or more required fields empty
- **THEN** the form blocks submission and shows validation errors for missing fields using the form error presentation defined by the approved login design

#### Scenario: Authentication API returns an error

- **WHEN** the user submits validly shaped credentials and the auth API rejects them
- **THEN** the UI shows a user-visible error message without navigating to the products screen
- **AND** the form remains in an editable non-loading state so the user can retry

#### Scenario: Authentication request is pending

- **WHEN** the user submits valid credentials and the auth request is in progress
- **THEN** the submit control enters a loading or disabled state that prevents duplicate submissions

