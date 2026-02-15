"use client";

import { SortIndicator } from "@dummy-products/ui-kit";
import { useState } from "react";

const options = ["", "asc", "desc"] as const;
type DirectionOption = (typeof options)[number];

export function WithControl() {
	const [direction, setDirection] = useState<DirectionOption>("asc");
	const [size, setSize] = useState<number>(14);

	return (
		<div style={{ display: "grid", gap: 16 }}>
			<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
				<span style={{ fontFamily: "var(--ui-font-body)" }}>Цена</span>
				<SortIndicator
					direction={direction ? (direction as "asc" | "desc") : undefined}
					size={size}
				/>
			</div>
			<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
				<label style={{ display: "grid", gap: 4 }}>
					<span>Direction</span>
					<select
						onChange={(event) =>
							setDirection(event.target.value as DirectionOption)
						}
						value={direction}
					>
						{options.map((option) => (
							<option key={option} value={option}>
								{option || "none"}
							</option>
						))}
					</select>
				</label>
				<label style={{ display: "grid", gap: 4 }}>
					<span>Size</span>
					<input
						min={8}
						onChange={(event) => setSize(Number(event.target.value) || 14)}
						type="number"
						value={size}
					/>
				</label>
			</div>
		</div>
	);
}

export const story = { WithControl };
