"use client";

import type { CSSProperties } from "react";
import type { ButtonProps } from "../contracts/ButtonContract";
import { Icon } from "./Icon";

const baseStyle: CSSProperties = {
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "var(--ui-space-sm)",
	padding: "var(--ui-space-md) var(--ui-space-lg)",
	borderRadius: "var(--ui-radius-md)",
	border: "none",
	cursor: "pointer",
	fontWeight: 600,
};

const variantStyle: Record<
	"blue" | "secondary" | "icon" | "ghost",
	CSSProperties
> = {
	blue: {
		background: "var(--ui-color-primary)",
		backgroundImage:
			"linear-gradient(180deg, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 12%) 100%)",
		color: "var(--ui-color-on-primary)",
		border: "1px solid var(--ui-color-primary-border)",
	},
	secondary: {
		background: "var(--ui-color-surface)",
		color: "var(--ui-color-text)",
		border: "1px solid var(--ui-color-border-subtle)",
	},
	icon: {
		background: "transparent",
		color: "var(--ui-color-text)",
		border: "none",
		padding: "var(--ui-space-sm)",
		minWidth: 32,
		minHeight: 32,
	},
	ghost: {
		background: "transparent",
		color: "var(--ui-color-text)",
		border: "none",
	},
};

const sizeStyle: Record<"sm" | "md" | "lg", CSSProperties> = {
	sm: {
		minHeight: 32,
		fontSize: 12,
		padding: "var(--ui-space-sm) var(--ui-space-md)",
		borderRadius: "var(--ui-radius-sm)",
		fontFamily: "var(--ui-font-ui)",
	},
	md: {
		minHeight: 42,
		fontSize: 14,
		borderRadius: "var(--ui-radius-sm)",
		fontFamily: "var(--ui-font-heading)",
		fontWeight: 600,
		lineHeight: "26.236px",
		letterSpacing: 0,
	},
	lg: {
		minHeight: 54,
		fontSize: 18,
		padding: "var(--ui-space-md) var(--ui-space-xl)",
		borderRadius: "var(--ui-radius-lg)",
		fontFamily: "var(--ui-font-ui)",
		fontWeight: 600,
		letterSpacing: "-0.18px",
		lineHeight: "22px",
	},
};

const badgeBase: CSSProperties = {
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "var(--ui-radius-pill)",
	padding: "2px 6px",
	fontSize: 10,
	fontWeight: 700,
	textTransform: "uppercase",
};

export function Button({
	text,
	variant = "blue",
	size = "md",
	showIcon,
	iconName,
	showDropdown,
	badgeLabel,
	badgeCount,
	showBadgeLabel,
	showBadgeCount,
	disabled,
	loading,
	fullWidth,
	buttonType,
	onPress,
	children,
	className,
	style,
	id,
	title,
	ariaLabel,
	ariaDescribedBy,
}: ButtonProps) {
	const isDisabled = Boolean(disabled) || Boolean(loading);
	const showLabel = showBadgeLabel ?? Boolean(badgeLabel);
	const showCount = showBadgeCount ?? typeof badgeCount === "number";

	const legacyContent = (
		<>
			{showIcon && iconName ? <Icon name={iconName} size={18} /> : null}
			{text ? <span>{text}</span> : null}
			{showLabel && badgeLabel ? (
				<span
					style={{
						...badgeBase,
						background: "var(--ui-color-surface)",
						color: "var(--ui-color-primary)",
					}}
				>
					{badgeLabel}
				</span>
			) : null}
			{showCount && typeof badgeCount === "number" ? (
				<span
					style={{
						...badgeBase,
						background: "var(--ui-color-surface)",
						color: "var(--ui-color-primary)",
						minWidth: 20,
					}}
				>
					{badgeCount}
				</span>
			) : null}
			{showDropdown ? <Icon name="caret_right" size={16} /> : null}
		</>
	);

	return (
		<button
			aria-busy={loading || undefined}
			aria-describedby={ariaDescribedBy}
			aria-label={ariaLabel}
			className={className}
			disabled={isDisabled}
			id={id}
			onClick={() => onPress?.({})}
			style={{
				...baseStyle,
				...variantStyle[variant],
				...sizeStyle[size],
				width: fullWidth ? "100%" : undefined,
				opacity: isDisabled ? 0.6 : 1,
				cursor: isDisabled ? "not-allowed" : "pointer",
				...style,
			}}
			title={title}
			type={buttonType ?? "button"}
		>
			{children ?? legacyContent}
		</button>
	);
}
