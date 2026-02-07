import { z } from "zod";

export const searchInputContract = z.object({
  placeholder: z.string().min(1),
  value: z.string().optional(),
  state: z.enum(["inactive", "active", "disabled"]),
  showIcon: z.boolean(),
});

export type SearchInputProps = z.infer<typeof searchInputContract>;
