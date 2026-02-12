"use client";

import type * as React from "react";
import type { CardProps } from "../contracts/CardContract";

export function Card({
  size = "default",
  outlined = true,
  elevated,
  title,
  description,
  children,
  className,
  style,
}: CardProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: size === "sm" ? "var(--ui-space-sm)" : "var(--ui-space-md)",
        borderRadius: "var(--ui-radius-lg)",
        border: outlined ? "6px solid var(--ui-color-card-border)" : "none",
        boxShadow: elevated
          ? "0 12px 30px color-mix(in srgb, var(--ui-color-text) 12%, transparent)"
          : "none",
        background: "var(--ui-color-card-surface)",
        color: "var(--ui-color-surface)",
        padding: size === "sm" ? "var(--ui-space-md)" : "var(--ui-space-lg)",
        ...style,
      }}
    >
      {title || description ? (
        <CardHeader>
          {title ? <CardTitle>{title}</CardTitle> : null}
          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
        </CardHeader>
      ) : null}
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gap: "var(--ui-space-xs)",
        ...style,
      }}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={className}
      style={{
        fontFamily: "var(--ui-font-heading)",
        fontSize: 20,
        fontWeight: 700,
        ...style,
      }}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={className}
      style={{
        fontFamily: "var(--ui-font-body)",
        fontSize: 14,
        color: "var(--ui-color-text-tertiary)",
        ...style,
      }}
      {...props}
    />
  );
}

export function CardContent({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gap: "var(--ui-space-sm)",
        ...style,
      }}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--ui-space-sm)",
        ...style,
      }}
      {...props}
    />
  );
}

export function CardAction({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={className}
      style={{
        marginLeft: "auto",
        display: "inline-flex",
        alignItems: "center",
        ...style,
      }}
      {...props}
    />
  );
}
