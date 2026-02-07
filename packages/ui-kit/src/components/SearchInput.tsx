import type { SearchInputProps } from "../contracts/SearchInputContract";
import { colors, radii, spacing, typography } from "../Tokens";
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
        gap: spacing.sm,
        padding: `${spacing.sm}px ${spacing.md}px`,
        borderRadius: radii.lg,
        background: colors.white,
        border: `1px solid ${isActive ? colors.blue.accent : colors.gray[200]}`,
        minWidth: 220,
        opacity: isDisabled ? 0.6 : 1,
      }}
    >
      {showIcon ? (
        <Icon color={colors.text.placeholder} name="search" size={20} />
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
          color: colors.text.primary,
          fontFamily: typography.ui,
          fontSize: 14,
          minWidth: 160,
        }}
        type="search"
        value={currentValue}
      />
    </label>
  );
}
