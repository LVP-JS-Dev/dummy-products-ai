import type { CSSProperties, ReactNode } from "react";
import { z } from "zod";

export const toastContract = z.object({
  title: z.string().optional(),
  description: z.string().min(1),
  tone: z
    .enum(["default", "success", "info", "warning", "error", "loading"])
    .optional(),
  dismissible: z.boolean().optional(),
  showIcon: z.boolean().optional(),
  actionLabel: z.string().optional(),
});

export const toastEvents = {
  dismiss: z.object({}),
  action: z.object({}),
} as const;

export type ToastSerializableProps = z.infer<typeof toastContract>;

export type ToastEventPayloads = {
  [EventName in keyof typeof toastEvents]: z.infer<
    (typeof toastEvents)[EventName]
  >;
};

export type ToastHandlers = {
  [EventName in keyof ToastEventPayloads as `on${Capitalize<EventName & string>}`]?: (
    payload: ToastEventPayloads[EventName]
  ) => void;
};

export interface ToastRuntimeProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type ToastProps = ToastSerializableProps &
  ToastHandlers &
  ToastRuntimeProps;
