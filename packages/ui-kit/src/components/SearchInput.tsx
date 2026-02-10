"use client";

import type { SearchInputProps } from "../contracts/SearchInputContract";
import { Icon } from "./Icon";

export function SearchInput({
  placeholder,
  value,
  state,
  showIcon,
  onValueChange,
  onSubmit,
}: SearchInputProps) {
  const isDisabled = state === "disabled";
  const isActive = state === "active";
  const currentValue = value ?? "";

  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--ui-space-sm)",
        padding: "var(--ui-space-sm) var(--ui-space-md)",
        borderRadius: "var(--ui-radius-lg)",
        background: "var(--ui-color-surface)",
        border: `1px solid ${isActive ? "var(--ui-color-focus-ring)" : "var(--ui-color-border)"}`,
        minWidth: 220,
        opacity: isDisabled ? 0.6 : 1,
      }}
    >
      {showIcon ? (
        <Icon color={"var(--ui-color-text-muted)"} name="search" size={20} />
      ) : null}
      <input
        disabled={isDisabled}
        onChange={(event) =>
          onValueChange?.({ value: event.currentTarget.value })
        }
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSubmit?.({ value: event.currentTarget.value });
          }
        }}
        placeholder={placeholder}
        style={{
          border: "none",
          outline: "none",
          background: "transparent",
          color: "var(--ui-color-text)",
          fontFamily: "var(--ui-font-ui)",
          fontSize: 14,
          minWidth: 160,
        }}
        type="search"
        value={currentValue}
      />
    </label>
  );
}
