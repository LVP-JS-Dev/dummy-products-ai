# agent-orchestrator

Operational orchestration utilities for agent workflow governance.

## Source of truth

- `agent-skills-matrix.json` - required/optional/forbidden skills per stage.

## CLI

```bash
pnpm -C packages/agent-orchestrator skills:gate -- --matrix ./agent-skills-matrix.json --stage coder --agent claude
```

Optional flags:

- `--log <path>`: enables detection of actually used/forbidden skills from run logs.
- `--policies <csv>`: passes satisfied policy checks (needed for stages with `requiredPolicies`).
