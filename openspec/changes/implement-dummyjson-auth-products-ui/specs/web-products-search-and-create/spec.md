## ADDED Requirements

### Requirement: Product search SHALL use DummyJSON API

The products screen SHALL execute product search against DummyJSON API and SHALL render the returned results in the same products table view.

#### Scenario: User enters a search query

- **WHEN** a user submits or applies a non-empty search query
- **THEN** the app requests filtered products from the search API and renders the resulting items

#### Scenario: Search request fails

- **WHEN** the search API returns an error
- **THEN** the UI shows an error state/message while preserving the ability to retry

### Requirement: Add-product UI SHALL validate required fields

The app SHALL provide an add-product form that requires product name, price, vendor, and article/SKU before allowing submission.

#### Scenario: Required field is missing

- **WHEN** the user attempts to submit the add-product form with any required field empty
- **THEN** form submission is blocked and validation errors are shown

### Requirement: Add-product flow SHALL be local-only and confirm success

The add-product action SHALL NOT send create/update requests to external products APIs. The add-product flow in v1 SHALL be UI-only: it validates input and confirms submission via a success toast, without persisting the new product beyond the current page session and without inserting it into the products list/search results.

#### Scenario: Valid add-product submission

- **WHEN** a user submits a valid add-product form
- **THEN** a success toast is displayed and the add-product form is closed or reset

#### Scenario: Reload clears add-product outcome

- **WHEN** the user reloads the page after adding a product
- **THEN** the app does not restore any previously added product from this UI-only flow

#### Scenario: Added product does not affect search results

- **WHEN** a user adds a product via the UI-only add-product flow and then performs a product search
- **THEN** the search results reflect only API-provided products and do not include the added product

#### Scenario: Add-product write behavior

- **WHEN** a product is added through the add-product form
- **THEN** the app does not issue a create/update request to external products APIs
