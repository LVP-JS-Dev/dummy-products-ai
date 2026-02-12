"use client";

import type { ComponentProps } from "react";
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
  const outerShadow = elevated
    ? "0px 24px 32px 0px rgba(0, 0, 0, 0.04)"
    : "none";

  return (
    <div
      className={className}
      style={{
        boxSizing: "border-box",
        background: "#ffffff",
        padding: 6,
        borderRadius: 40,
        boxShadow: outerShadow,
        display: "flex",
        flexDirection: "column",
        color: "var(--ui-color-text)",
        ...style,
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          borderRadius: 34,
          padding: size === "sm" ? "24px 32px" : "32px 48px",
          border: outlined ? "1px solid transparent" : "none",
          backgroundColor: "#ffffff",
          backgroundImage: outlined
            ? [
                // Fill: #232323 @ 3% -> 0% (0%..50%)
                "linear-gradient(180deg, rgba(35, 35, 35, 0.03) 0%, rgba(35, 35, 35, 0) 50%)",
                // Stroke: #EDEDED @ 100% -> 0% (20%..100%)
                "linear-gradient(180deg, rgba(237, 237, 237, 1) 20%, rgba(237, 237, 237, 0) 100%)",
              ].join(",")
            : "linear-gradient(180deg, rgba(35, 35, 35, 0.03) 0%, rgba(35, 35, 35, 0) 50%)",
          backgroundClip: outlined ? "padding-box, border-box" : "padding-box",
          backgroundOrigin: outlined
            ? "padding-box, border-box"
            : "padding-box",
          display: "flex",
          flexDirection: "column",
          gap: size === "sm" ? "var(--ui-space-sm)" : "var(--ui-space-md)",
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
    </div>
  );
}

export function CardHeader({
  className,
  style,
  ...props
}: ComponentProps<"div">) {
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
}: ComponentProps<"div">) {
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
}: ComponentProps<"div">) {
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
}: ComponentProps<"div">) {
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
}: ComponentProps<"div">) {
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
}: ComponentProps<"div">) {
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
