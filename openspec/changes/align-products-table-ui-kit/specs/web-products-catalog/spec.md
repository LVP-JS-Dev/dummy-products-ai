## MODIFIED Requirements

### Requirement: Products table SHALL expose assignment-required columns

The products table SHALL display columns that match the assignment/Figma structure for product management, including at minimum product name, price, vendor/brand, article/SKU, and rating.

The table structure SHALL also include selection and actions affordances consistent with the assignment layout (e.g., a leading selection checkbox column and a trailing actions area), without changing the underlying data source requirements.

#### Scenario: Reviewer checks table structure

- **WHEN** products data is rendered on the products screen
- **THEN** the table shows the required columns for name, price, vendor/brand, article/SKU, and rating, and includes selection/actions affordances aligned with the assignment layout
