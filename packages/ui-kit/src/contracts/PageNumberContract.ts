import { z } from "zod";

export const pageNumberContract = z.object({
  value: z.union([z.number().int(), z.string()]),
  selected: z.boolean(),
  disabled: z.boolean().optional(),
});

export const pageNumberEvents = {
  press: z.object({
    value: z.union([z.number().int(), z.string()]),
  }),
} as const;

export type PageNumberSerializableProps = z.infer<typeof pageNumberContract>;

export type PageNumberEventPayloads = {
  [EventName in keyof typeof pageNumberEvents]: z.infer<
    (typeof pageNumberEvents)[EventName]
  >;
};

export type PageNumberHandlers = {
  [EventName in keyof PageNumberEventPayloads as `on${Capitalize<EventName & string>}`]?: (
    payload: PageNumberEventPayloads[EventName]
  ) => void;
};

export type PageNumberProps = PageNumberSerializableProps & PageNumberHandlers;
