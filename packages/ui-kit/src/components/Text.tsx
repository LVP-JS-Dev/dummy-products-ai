"use client";

import type { CSSProperties, ElementType } from "react";
import type { TextProps } from "../contracts/TextContract";

const variantStyle: Record<NonNullable<TextProps["variant"]>, CSSProperties> = {
	body: {
		fontFamily: "var(--ui-font-body)",
		fontSize: 14,
		lineHeight: 1.4,
		color: "var(--ui-color-text)",
	},
	muted: {
		fontFamily: "var(--ui-font-ui)",
		fontSize: 16,
		lineHeight: "24px",
		color: "var(--ui-color-text-muted)",
	},
	heading: {
		fontFamily: "var(--ui-font-ui)",
		fontSize: 32,
		lineHeight: "38px",
		color: "var(--ui-color-text)",
		fontWeight: 700,
	},
	label: {
		fontFamily: "var(--ui-font-ui)",
		fontSize: 18,
		lineHeight: "27px",
		letterSpacing: "-0.27px",
		color: "var(--ui-color-text)",
		fontWeight: 500,
	},
	caption: {
		fontFamily: "var(--ui-font-body)",
		fontSize: 12,
		lineHeight: 1.3,
		color: "var(--ui-color-text-muted)",
	},
	ui: {
		fontFamily: "var(--ui-font-ui)",
		fontSize: 14,
		lineHeight: 1.2,
		color: "var(--ui-color-text)",
	},
};

const weightMap: Record<
	NonNullable<TextProps["weight"]>,
	CSSProperties["fontWeight"]
> = {
	regular: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
};

const alignMap: Record<
	NonNullable<TextProps["align"]>,
	CSSProperties["textAlign"]
> = {
	left: "left",
	center: "center",
	right: "right",
};

export function Text({
	content,
	variant = "body",
	as,
	align,
	weight,
	children,
	className,
	style,
	id,
}: TextProps) {
	const Component = (as ?? "span") as ElementType;

	return (
		<Component
			className={className}
			id={id}
			style={{
				margin: 0,
				...variantStyle[variant],
				fontWeight: weight
					? weightMap[weight]
					: variantStyle[variant].fontWeight,
				textAlign: align ? alignMap[align] : undefined,
				...style,
			}}
		>
			{children ?? content}
		</Component>
	);
}
