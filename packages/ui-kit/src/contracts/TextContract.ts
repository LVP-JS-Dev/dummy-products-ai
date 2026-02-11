import type { CSSProperties, ReactNode } from "react";
import { z } from "zod";

export const textContract = z.object({
  content: z.string().optional(),
  variant: z
    .enum(["body", "muted", "heading", "label", "caption", "ui"])
    .optional(),
  as: z
    .enum([
      "span",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "label",
      "small",
      "strong",
      "div",
    ])
    .optional(),
  align: z.enum(["left", "center", "right"]).optional(),
  weight: z.enum(["regular", "medium", "semibold", "bold"]).optional(),
});

export type TextSerializableProps = z.infer<typeof textContract>;

export interface TextRuntimeProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

export type TextProps = TextSerializableProps & TextRuntimeProps;
