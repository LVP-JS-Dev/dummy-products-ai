"use client";

import type { CheckboxProps } from "../contracts/CheckboxContract";

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
        gap: "var(--ui-space-sm)",
        opacity: disabled ? 0.6 : 1,
        fontFamily: "var(--ui-font-body)",
        fontSize: 14,
        color: "var(--ui-color-text-primary)",
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
          borderRadius: "var(--ui-radius-sm)",
          border: "1px solid var(--ui-color-gray-400)",
          background: checked
            ? "var(--ui-color-blue-primary)"
            : "var(--ui-color-white)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ui-color-white)",
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
