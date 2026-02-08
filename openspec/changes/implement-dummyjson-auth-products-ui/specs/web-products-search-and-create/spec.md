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

The add-product action SHALL create a local client-side product record without sending create requests to the API, and SHALL display a success toast when the record is added.

#### Scenario: Valid add-product submission

- **WHEN** a user submits a valid add-product form
- **THEN** the new product appears in the local products dataset and a success toast is displayed

#### Scenario: Add-product write behavior

- **WHEN** a product is added through the add-product form
- **THEN** the app does not issue a create/update request to external products APIs
