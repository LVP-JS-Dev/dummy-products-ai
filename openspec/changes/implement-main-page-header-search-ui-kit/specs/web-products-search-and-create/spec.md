## MODIFIED Requirements

### Requirement: Product search SHALL use DummyJSON API
The products screen SHALL expose its primary product search input in the dedicated main-page header using `@dummy-products/ui-kit/SearchInput`, SHALL execute product search against DummyJSON API, and SHALL render the returned results in the same products table view.

#### Scenario: Header search input is available
- **WHEN** a user opens the products screen
- **THEN** the primary product search input is available in the main-page header

#### Scenario: User enters a search query
- **WHEN** a user submits or applies a non-empty search query
- **THEN** the app requests filtered products from the search API and renders the resulting items

#### Scenario: Search input is debounced
- **WHEN** a user types into the search input
- **THEN** the app waits a short debounce interval before issuing a search request

#### Scenario: Search request fails
- **WHEN** the search API returns an error
- **THEN** the UI shows an error state/message while preserving the ability to retry
