# Configuration management

This guide explains why configuration lives in `packages/config`, what problems
that decision solves, and how you add or update tool settings. Use it to keep
repository configuration consistent and easy to find.

## Decision and rationale

Centralized configuration keeps shared tooling rules in one place so you can
update them once and reuse them everywhere. Root files remain only when a tool
requires a workspace entrypoint for discovery.

## Problems this solves

This approach reduces common sources of confusion and drift.

- Avoids duplicated configuration across packages.
- Removes ambiguity about which config is authoritative.
- Reduces root-level clutter without breaking tool discovery.

## How to add or update a tool config

Follow these steps when you add a new tool or update an existing config.

1. Add the shared configuration file in `packages/config`.
2. Export the config from `packages/config/package.json` if it needs a stable
   import path.
3. Add a thin root wrapper only if the tool requires a root entrypoint.
4. If a package needs a local entrypoint, create a minimal file that extends
   the shared profile.

## Root-only files

Some tools only read configuration from the workspace root. Keep those files in
place even when the shared config lives in `packages/config`.

- `turbo.json`
- `pnpm-workspace.yaml`
- `package.json`

## Next steps

If you introduce a new tool, update this guide with any new entrypoint rules or
constraints the tool imposes.
