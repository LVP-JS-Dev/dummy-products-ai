import type { CSSProperties, ReactNode } from "react";
import { z } from "zod";

export const cardContract = z.object({
	size: z.enum(["default", "sm"]).optional(),
	outlined: z.boolean().optional(),
	elevated: z.boolean().optional(),
	title: z.string().optional(),
	description: z.string().optional(),
});

export type CardSerializableProps = z.infer<typeof cardContract>;

export interface CardRuntimeProps {
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
}

export type CardProps = CardSerializableProps & CardRuntimeProps;
