import type { CSSProperties, ReactNode } from "react";
import { z } from "zod";

export const modalContract = z.object({
	open: z.boolean(),
	title: z.string().min(1).optional(),
	description: z.string().min(1).optional(),
	size: z.enum(["sm", "md", "lg"]).optional(),
	dismissible: z.boolean().optional(),
	closeAriaLabel: z.string().min(1).optional(),
	labelledBy: z.string().min(1).optional(),
	describedBy: z.string().min(1).optional(),
});

export const modalEvents = {
	close: z.object({
		reason: z.enum(["escape", "backdrop", "close_button", "programmatic"]),
	}),
} as const;

export type ModalSerializableProps = z.infer<typeof modalContract>;

export type ModalEventPayloads = {
	[EventName in keyof typeof modalEvents]: z.infer<
		(typeof modalEvents)[EventName]
	>;
};

export type ModalHandlers = {
	[EventName in keyof ModalEventPayloads as `on${Capitalize<EventName & string>}`]?: (
		payload: ModalEventPayloads[EventName],
	) => void;
};

export interface ModalRuntimeProps {
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
}

export type ModalProps = ModalSerializableProps &
	ModalHandlers &
	ModalRuntimeProps;
