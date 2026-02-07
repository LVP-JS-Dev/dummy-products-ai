import * as React from "react";
import type { SearchInputProps } from "../contracts/search-input.contract";
import { colors, radii, spacing, typography } from "../tokens";
import { Icon } from "./Icon";

export function SearchInput({
  placeholder,
  value,
  state,
  showIcon,
}: SearchInputProps) {
  const isDisabled = state === "disabled";
  const isActive = state === "active";

  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing.sm,
        padding: `${spacing.sm}px ${spacing.md}px`,
        borderRadius: radii.lg,
        background: colors.white,
        border: `1px solid ${isActive ? colors.blue.accent : colors.gray[200]}`,
        minWidth: 220,
        opacity: isDisabled ? 0.6 : 1,
      }}
    >
      {showIcon ? <Icon name="search" size={20} color={colors.text.placeholder} /> : null}
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        disabled={isDisabled}
        style={{
          border: "none",
          outline: "none",
          background: "transparent",
          color: colors.text.primary,
          fontFamily: typography.ui,
          fontSize: 14,
          minWidth: 160,
        }}
      />
    </label>
  );
}
