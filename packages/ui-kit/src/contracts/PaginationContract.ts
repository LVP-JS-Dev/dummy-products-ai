import { z } from "zod";

export const paginationContract = z.object({
	currentPage: z.number().int().min(1),
	totalPages: z.number().int().min(1),
	maxVisiblePages: z.number().int().min(3).optional(),
	disabled: z.boolean().optional(),
	prevAriaLabel: z.string().min(1).optional(),
	nextAriaLabel: z.string().min(1).optional(),
	pageAriaLabelPrefix: z.string().min(1).optional(),
});

export const paginationEvents = {
	pageChange: z.object({
		page: z.number().int().min(1),
	}),
} as const;

export type PaginationSerializableProps = z.infer<typeof paginationContract>;

export type PaginationEventPayloads = {
	[EventName in keyof typeof paginationEvents]: z.infer<
		(typeof paginationEvents)[EventName]
	>;
};

export type PaginationHandlers = {
	[EventName in keyof PaginationEventPayloads as `on${Capitalize<EventName & string>}`]?: (
		payload: PaginationEventPayloads[EventName],
	) => void;
};

export type PaginationProps = PaginationSerializableProps & PaginationHandlers;
