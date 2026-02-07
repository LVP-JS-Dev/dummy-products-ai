import { z } from "zod";
import { iconNames } from "../Icons";

const iconNameSchema = z.enum([...(iconNames as string[])] as [
  string,
  ...string[],
]);

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
  loading: z.boolean().optional(),
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

export type ButtonProps = ButtonSerializableProps & ButtonHandlers;
