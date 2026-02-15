"use client";

import { Divider } from "@dummy-products/ui-kit";
import { useState } from "react";

export function WithControl() {
	const [text, setText] = useState("ИЛИ");

	return (
		<div style={{ display: "grid", gap: 16 }}>
			<Divider text={text} />
			<label style={{ display: "grid", gap: 4 }}>
				<span>Text</span>
				<input onChange={(event) => setText(event.target.value)} value={text} />
			</label>
		</div>
	);
}

export const story = { WithControl };
