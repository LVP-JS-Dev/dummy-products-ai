"use client";

import type { MouseEvent } from "react";
import type { LinkProps } from "../contracts/LinkContract";

function withSecurityRel(target: LinkProps["target"], rel: string | undefined) {
	if (target !== "_blank") {
		return rel;
	}

	const parts = new Set((rel ?? "").split(" ").filter(Boolean));
	parts.add("noopener");
	parts.add("noreferrer");
	return [...parts].join(" ");
}

export function Link({
	href,
	text,
	target,
	rel,
	disabled,
	underline = true,
	onPress,
	children,
	className,
	style,
	id,
	onClick,
}: LinkProps) {
	const secureRel = withSecurityRel(target, rel);
	const content = children ?? text;

	function handleClick(event: MouseEvent<HTMLAnchorElement>) {
		if (disabled) {
			event.preventDefault();
			return;
		}
		onPress?.({});
		onClick?.(event);
	}

	return (
		<a
			aria-disabled={disabled || undefined}
			className={className}
			href={href}
			id={id}
			onClick={handleClick}
			rel={secureRel}
			style={{
				color: "var(--ui-color-primary)",
				textDecoration: underline ? "underline" : "none",
				fontFamily: "inherit",
				fontSize: "inherit",
				fontWeight: 600,
				cursor: disabled ? "not-allowed" : "pointer",
				opacity: disabled ? 0.6 : 1,
				pointerEvents: disabled ? "none" : undefined,
				...style,
			}}
			target={target}
		>
			{content}
		</a>
	);
}
