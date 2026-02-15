"use client";

import type { SortIndicatorProps } from "../contracts/SortIndicatorContract";
import { Icon } from "./Icon";

function getRotation(direction: "asc" | "desc"): number {
	return direction === "asc" ? -90 : 90;
}

export function SortIndicator({
	direction,
	size = 14,
	color = "var(--ui-color-text-muted)",
}: SortIndicatorProps) {
	if (!direction) {
		return null;
	}

	return (
		<span
			aria-hidden
			style={{
				display: "inline-flex",
				transform: `rotate(${getRotation(direction)}deg)`,
			}}
		>
			<Icon color={color} name="caret_right" size={size} />
		</span>
	);
}
