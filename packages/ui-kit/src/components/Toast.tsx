"use client";

import type { ToasterProps } from "sonner";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import type { ToastProps } from "../contracts/ToastContract";

const toneStyle = {
	default: {
		borderColor: "var(--ui-color-border)",
		icon: "●",
		iconColor: "var(--ui-color-text-muted)",
	},
	success: {
		borderColor: "var(--ui-color-success)",
		icon: "✓",
		iconColor: "var(--ui-color-success)",
	},
	info: {
		borderColor: "var(--ui-color-info)",
		icon: "i",
		iconColor: "var(--ui-color-info)",
	},
	warning: {
		borderColor: "var(--ui-color-warning)",
		icon: "!",
		iconColor: "var(--ui-color-warning)",
	},
	error: {
		borderColor: "var(--ui-color-danger)",
		icon: "×",
		iconColor: "var(--ui-color-danger)",
	},
	loading: {
		borderColor: "var(--ui-color-primary)",
		icon: "…",
		iconColor: "var(--ui-color-primary)",
	},
} as const;

export const toast = sonnerToast;

export function Toaster(props: ToasterProps) {
	return (
		<SonnerToaster
			closeButton
			position={props.position ?? "top-right"}
			toastOptions={{
				style: {
					background: "var(--ui-color-surface)",
					borderColor: "var(--ui-color-border)",
					color: "var(--ui-color-text)",
					fontFamily: "var(--ui-font-body)",
				},
			}}
			{...props}
		/>
	);
}

export function Toast({
	title,
	description,
	tone = "default",
	dismissible,
	showIcon = true,
	actionLabel,
	onDismiss,
	onAction,
	children,
	className,
	style,
}: ToastProps) {
	const resolved = toneStyle[tone];

	return (
		<output
			className={className}
			style={{
				border: `1px solid ${resolved.borderColor}`,
				borderRadius: "var(--ui-radius-md)",
				padding: "var(--ui-space-md)",
				background: "var(--ui-color-surface)",
				color: "var(--ui-color-text)",
				fontFamily: "var(--ui-font-body)",
				display: "grid",
				gap: "var(--ui-space-xs)",
				minWidth: 260,
				...style,
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
					gap: "var(--ui-space-sm)",
				}}
			>
				{showIcon ? (
					<span
						aria-hidden
						style={{ color: resolved.iconColor, fontWeight: 700 }}
					>
						{resolved.icon}
					</span>
				) : null}
				<div
					style={{ display: "grid", gap: "var(--ui-space-xs)", minWidth: 0 }}
				>
					{title ? (
						<div
							style={{ fontFamily: "var(--ui-font-heading)", fontWeight: 700 }}
						>
							{title}
						</div>
					) : null}
					<div style={{ color: "var(--ui-color-text-muted)" }}>
						{children ?? description}
					</div>
				</div>
			</div>

			{(dismissible || actionLabel) && (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "var(--ui-space-sm)",
					}}
				>
					{actionLabel ? (
						<button
							onClick={() => onAction?.({})}
							style={{
								border: "1px solid var(--ui-color-border)",
								borderRadius: "var(--ui-radius-sm)",
								background: "var(--ui-color-surface)",
								color: "var(--ui-color-text)",
								fontFamily: "var(--ui-font-ui)",
								padding: "2px var(--ui-space-sm)",
								cursor: "pointer",
							}}
							type="button"
						>
							{actionLabel}
						</button>
					) : null}
					{dismissible ? (
						<button
							aria-label="Dismiss"
							onClick={() => onDismiss?.({})}
							style={{
								border: "1px solid var(--ui-color-border)",
								borderRadius: "var(--ui-radius-sm)",
								background: "var(--ui-color-surface)",
								color: "var(--ui-color-text-muted)",
								fontFamily: "var(--ui-font-ui)",
								padding: "2px var(--ui-space-sm)",
								cursor: "pointer",
							}}
							type="button"
						>
							×
						</button>
					) : null}
				</div>
			)}
		</output>
	);
}
