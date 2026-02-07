import { z } from "zod";

export const checkboxContract = z.object({
  checked: z.boolean(),
  label: z.string().optional(),
  disabled: z.boolean().optional(),
  name: z.string().optional(),
});

export const checkboxEvents = {
  checkedChange: z.object({
    checked: z.boolean(),
  }),
} as const;

export type CheckboxSerializableProps = z.infer<typeof checkboxContract>;

export type CheckboxEventPayloads = {
  [EventName in keyof typeof checkboxEvents]: z.infer<
    (typeof checkboxEvents)[EventName]
  >;
};

export type CheckboxHandlers = {
  [EventName in keyof CheckboxEventPayloads as `on${Capitalize<EventName & string>}`]?: (
    payload: CheckboxEventPayloads[EventName]
  ) => void;
};

export type CheckboxProps = CheckboxSerializableProps & CheckboxHandlers;
