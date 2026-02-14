# Checkbox Size Parity (Figma-first)

## Context
We need to reduce Figma parity diffs. The design indicates 22px checkboxes across views. UI-kit is the source of truth.

## Decision
Adopt a `size` prop on UI-kit `Checkbox` with a default of 22px. This keeps flexibility for future 24px use while enforcing 22px everywhere by default.

## Approach Options
1. Single size change in component only (no prop)
2. **Add `size` prop with default 22px** (chosen)
3. Override size in apps only

## Proposed Design
### Architecture
- Update UI-kit contract/state/component to expose `size`.
- Default size is 22px; apps use default, unless explicitly overridden later.

### Components
- `CheckboxContract`: add `size?: "sm" | "md"`.
- `Checkbox`: map `sm=22px`, `md=24px`, default `sm`.
- `CheckboxStates`: include at least one state using default size.

### Data Flow
- Size is a pure prop; no new data flow or side effects.

### Error Handling
- No new runtime errors. Default ensures backwards compatibility.

### Testing
- Regenerate UI-kit artifacts.
- Run UI-kit tests.
- Rerun parity capture for login/products diffs.

## Acceptance Criteria
- All checkboxes render 22px by default.
- UI-kit documentation reflects `size` prop.
- Parity diff decreases or stays within tolerance.
