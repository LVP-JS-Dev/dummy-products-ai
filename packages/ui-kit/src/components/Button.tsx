import * as React from "react";
import type { ButtonProps } from "../contracts/button.contract";
import { colors, radii, spacing, typography } from "../tokens";
import { Icon } from "./Icon";

const baseStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: spacing.lg,
  padding: `${spacing.md}px ${spacing.xxl}px`,
  borderRadius: radii.md,
  border: "none",
  cursor: "pointer",
  fontFamily: typography.heading,
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
}: ButtonProps) {
  const isDisabled = Boolean(disabled);
  const showLabel = showBadgeLabel ?? Boolean(badgeLabel);
  const showCount = showBadgeCount ?? typeof badgeCount === "number";

  return (
    <button
      type="button"
      disabled={isDisabled}
      style={{
        ...baseStyle,
        background: colors.blue.primary,
        color: colors.green.soft,
        opacity: isDisabled ? 0.6 : 1,
      }}
    >
      {showIcon && iconName ? <Icon name={iconName} size={18} /> : null}
      <span>{text}</span>
      {showLabel && badgeLabel ? (
        <span
          style={{
            ...badgeBase,
            background: colors.white,
            color: colors.blue.primary,
          }}
        >
          {badgeLabel}
        </span>
      ) : null}
      {showCount && typeof badgeCount === "number" ? (
        <span
          style={{
            ...badgeBase,
            background: colors.white,
            color: colors.blue.primary,
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
