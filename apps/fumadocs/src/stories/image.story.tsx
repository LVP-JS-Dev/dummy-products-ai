"use client";

import { Image, states } from "@dummy-products/ui-kit";

export function WithControl() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			<Image {...states.image.Content} />
			<Image {...states.image.WithFallback} />
		</div>
	);
}

export const story = { WithControl };
