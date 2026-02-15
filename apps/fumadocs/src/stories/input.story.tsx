"use client";

import { Input, states } from "@dummy-products/ui-kit";
import { LockKeyhole, User } from "lucide-react";
import { useState } from "react";

export function WithControl() {
	const base = states.input.Default;
	const [value, setValue] = useState<string>(base.value ?? "");
	const [error, setError] = useState<string>("");

	return (
		<div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
			<Input
				{...base}
				endAdornment={<LockKeyhole size={14} />}
				error={error || undefined}
				onValueChange={({ value: next }) => setValue(next)}
				startAdornment={<User size={14} />}
				value={value}
			/>
			<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
				<label style={{ display: "grid", gap: 4 }}>
					<span>Value</span>
					<input
						onChange={(event) => setValue(event.target.value)}
						value={value}
					/>
				</label>
				<label style={{ display: "grid", gap: 4 }}>
					<span>Error</span>
					<input
						onChange={(event) => setError(event.target.value)}
						placeholder="Optional error text"
						value={error}
					/>
				</label>
			</div>
		</div>
	);
}

export const story = { WithControl };
