"use client";

import { Checkbox, states } from "@dummy-products/ui-kit";
import { useState } from "react";

export function WithControl() {
	const base = states.checkbox.Default;
	const [checked, setChecked] = useState<boolean>(base.checked);
	const [label, setLabel] = useState<string>(base.label ?? "");
	const [childLabel, setChildLabel] = useState<boolean>(true);

	return (
		<div style={{ display: "grid", gap: 16 }}>
			<Checkbox
				checked={checked}
				label={childLabel ? undefined : label}
				onCheckedChange={({ checked: next }) => setChecked(next)}
			>
				{childLabel ? label : undefined}
			</Checkbox>
			<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
				<label style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<input
						checked={checked}
						onChange={(event) => setChecked(event.target.checked)}
						type="checkbox"
					/>
					Checked
				</label>
				<label style={{ display: "grid", gap: 4 }}>
					<span>Label</span>
					<input
						onChange={(event) => setLabel(event.target.value)}
						value={label}
					/>
				</label>
				<label style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<input
						checked={childLabel}
						onChange={(event) => setChildLabel(event.target.checked)}
						type="checkbox"
					/>
					Label via children
				</label>
			</div>
		</div>
	);
}

export const story = { WithControl };
