"use client";

import type { SpinnerProps } from "../contracts/SpinnerContract";

const sizeMap = {
	sm: "var(--ui-space-lg)",
	md: "var(--ui-space-xl)",
	lg: "var(--ui-space-xxl)",
} as const;

const toneMap = {
	primary: "var(--ui-color-primary)",
	muted: "var(--ui-color-text-muted)",
	inverse: "var(--ui-color-on-primary)",
} as const;

export function Spinner({
	size = "md",
	tone = "primary",
	label,
	className,
	style,
}: SpinnerProps) {
	const resolvedSize = sizeMap[size];
	const resolvedColor = toneMap[tone];

	return (
		<output
			aria-label={label ?? "Loading"}
			className={className}
			style={{
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				width: resolvedSize,
				height: resolvedSize,
				color: resolvedColor,
				...style,
			}}
		>
			<svg fill="none" height="100%" viewBox="0 0 24 24" width="100%">
				<title>{label ?? "Loading"}</title>
				<circle
					cx="12"
					cy="12"
					opacity="0.2"
					r="10"
					stroke="currentColor"
					strokeWidth="3"
				/>
				<path
					d="M22 12A10 10 0 0 0 12 2"
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="3"
				>
					<animateTransform
						attributeName="transform"
						dur="0.8s"
						from="0 12 12"
						repeatCount="indefinite"
						to="360 12 12"
						type="rotate"
					/>
				</path>
			</svg>
		</output>
	);
}
