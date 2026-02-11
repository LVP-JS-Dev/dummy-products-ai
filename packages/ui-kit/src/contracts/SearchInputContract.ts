import { z } from "zod";

export const searchInputContract = z.object({
  ariaLabel: z.string().optional(),
  placeholder: z.string().min(1),
  value: z.string().optional(),
  state: z.enum(["inactive", "active", "disabled"]),
  showIcon: z.boolean(),
});

export const searchInputEvents = {
  valueChange: z.object({
    value: z.string(),
  }),
  submit: z.object({
    value: z.string(),
  }),
} as const;

export type SearchInputSerializableProps = z.infer<typeof searchInputContract>;

export type SearchInputEventPayloads = {
  [EventName in keyof typeof searchInputEvents]: z.infer<
    (typeof searchInputEvents)[EventName]
  >;
};

export type SearchInputHandlers = {
  [EventName in keyof SearchInputEventPayloads as `on${Capitalize<EventName & string>}`]?: (
    payload: SearchInputEventPayloads[EventName]
  ) => void;
};

export type SearchInputProps = SearchInputSerializableProps &
  SearchInputHandlers;
