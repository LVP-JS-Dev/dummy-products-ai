"use client";

import { Link, states } from "@dummy-products/ui-kit";
import { useState } from "react";

export function WithControl() {
	const base = states.link.Default;
	const [href, setHref] = useState<string>(base.href);
	const [text, setText] = useState<string>(base.text ?? "Ссылка");

	return (
		<div style={{ display: "grid", gap: 16 }}>
			<Link href={href}>{text}</Link>
			<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
				<label style={{ display: "grid", gap: 4 }}>
					<span>Href</span>
					<input
						onChange={(event) => setHref(event.target.value)}
						value={href}
					/>
				</label>
				<label style={{ display: "grid", gap: 4 }}>
					<span>Text</span>
					<input
						onChange={(event) => setText(event.target.value)}
						value={text}
					/>
				</label>
			</div>
		</div>
	);
}

export const story = { WithControl };
