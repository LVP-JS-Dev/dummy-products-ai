## Context

The current PRD set is internally inconsistent for `apps/web`:
- `/apps/web/PRD.md` states "no auth" and "no API requests".
- The external assignment requires auth + products API workflows and specific UI behavior.
- `/PRD.md` globally excludes auth/backend/database in a way that currently reads as incompatible with assignment-driven API consumption.

This change is documentation-only and aligns product requirements without changing runtime code.

## Goals / Non-Goals

**Goals:**
- Make `apps/web` PRD reflect assignment requirements exactly enough for implementation planning.
- Keep monorepo architectural boundaries intact (`ui-kit` remains source of truth for component contracts/states).
- Remove wording conflicts between root and app-level PRDs.
- Add traceability to prevent requirement drift.

**Non-Goals:**
- Implement application features.
- Modify `packages/ui-kit` public API, contracts, states, generated artifacts, or tests.
- Redesign docs app behavior.

## Decisions

1. Decision: Treat the assignment PDF as source of product requirements for `apps/web`.
   - Rationale: `apps/web` is the execution target of the test task and must be judged against that assignment.
   - Alternative considered: Keep UI Kit demo scope and treat assignment as optional. Rejected due to direct requirement mismatch.

2. Decision: Update root out-of-scope to distinguish "no custom backend/auth ownership" from "no external API usage".
   - Rationale: preserves architecture intent while enabling required integration with DummyJSON.
   - Alternative considered: leave root PRD unchanged and allow exception only in `apps/web`. Rejected because it leaves a policy contradiction.

3. Decision: Keep `ui-kit` and `fumadocs` PRDs mostly unchanged, with optional clarification lines only.
   - Rationale: no functional conflict exists there; broad edits increase noise and review effort.
   - Alternative considered: rewrite all PRDs for uniform style. Rejected as unnecessary scope expansion.

4. Decision: Include an explicit traceability section in `apps/web` PRD.
   - Rationale: reduces future ambiguity when the assignment text and PRD evolve.
   - Alternative considered: implicit mapping in prose only. Rejected because it is harder to audit.

## Risks / Trade-offs

- [Risk] Root PRD wording remains too broad and is interpreted as "no auth anywhere".  
  → Mitigation: explicitly phrase prohibition as "no custom backend/auth service ownership in this monorepo".

- [Risk] Assignment mentions "editing", but detailed functional section does not define edit behavior.  
  → Mitigation: record as open question and mark as deferred (`v1.1`) unless explicitly required by reviewer.

- [Risk] Over-constraining implementation choices in PRD.  
  → Mitigation: specify behavior and acceptance criteria, not specific libraries (except React/TS baseline).

## Migration Plan

1. Update `/apps/web/PRD.md` to assignment-aligned structure and DoD.
2. Update conflicting root PRD out-of-scope phrasing.
3. Run a textual consistency review across all PRDs.
4. Validate change artifacts with OpenSpec before implementation begins.

Rollback: restore previous PRD text from git history if reviewers reject alignment direction.

## Open Questions

- Should "редактировать" from the assignment intro be included in v1 scope, or explicitly deferred?
- Is TanStack Router still a hard constraint for `apps/web`, or optional if acceptance behavior is preserved?
