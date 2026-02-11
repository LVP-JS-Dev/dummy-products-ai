import type { CSSProperties, ReactNode } from "react";
import { z } from "zod";
import type { IconName } from "../Icons";
import { iconNames } from "../Icons";

const iconNameSchema = z.enum(iconNames as [IconName, ...IconName[]]);

export const buttonContract = z.object({
  text: z.string().min(1).optional(),
  variant: z.enum(["blue", "secondary", "ghost"]).optional(),
  size: z.enum(["sm", "md", "lg"]).optional(),
  showIcon: z.boolean().optional(),
  iconName: iconNameSchema.optional(),
  showDropdown: z.boolean().optional(),
  badgeLabel: z.string().optional(),
  badgeCount: z.number().int().nonnegative().optional(),
  showBadgeLabel: z.boolean().optional(),
  showBadgeCount: z.boolean().optional(),
  disabled: z.boolean().optional(),
  loading: z.boolean().optional(),
  fullWidth: z.boolean().optional(),
  buttonType: z.enum(["button", "submit", "reset"]).optional(),
});

export const buttonEvents = {
  press: z.object({}),
} as const;

export type ButtonSerializableProps = z.infer<typeof buttonContract>;

export type ButtonEventPayloads = {
  [EventName in keyof typeof buttonEvents]: z.infer<
    (typeof buttonEvents)[EventName]
  >;
};

export type ButtonHandlers = {
  [EventName in keyof ButtonEventPayloads as `on${Capitalize<EventName & string>}`]?: (
    payload: ButtonEventPayloads[EventName]
  ) => void;
};

export interface ButtonRuntimeProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  title?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export type ButtonProps = ButtonSerializableProps &
  ButtonHandlers &
  ButtonRuntimeProps;
