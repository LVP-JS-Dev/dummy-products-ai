import * as React from "react";
import type { CheckboxProps } from "../contracts/checkbox.contract";
import { colors, radii, spacing, typography } from "../tokens";

export function Checkbox({ checked, label, disabled }: CheckboxProps) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing.sm,
        opacity: disabled ? 0.6 : 1,
        fontFamily: typography.body,
        fontSize: 14,
        color: colors.text.primary,
      }}
    >
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
