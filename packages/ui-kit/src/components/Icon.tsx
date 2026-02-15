import type { IconProps } from "../contracts/IconContract";
import { icons } from "../Icons";

const VIEW_BOX_REGEX = /viewBox="([^"]+)"/i;
const WHITESPACE_REGEX = /\s+/;
const WIDTH_REGEX = /width="[^"]*"/i;
const HEIGHT_REGEX = /height="[^"]*"/i;

function getViewBoxSize(svg: string) {
	const match = svg.match(VIEW_BOX_REGEX);
	if (!match?.[1]) {
		return null;
	}

	const parts = match[1]
		.trim()
		.split(WHITESPACE_REGEX)
		.map((part) => Number.parseFloat(part));

	if (parts.length !== 4 || Number.isNaN(parts[2]) || Number.isNaN(parts[3])) {
		return null;
	}

	return {
		width: parts[2],
		height: parts[3],
	};
}

function normalizeSvgSize(svg: string) {
	return svg
		.replace(WIDTH_REGEX, 'width="100%"')
		.replace(HEIGHT_REGEX, 'height="100%"');
}

export function Icon({ name, size = 24, color, title }: IconProps) {
	const rawSvg = icons[name];
	const svg = normalizeSvgSize(rawSvg);
	const viewBoxSize = getViewBoxSize(svg);
	const ratio =
		viewBoxSize && viewBoxSize.height > 0
			? viewBoxSize.width / viewBoxSize.height
			: 1;
	const fittedWidth = ratio >= 1 ? size : size * ratio;
	const fittedHeight = ratio >= 1 ? size / ratio : size;

	const wrapperStyle = {
		display: "inline-flex",
		width: size,
		height: size,
		color,
		lineHeight: 0,
		alignItems: "center",
		justifyContent: "center",
		background: "transparent",
		border: "none",
	} as const;

	const innerStyle = {
		display: "inline-flex",
		width: fittedWidth,
		height: fittedHeight,
		lineHeight: 0,
	} as const;

	if (title) {
		return (
			<span aria-label={title} role="img" style={wrapperStyle}>
				<span
					// biome-ignore lint/security/noDangerouslySetInnerHtml: SVGs are static, internal assets (no user input).
					dangerouslySetInnerHTML={{ __html: svg }}
					style={innerStyle}
				/>
			</span>
		);
	}

	return (
		<span aria-hidden style={wrapperStyle}>
			<span
				// biome-ignore lint/security/noDangerouslySetInnerHtml: SVGs are static, internal assets (no user input).
				dangerouslySetInnerHTML={{ __html: svg }}
				style={innerStyle}
			/>
		</span>
	);
}
