## ADDED Requirements

### Requirement: UI-kit parity workflow SHALL validate all public components
The system SHALL execute a parity workflow for every public UI-kit component exported from `@dummy-products/ui-kit`.

#### Scenario: Full component surface is included
- **WHEN** parity workflow starts
- **THEN** it includes `Button`, `Card`, `Checkbox`, `Divider`, `Icon`, `Image`, `Input`, `Link`, `PageNumber`, `Pagination`, `SearchInput`, `Spinner`, `Text`, and `Toast`

### Requirement: Ralph Loop iterations SHALL be recorded
Each parity iteration SHALL follow the sequence `Reference Pull` → `Runtime Capture` → `Diff & Diagnose` → `Patch` → `Recheck` → `Baton` and SHALL be documented.

#### Scenario: Iteration trace is auditable
- **WHEN** a component is checked in an iteration
- **THEN** the parity report records source references, observed mismatch, applied fix (or no-fix), and recheck outcome

### Requirement: Workflow SHALL run in three parallel groups
Parity execution SHALL run in three logical groups with fixed component allocation.

#### Scenario: Group assignments are deterministic
- **WHEN** workflow is orchestrated
- **THEN** group A covers `Input`, `Button`, `Checkbox`, `Link`, `SearchInput`; group B covers `Card`, `Divider`, `Toast`, `Spinner`; group C covers `Image`, `Text`, `Icon`, `PageNumber`, `Pagination`

### Requirement: Figma access SHALL use retry and fallback policy
The workflow SHALL attempt Figma reads with retry/backoff and SHALL fallback to local references when Figma remains unavailable.

#### Scenario: Figma rate limit fallback
- **WHEN** Figma reads fail with `429` after retries at 5s, 15s, and 30s
- **THEN** workflow continues using `requirements/auth-form.png`, `requirements/goods-list.png`, and route figma map files, with fallback source explicitly marked in report

### Requirement: Acceptance gate SHALL enforce visual, behavior, and token constraints
Workflow completion SHALL require all defined acceptance checks to pass.

#### Scenario: Change passes acceptance gate
- **WHEN** final recheck completes
- **THEN** visual differences are within 2% threshold per validated state, required accessibility checks pass, link security attributes are correct, and component styling remains token-based

### Requirement: Parity artifacts SHALL be produced for review
Workflow SHALL produce a parity report and screenshot evidence for each round.

#### Scenario: Reviewer can inspect parity evidence
- **WHEN** workflow run is complete
- **THEN** change artifacts include a parity matrix with component/state pass-fail status and links to before/after screenshots
