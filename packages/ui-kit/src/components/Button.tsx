import type * as React from "react";
import type { ButtonProps } from "../contracts/ButtonContract";
import { Icon } from "./Icon";

const baseStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--ui-space-lg)",
  padding: "var(--ui-space-md) var(--ui-space-xxl)",
  borderRadius: "var(--ui-radius-md)",
  border: "none",
  cursor: "pointer",
  fontFamily: "var(--ui-font-heading)",
  fontWeight: 600,
  fontSize: 14,
  lineHeight: 1.4,
};

const badgeBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  padding: "2px 6px",
  fontSize: 10,
  fontWeight: 700,
  textTransform: "uppercase",
};

export function Button({
  text,
  variant,
  showIcon,
  iconName,
  showDropdown,
  badgeLabel,
  badgeCount,
  showBadgeLabel,
  showBadgeCount,
  disabled,
  loading,
  onPress,
}: ButtonProps) {
  const isDisabled = Boolean(disabled) || Boolean(loading);
  const showLabel = showBadgeLabel ?? Boolean(badgeLabel);
  const showCount = showBadgeCount ?? typeof badgeCount === "number";
  const { background, color } = {
    blue: {
      background: "var(--ui-color-blue-primary)",
      color: "var(--ui-color-green-soft)",
    },
  }[variant];

  return (
    <button
      aria-busy={loading || undefined}
      disabled={isDisabled}
      onClick={() => onPress?.({})}
      style={{
        ...baseStyle,
        background,
        color,
        opacity: isDisabled ? 0.6 : 1,
      }}
      type="button"
    >
      {showIcon && iconName ? <Icon name={iconName} size={18} /> : null}
      <span>{text}</span>
      {showLabel && badgeLabel ? (
        <span
          style={{
            ...badgeBase,
            background: "var(--ui-color-white)",
            color: "var(--ui-color-blue-primary)",
          }}
        >
          {badgeLabel}
        </span>
      ) : null}
      {showCount && typeof badgeCount === "number" ? (
        <span
          style={{
            ...badgeBase,
            background: "var(--ui-color-white)",
            color: "var(--ui-color-blue-primary)",
            minWidth: 20,
          }}
        >
          {badgeCount}
        </span>
      ) : null}
      {showDropdown ? <Icon name="caret_right" size={16} /> : null}
    </button>
  );
}
