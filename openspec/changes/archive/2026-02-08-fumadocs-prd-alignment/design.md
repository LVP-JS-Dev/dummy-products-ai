## Context

PRD for `apps/fumadocs` defines how component docs should reference Story files and specs. Current docs had case-sensitive import mismatches and lacked spec links in API sections. We already intend to align Story file naming to `src/stories/<component>.story.tsx` and add spec references in MDX. This is a localized change within `apps/fumadocs` plus an OpenSpec change record.

## Goals / Non-Goals

**Goals:**
- Align Story file naming with PRD and MDX imports to avoid case-sensitive resolution failures.
- Add manifest/schema links in each component API section.
- Verify every public UI Kit component has a corresponding MDX page.

**Non-Goals:**
- Modify UI Kit contracts, states, or generated schemas.
- Change Fumadocs/Next configuration beyond what is required for doc content and story file naming.
- Add new components, examples, or business logic in docs.

## Decisions

- **Keep MDX imports as `@/stories/<component>.story` and rename Story files to match PRD.**
  - Rationale: PRD recommends this structure; it avoids case-sensitive import failures and keeps MDX stable.
  - Alternative: keep PascalCase files and update MDX imports. Rejected because it conflicts with PRD guidance and would require case-sensitive correctness across all imports.

- **Link to manifest and schema files from MDX using relative paths to `packages/ui-kit/src/generated`.**
  - Rationale: Satisfies PRD requirement for spec references without duplicating contract content.
  - Alternative: link to an external docs route. Rejected as there is no authoritative docs URL in this repo.

- **Allow kebab-case story filenames via Biome override for `apps/fumadocs/src/stories/*.tsx`.**
  - Rationale: Biome enforces PascalCase in this folder; PRD expects kebab-case story filenames. Override keeps lint passing while preserving global conventions elsewhere.
  - Alternative: rename files to PascalCase and change MDX imports accordingly. Rejected due to PRD mismatch.

## Risks / Trade-offs

- [Risk] Lint rule override could diverge from broader repo conventions. → Mitigation: scope the override narrowly to `apps/fumadocs/src/stories/*.tsx`.
- [Risk] Relative links to spec files may be less discoverable or break if paths move. → Mitigation: keep links minimal and update if generated paths change; no code dependency.

## Migration Plan

- No runtime migration required. Changes are confined to docs content and filenames.
- Rollback: revert commit to restore previous filenames/content if needed.

## Open Questions

- None. The changes are fully specified by PRD and proposal.
