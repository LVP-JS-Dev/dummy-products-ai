## ADDED Requirements

### Requirement: Provide a reviewer entrypoint for running and verifying the assignment
The repository SHALL include a root-level `SUBMISSION.md` that enables a reviewer to run and verify the assignment with minimal context.

#### Scenario: Reviewer follows the quick-start flow
- **WHEN** a reviewer opens `SUBMISSION.md`
- **THEN** they can see commands to install dependencies and start the project (`pnpm i`, `pnpm dev`)
- **AND** they can identify where to open the web app and docs (explicit docs port and a note that the web URL is printed by Vite)

#### Scenario: Reviewer verifies functional requirements quickly
- **WHEN** a reviewer follows the “Quick verification” steps in `SUBMISSION.md`
- **THEN** the steps map to the assignment requirements (login validation, API error handling, remember-me behavior, products list with loading indicator, sorting, search, add-product modal with local save + toast, rating highlight)

### Requirement: Disclose AI usage for the assignment
The repository SHALL include a root-level `AI_USAGE.md` documenting AI-assisted development in a way that satisfies the assignment request.

#### Scenario: AI usage is sufficiently specified
- **WHEN** a reviewer reads `AI_USAGE.md`
- **THEN** it includes the model/tool used
- **AND** it includes representative prompts or instructions used during development
- **AND** it distinguishes what was AI-assisted from what was done manually

### Requirement: README links to submission documentation and correct operational rules
The root `README.md` SHALL link to `SUBMISSION.md` and SHALL NOT reference nonexistent process files.

#### Scenario: README has no broken process pointer
- **WHEN** a reviewer follows the process/operational-rules link from `README.md`
- **THEN** it resolves to an existing file in the repository (e.g., `.ruler/agent.md`)

#### Scenario: README points reviewers to the submission entrypoint
- **WHEN** a reviewer opens `README.md`
- **THEN** they can find a link to `SUBMISSION.md` near the “quick start” / “commands” area
