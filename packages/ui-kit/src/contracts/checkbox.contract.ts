import { z } from "zod";

export const checkboxContract = z.object({
  checked: z.boolean(),
  label: z.string().optional(),
  disabled: z.boolean().optional(),
});

export type CheckboxProps = z.infer<typeof checkboxContract>;
