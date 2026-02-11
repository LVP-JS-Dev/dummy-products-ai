import type { CSSProperties, ReactNode } from "react";
import { z } from "zod";

export const imageContract = z.object({
  src: z.string().min(1),
  alt: z.string().optional(),
  decorative: z.boolean().optional(),
  fallbackSrc: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  loading: z.enum(["lazy", "eager"]).optional(),
  decoding: z.enum(["async", "sync", "auto"]).optional(),
  fetchPriority: z.enum(["high", "low", "auto"]).optional(),
  objectFit: z
    .enum(["fill", "contain", "cover", "none", "scale-down"])
    .optional(),
  objectPosition: z.string().optional(),
  aspectRatio: z.string().optional(),
});

export const imageEvents = {
  load: z.object({
    src: z.string(),
  }),
  error: z.object({
    src: z.string(),
  }),
} as const;

export type ImageSerializableProps = z.infer<typeof imageContract>;

export type ImageEventPayloads = {
  [EventName in keyof typeof imageEvents]: z.infer<
    (typeof imageEvents)[EventName]
  >;
};

export type ImageHandlers = {
  [EventName in keyof ImageEventPayloads as `on${Capitalize<EventName & string>}`]?: (
    payload: ImageEventPayloads[EventName]
  ) => void;
};

export interface ImageRuntimeProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export type ImageProps = ImageSerializableProps &
  ImageHandlers &
  ImageRuntimeProps;
