import { z } from "zod";
import { iconNames } from "../icons";

const iconNameSchema = z.enum([...(iconNames as string[])] as [string, ...string[]]);

export const buttonContract = z.object({
  text: z.string().min(1),
  variant: z.enum(["blue"]),
  showIcon: z.boolean().optional(),
  iconName: iconNameSchema.optional(),
  showDropdown: z.boolean().optional(),
  badgeLabel: z.string().optional(),
  badgeCount: z.number().int().nonnegative().optional(),
  showBadgeLabel: z.boolean().optional(),
  showBadgeCount: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

export type ButtonProps = z.infer<typeof buttonContract>;
