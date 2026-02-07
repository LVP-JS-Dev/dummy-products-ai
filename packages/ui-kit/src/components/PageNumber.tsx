import type { PageNumberProps } from "../contracts/PageNumberContract";
import { colors, radii, spacing, typography } from "../Tokens";

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
        padding: `0 ${spacing.sm}px`,
        borderRadius: radii.md,
        border: `1px solid ${selected ? colors.blue.primary : colors.gray[200]}`,
        background: selected ? colors.blue.primary : colors.white,
        color: selected ? colors.white : colors.text.primary,
        fontFamily: typography.body,
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
