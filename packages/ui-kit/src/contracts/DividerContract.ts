import type { CSSProperties, ReactNode } from "react";
import { z } from "zod";

export const dividerContract = z.object({
	text: z.string().optional(),
	tone: z.enum(["default", "muted"]).optional(),
	thickness: z.number().int().positive().optional(),
});

export type DividerSerializableProps = z.infer<typeof dividerContract>;

export interface DividerRuntimeProps {
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
}

export type DividerProps = DividerSerializableProps & DividerRuntimeProps;
