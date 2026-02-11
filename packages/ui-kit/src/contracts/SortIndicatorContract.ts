import { z } from "zod";

export const sortIndicatorContract = z.object({
  direction: z.enum(["asc", "desc"]).optional(),
  size: z.number().int().positive().optional(),
  color: z.string().optional(),
});

export type SortIndicatorProps = z.infer<typeof sortIndicatorContract>;
