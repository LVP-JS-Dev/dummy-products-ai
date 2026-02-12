# Spec

## ADDED Requirements

### Requirement: E2E suite covers authentication validation and API errors

The E2E test suite SHALL verify that the login form enforces required fields and surfaces Auth API errors to the user.

#### Scenario: Required fields

- **WHEN** the user submits the login form with empty required fields
- **THEN** the UI displays validation feedback and prevents submission

#### Scenario: Auth API error

- **WHEN** the user submits invalid credentials and the Auth API responds with an error
- **THEN** the UI displays an error notification and/or field-level error message

### Requirement: E2E suite covers remember me persistence rules

The E2E test suite SHALL verify session persistence differs based on the remember-me setting.

#### Scenario: Remember me enabled

- **WHEN** the user logs in with remember me enabled and restarts the browser context
- **THEN** the user remains authenticated and can access the products screen

#### Scenario: Remember me disabled

- **WHEN** the user logs in with remember me disabled and restarts the browser context
- **THEN** the user is signed out and must log in again to access products

### Requirement: E2E suite covers products list loading and pagination

The E2E test suite SHALL verify products list loads from the API, shows a loading indicator, and paginates via API parameters with disabled boundaries at edges.

#### Scenario: Initial load with progress indicator

- **WHEN** the user navigates to the products screen after login
- **THEN** a loading indicator is shown while the Products API request is in-flight

#### Scenario: Pagination with disabled boundaries

- **WHEN** the user is on the first page of products
- **THEN** the previous-page control is disabled and the next-page control is enabled

### Requirement: E2E suite covers sorting behavior

The E2E test suite SHALL verify that sorting is available on at least one sortable column and that sort direction is reflected in the UI.

#### Scenario: Sort by a sortable column

- **WHEN** the user toggles sorting on a sortable column (e.g., price or rating)
- **THEN** the sort direction indicator updates and the displayed order changes accordingly

### Requirement: E2E suite covers products search

The E2E test suite SHALL verify search uses the Products API and renders results in the products table.

#### Scenario: Search returns results

- **WHEN** the user enters a search query and submits
- **THEN** the products table updates to show matching results from the API

### Requirement: E2E suite covers adding a product locally

The E2E test suite SHALL verify that the add-product form enforces required fields and shows a success toast on completion without API persistence.

#### Scenario: Add product success

- **WHEN** the user opens the add-product form, fills required fields, and submits
- **THEN** a success toast is displayed and the product is added locally

### Requirement: E2E suite covers rating highlight rule

The E2E test suite SHALL verify ratings below 3 are visually highlighted in red.

#### Scenario: Rating below threshold

- **WHEN** a product with rating below 3 is visible in the table
- **THEN** the rating is styled as a red highlight

### Requirement: E2E suite covers access control to products screen

The E2E test suite SHALL verify unauthenticated users cannot access the products screen.

#### Scenario: Unauthenticated access

- **WHEN** a user without a valid session navigates directly to the products route
- **THEN** the app redirects to the login screen
