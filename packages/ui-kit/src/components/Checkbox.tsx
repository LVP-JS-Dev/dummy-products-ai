"use client";

import { useId } from "react";
import type { CheckboxProps } from "../contracts/CheckboxContract";

export function Checkbox({
	checked,
	label,
	size = "sm",
	disabled,
	name,
	id,
	required,
	onCheckedChange,
	children,
	className,
	style,
}: CheckboxProps) {
	const autoId = useId();
	const inputId = id ?? autoId;
	const labelContent = children ?? label;
	const sizeMap = {
		sm: 22,
		md: 24,
	} as const;
	const boxSize = sizeMap[size] ?? sizeMap.sm;

	return (
		<label
			className={className}
			htmlFor={inputId}
			style={{
				position: "relative",
				display: "inline-flex",
				alignItems: "center",
				gap: "var(--ui-space-sm)",
				opacity: disabled ? 0.6 : 1,
				fontFamily: "var(--ui-font-ui)",
				fontSize: 16,
				fontWeight: 500,
				lineHeight: "24px",
				color: "var(--ui-color-text-muted)",
				cursor: disabled ? "not-allowed" : "pointer",
				...style,
			}}
		>
			<input
				checked={checked}
				disabled={disabled}
				id={inputId}
				name={name}
				onChange={(event) =>
					onCheckedChange?.({ checked: event.currentTarget.checked })
				}
				required={required}
				style={{
					position: "absolute",
					width: 1,
					height: 1,
					padding: 0,
					margin: -1,
					overflow: "hidden",
					clip: "rect(0, 0, 0, 0)",
					whiteSpace: "nowrap",
					border: 0,
				}}
				type="checkbox"
			/>
			<span
				aria-hidden
				style={{
					width: boxSize,
					height: boxSize,
					borderRadius: "var(--ui-radius-xs)",
					border: `1px solid ${checked ? "var(--ui-color-checkbox-selected)" : "var(--ui-color-icon-muted)"}`,
					background: checked
						? "var(--ui-color-checkbox-selected)"
						: "var(--ui-color-surface)",
					flexShrink: 0,
				}}
			/>
			{labelContent ? <span>{labelContent}</span> : null}
		</label>
	);
}
