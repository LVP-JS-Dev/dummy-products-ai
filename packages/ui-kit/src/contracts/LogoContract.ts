import type { CSSProperties } from "react";
import { z } from "zod";

export const logoContract = z.object({
	size: z.number().int().positive().optional(),
	label: z.string().min(1).optional(),
	decorative: z.boolean().optional(),
	variant: z.enum(["mark"]).optional(),
});

export type LogoSerializableProps = z.infer<typeof logoContract>;

export interface LogoRuntimeProps {
	className?: string;
	style?: CSSProperties;
}

export type LogoProps = LogoSerializableProps & LogoRuntimeProps;
