# Roadmap Rules

## Source of truth

- The roadmap source is `docs/ROADMAP.md`.
- Use sections exactly:
  - `## In Progress`
  - `## Planned`
  - `## Done`

## Item format

Each item must be a checkbox with an area tag:

```
- [ ] [area:ci] CircleCI builds and GHCR publishing
- [x] [area:docs] Document local fallback
```

## Generated view

- The generated view is `docs/ROADMAP.generated.md`.
- Update it by running:

```
pnpm roadmap:gen
```

## Validation

- CI and `pnpm check` will fail if `docs/ROADMAP.generated.md` is out of date.
- Fix by rerunning `pnpm roadmap:gen` and committing the result.
