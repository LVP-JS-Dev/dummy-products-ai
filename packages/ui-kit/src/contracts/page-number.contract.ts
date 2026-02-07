import { z } from "zod";

export const pageNumberContract = z.object({
  value: z.union([z.number().int(), z.string()]),
  selected: z.boolean(),
  disabled: z.boolean().optional(),
});

export type PageNumberProps = z.infer<typeof pageNumberContract>;
