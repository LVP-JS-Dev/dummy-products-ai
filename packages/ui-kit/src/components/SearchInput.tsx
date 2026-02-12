"use client";

import type { SearchInputProps } from "../contracts/SearchInputContract";
import { Icon } from "./Icon";

export function SearchInput({
  ariaLabel,
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
  const resolvedAriaLabel = ariaLabel ?? placeholder;

  return (
    <div
      className="ui-searchInputRoot"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--ui-space-md)",
        height: 48,
        padding: "0 var(--ui-space-lg)",
        borderRadius: "var(--ui-radius-md)",
        background: "var(--ui-color-surface-muted)",
        border: `1px solid ${isActive ? "var(--ui-color-focus-ring)" : "transparent"}`,
        minWidth: 220,
        opacity: isDisabled ? 0.6 : 1,
      }}
    >
      {showIcon ? (
        <Icon color={"var(--ui-color-text-muted)"} name="search_v2" size={24} />
      ) : null}
      <input
        aria-label={resolvedAriaLabel}
        className="ui-searchInput"
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
    </div>
  );
}
