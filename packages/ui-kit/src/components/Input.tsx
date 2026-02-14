"use client";

import { useId } from "react";
import type { InputProps } from "../contracts/InputContract";

function getGridTemplate(hasStart: boolean, hasEnd: boolean) {
  if (hasStart && hasEnd) {
    return "auto minmax(0, 1fr) auto";
  }
  if (hasStart) {
    return "auto minmax(0, 1fr)";
  }
  if (hasEnd) {
    return "minmax(0, 1fr) auto";
  }
  return "minmax(0, 1fr)";
}

export function Input({
  id,
  name,
  label,
  ariaLabel,
  placeholder,
  value,
  type = "text",
  disabled,
  required,
  error,
  autoComplete,
  inputMode,
  startAdornment,
  endAdornment,
  className,
  style,
  errorId,
  onFocus,
  onBlur,
  onKeyDown,
  onValueChange,
  onSubmit,
}: InputProps) {
  const generatedId = useId();
  const generatedErrorId = useId();

  const inputId = id ?? generatedId;
  const resolvedErrorId = errorId ?? generatedErrorId;
  const hasStart = Boolean(startAdornment);
  const hasEnd = Boolean(endAdornment);
  const inputAriaLabel = label ? undefined : ariaLabel;

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gap: "var(--ui-space-xs)",
        ...style,
      }}
    >
      {label ? (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: "var(--ui-font-ui)",
            color: "var(--ui-color-text)",
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "27px",
            letterSpacing: "-0.27px",
          }}
        >
          {label}
        </label>
      ) : null}

      <div
        className="ui-inputRoot"
        style={{
          minHeight: 55,
          borderRadius: "var(--ui-radius-lg)",
          border: `1px solid ${error ? "var(--ui-color-danger)" : "var(--ui-color-border-control)"}`,
          display: "grid",
          gridTemplateColumns: getGridTemplate(hasStart, hasEnd),
          alignItems: "center",
          gap: "var(--ui-space-md)",
          padding: "0 var(--ui-space-lg)",
          color: "var(--ui-color-text-muted)",
          background: disabled
            ? "var(--ui-color-surface-muted)"
            : "var(--ui-color-surface)",
          opacity: disabled ? 0.7 : 1,
        }}
      >
        {hasStart ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {startAdornment}
          </span>
        ) : null}

        <input
          aria-describedby={error ? resolvedErrorId : undefined}
          aria-invalid={Boolean(error)}
          aria-label={inputAriaLabel}
          autoComplete={autoComplete}
          className="ui-input"
          disabled={disabled}
          id={inputId}
          inputMode={inputMode}
          name={name}
          onBlur={onBlur}
          onChange={(event) =>
            onValueChange?.({ value: event.currentTarget.value })
          }
          onFocus={onFocus}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (event.key === "Enter") {
              onSubmit?.({ value: event.currentTarget.value });
            }
          }}
          placeholder={placeholder}
          required={required}
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            minWidth: 0,
            fontFamily: "var(--ui-font-ui)",
            fontSize: 18,
            fontWeight: 500,
            lineHeight: "27px",
            letterSpacing: "-0.27px",
            color: "var(--ui-color-text)",
            background: "transparent",
          }}
          type={type}
          value={value ?? ""}
        />

        {hasEnd ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {endAdornment}
          </span>
        ) : null}
      </div>

      {error ? (
        <p
          id={resolvedErrorId}
          role="alert"
          style={{
            margin: 0,
            color: "var(--ui-color-danger)",
            fontFamily: "var(--ui-font-body)",
            fontSize: 12,
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
