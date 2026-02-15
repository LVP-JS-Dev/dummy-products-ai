import type { CSSProperties } from "react";
import { z } from "zod";

export const spinnerContract = z.object({
	size: z.enum(["sm", "md", "lg"]).optional(),
	tone: z.enum(["primary", "muted", "inverse"]).optional(),
	label: z.string().optional(),
});

export type SpinnerSerializableProps = z.infer<typeof spinnerContract>;

export interface SpinnerRuntimeProps {
	className?: string;
	style?: CSSProperties;
}

export type SpinnerProps = SpinnerSerializableProps & SpinnerRuntimeProps;
