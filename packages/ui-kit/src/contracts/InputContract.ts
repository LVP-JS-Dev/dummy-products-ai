import type {
  CSSProperties,
  InputHTMLAttributes,
  KeyboardEventHandler,
  ReactNode,
} from "react";
import { z } from "zod";

export const inputContract = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  label: z.string().optional(),
  ariaLabel: z.string().optional(),
  placeholder: z.string().optional(),
  value: z.string().optional(),
  type: z.enum(["text", "password", "email", "search", "number"]).optional(),
  disabled: z.boolean().optional(),
  required: z.boolean().optional(),
  error: z.string().optional(),
  autoComplete: z.string().optional(),
  inputMode: z
    .enum([
      "none",
      "text",
      "search",
      "email",
      "tel",
      "url",
      "numeric",
      "decimal",
    ])
    .optional(),
});

export const inputEvents = {
  valueChange: z.object({
    value: z.string(),
  }),
  submit: z.object({
    value: z.string(),
  }),
} as const;

export type InputSerializableProps = z.infer<typeof inputContract>;

export type InputEventPayloads = {
  [EventName in keyof typeof inputEvents]: z.infer<
    (typeof inputEvents)[EventName]
  >;
};

export type InputHandlers = {
  [EventName in keyof InputEventPayloads as `on${Capitalize<EventName & string>}`]?: (
    payload: InputEventPayloads[EventName]
  ) => void;
};

export interface InputRuntimeProps {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  className?: string;
  style?: CSSProperties;
  errorId?: string;
  onFocus?: InputHTMLAttributes<HTMLInputElement>["onFocus"];
  onBlur?: InputHTMLAttributes<HTMLInputElement>["onBlur"];
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

export type InputProps = InputSerializableProps &
  InputHandlers &
  InputRuntimeProps;
