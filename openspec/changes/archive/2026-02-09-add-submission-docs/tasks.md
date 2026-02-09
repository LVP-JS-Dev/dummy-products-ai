## 1. Submission documentation

- [x] 1.1 Add root `SUBMISSION.md` with run instructions and a quick verification flow mapped to `requirements/requirement.md`
- [x] 1.2 Document expected URLs/ports (docs on `:4000`, web URL printed by Vite) and clarify that `.env` is not required (if true)
- [x] 1.3 Add root `AI_USAGE.md` with model/tool, representative prompts, and manual vs AI-assisted work split

## 2. README hygiene

- [x] 2.1 Update root `README.md` to link to `SUBMISSION.md` near quick start / commands
- [x] 2.2 Fix the broken operational-rules pointer (`AGENT.md`) to the actual file (`.ruler/agent.md`) or add a stable alias and link to it

## 3. Optional reviewer polish

- [x] 3.1 (Optional) Add guidance for “as-built” screenshots and where to place them (no code changes)

## 4. Verification

- [x] 4.1 Ensure all links in `README.md`/`SUBMISSION.md` resolve inside the repo
- [x] 4.2 Run `pnpm check` to confirm formatting/no-drift gates remain green
