import type { CheckboxProps } from "../contracts/CheckboxContract";
import { colors, radii, spacing, typography } from "../Tokens";

export function Checkbox({
  checked,
  label,
  disabled,
  name,
  onCheckedChange,
}: CheckboxProps) {
  return (
    <label
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: spacing.sm,
        opacity: disabled ? 0.6 : 1,
        fontFamily: typography.body,
        fontSize: 14,
        color: colors.text.primary,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <input
        checked={checked}
        disabled={disabled}
        name={name}
        onChange={(event) =>
          onCheckedChange?.({ checked: event.currentTarget.checked })
        }
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
        type="checkbox"
      />
      <span
        aria-hidden
        style={{
          width: 22,
          height: 22,
          borderRadius: radii.sm,
          border: `1px solid ${colors.gray[400]}`,
          background: checked ? colors.blue.primary : colors.white,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: colors.white,
          fontSize: 12,
          lineHeight: 1,
        }}
      >
        {checked ? "✓" : ""}
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
