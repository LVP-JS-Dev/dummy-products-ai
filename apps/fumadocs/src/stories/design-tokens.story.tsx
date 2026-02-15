"use client";

import { useMemo, useState } from "react";

const COLOR_BG_TOKENS = [
	"--ui-color-surface",
	"--ui-color-surface-muted",
	"--ui-color-primary",
	"--ui-color-success-surface",
] as const;
const COLOR_TEXT_TOKENS = [
	"--ui-color-text",
	"--ui-color-text-muted",
	"--ui-color-on-primary",
] as const;
const COLOR_BORDER_TOKENS = [
	"--ui-color-border",
	"--ui-color-border-secondary",
	"--ui-color-card-border",
	"--ui-color-focus-ring",
] as const;
const FONT_TOKENS = [
	"--ui-font-ui",
	"--ui-font-body",
	"--ui-font-heading",
	"--ui-font-roboto",
] as const;
const SPACE_TOKENS = [
	"--ui-space-sm",
	"--ui-space-md",
	"--ui-space-lg",
	"--ui-space-xxl",
] as const;
const RADIUS_TOKENS = [
	"--ui-radius-sm",
	"--ui-radius-md",
	"--ui-radius-lg",
] as const;

type TokenOption =
	| (typeof COLOR_BG_TOKENS)[number]
	| (typeof COLOR_TEXT_TOKENS)[number]
	| (typeof COLOR_BORDER_TOKENS)[number]
	| (typeof FONT_TOKENS)[number]
	| (typeof SPACE_TOKENS)[number]
	| (typeof RADIUS_TOKENS)[number];

function TokenSelect({
	id,
	label,
	onChange,
	options,
	value,
}: {
	id: string;
	label: string;
	onChange: (next: TokenOption) => void;
	options: readonly TokenOption[];
	value: TokenOption;
}) {
	return (
		<label htmlFor={id} style={{ display: "grid", gap: 4, width: "100%" }}>
			<span>{label}</span>
			<select
				id={id}
				onChange={(event) => onChange(event.target.value as TokenOption)}
				value={value}
			>
				{options.map((opt) => (
					<option key={opt} value={opt}>
						{opt}
					</option>
				))}
			</select>
		</label>
	);
}

export function WithControl() {
	const [backgroundToken, setBackgroundToken] = useState<TokenOption>(
		"--ui-color-success-surface",
	);
	const [textToken, setTextToken] = useState<TokenOption>("--ui-color-text");
	const [borderToken, setBorderToken] =
		useState<TokenOption>("--ui-color-border");
	const [fontToken, setFontToken] = useState<TokenOption>("--ui-font-body");
	const [spaceToken, setSpaceToken] = useState<TokenOption>("--ui-space-md");
	const [radiusToken, setRadiusToken] = useState<TokenOption>("--ui-radius-md");

	const cardStyle = useMemo(
		() => ({
			background: `var(${backgroundToken})`,
			border: `1px solid var(${borderToken})`,
			borderRadius: `var(${radiusToken})`,
			color: `var(${textToken})`,
			display: "grid",
			fontFamily: `var(${fontToken})`,
			gap: `var(${spaceToken})`,
			padding: `var(${spaceToken})`,
		}),
		[
			backgroundToken,
			borderToken,
			fontToken,
			radiusToken,
			spaceToken,
			textToken,
		],
	);

	return (
		<div style={{ display: "grid", gap: 16 }}>
			<div
				style={{
					alignItems: "end",
					display: "grid",
					gap: 12,
					gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
				}}
			>
				<TokenSelect
					id="token-bg"
					label="Background token"
					onChange={setBackgroundToken}
					options={COLOR_BG_TOKENS}
					value={backgroundToken}
				/>
				<TokenSelect
					id="token-text"
					label="Text token"
					onChange={setTextToken}
					options={COLOR_TEXT_TOKENS}
					value={textToken}
				/>
				<TokenSelect
					id="token-border"
					label="Border token"
					onChange={setBorderToken}
					options={COLOR_BORDER_TOKENS}
					value={borderToken}
				/>
				<TokenSelect
					id="token-font"
					label="Font token"
					onChange={setFontToken}
					options={FONT_TOKENS}
					value={fontToken}
				/>
				<TokenSelect
					id="token-space"
					label="Spacing token"
					onChange={setSpaceToken}
					options={SPACE_TOKENS}
					value={spaceToken}
				/>
				<TokenSelect
					id="token-radius"
					label="Radius token"
					onChange={setRadiusToken}
					options={RADIUS_TOKENS}
					value={radiusToken}
				/>
			</div>

			<div style={cardStyle}>
				<h3 style={{ fontFamily: `var(${fontToken})`, margin: 0 }}>
					Token Preview
				</h3>
				<p style={{ margin: 0 }}>
					This preview applies selected CSS variables via{" "}
					<code>var(--ui-*)</code>.
				</p>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: `var(${spaceToken})`,
					}}
				>
					<button
						style={{
							background: "var(--ui-color-primary)",
							border: "none",
							borderRadius: `var(${radiusToken})`,
							color: "var(--ui-color-on-primary)",
							fontFamily: `var(${fontToken})`,
							padding: `calc(var(${spaceToken}) * 0.75) var(${spaceToken})`,
						}}
						type="button"
					>
						Primary Action
					</button>
					<div
						style={{
							border: `1px solid var(${borderToken})`,
							borderRadius: `var(${radiusToken})`,
							padding: `calc(var(${spaceToken}) * 0.75)`,
						}}
					>
						Surface sample
					</div>
				</div>
			</div>
		</div>
	);
}

export const story = { WithControl };
