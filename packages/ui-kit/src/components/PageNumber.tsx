import * as React from "react";
import type { PageNumberProps } from "../contracts/page-number.contract";
import { colors, radii, spacing, typography } from "../tokens";

export function PageNumber({ value, selected, disabled }: PageNumberProps) {
  return (
    <span
      aria-current={selected ? "page" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 30,
        height: 30,
        padding: `0 ${spacing.sm}px`,
        borderRadius: radii.md,
        border: `1px solid ${selected ? colors.blue.primary : colors.gray[200]}`,
        background: selected ? colors.blue.primary : colors.white,
        color: selected ? colors.white : colors.text.primary,
        fontFamily: typography.body,
        fontSize: 14,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {value}
    </span>
  );
}
