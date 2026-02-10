"use client";

import type { PageNumberProps } from "../contracts/PageNumberContract";

export function PageNumber({
  value,
  selected,
  disabled,
  onPress,
}: PageNumberProps) {
  return (
    <button
      aria-current={selected ? "page" : undefined}
      disabled={disabled}
      onClick={() => onPress?.({ value })}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 30,
        height: 30,
        padding: "0 var(--ui-space-sm)",
        borderRadius: "var(--ui-radius-md)",
        border: `1px solid ${selected ? "var(--ui-color-primary)" : "var(--ui-color-border)"}`,
        background: selected
          ? "var(--ui-color-primary)"
          : "var(--ui-color-surface)",
        color: selected ? "var(--ui-color-on-primary)" : "var(--ui-color-text)",
        fontFamily: "var(--ui-font-body)",
        fontSize: 14,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      type="button"
    >
      {value}
    </button>
  );
}
