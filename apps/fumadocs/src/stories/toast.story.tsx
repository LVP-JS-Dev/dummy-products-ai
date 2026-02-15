"use client";

import { states, Toast, Toaster, toast } from "@dummy-products/ui-kit";

export function WithControl() {
	const state = states.toast.Success;

	return (
		<div style={{ display: "grid", gap: 16 }}>
			<Toaster position="top-right" />
			<Toast {...state} />
			<button
				onClick={() => toast.success("Тестовый toast")}
				style={{
					border: "1px solid var(--ui-color-border)",
					borderRadius: "var(--ui-radius-sm)",
					padding: "var(--ui-space-sm) var(--ui-space-md)",
					fontFamily: "var(--ui-font-ui)",
					cursor: "pointer",
					background: "var(--ui-color-surface)",
				}}
				type="button"
			>
				Trigger toast
			</button>
		</div>
	);
}

export const story = { WithControl };
