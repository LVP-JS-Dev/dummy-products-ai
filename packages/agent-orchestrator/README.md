# agent-orchestrator

Operational orchestration utilities for agent workflow governance.

## Source of truth

- `agent-skills-matrix.json` - required/optional/forbidden skills per stage.

## CLI

```bash
pnpm -C packages/agent-orchestrator skills:gate -- --matrix ./agent-skills-matrix.json --stage coder --agent claude
```
