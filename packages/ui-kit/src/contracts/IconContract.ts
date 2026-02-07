import { z } from "zod";
import { iconNames } from "../Icons";

const iconNameSchema = z.enum([...(iconNames as string[])] as [
  string,
  ...string[],
]);

export const iconContract = z.object({
  name: iconNameSchema,
  size: z.number().int().positive().optional(),
  color: z.string().optional(),
  title: z.string().optional(),
});

export type IconProps = z.infer<typeof iconContract>;
