import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { z } from "zod";

export const linkContract = z.object({
	href: z.string().min(1),
	text: z.string().optional(),
	target: z.enum(["_self", "_blank", "_parent", "_top"]).optional(),
	rel: z.string().optional(),
	disabled: z.boolean().optional(),
	underline: z.boolean().optional(),
});

export const linkEvents = {
	press: z.object({}),
} as const;

export type LinkSerializableProps = z.infer<typeof linkContract>;

export type LinkEventPayloads = {
	[EventName in keyof typeof linkEvents]: z.infer<
		(typeof linkEvents)[EventName]
	>;
};

export type LinkHandlers = {
	[EventName in keyof LinkEventPayloads as `on${Capitalize<EventName & string>}`]?: (
		payload: LinkEventPayloads[EventName],
	) => void;
};

export interface LinkRuntimeProps {
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	id?: string;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export type LinkProps = LinkSerializableProps & LinkHandlers & LinkRuntimeProps;
