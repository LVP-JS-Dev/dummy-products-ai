"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

import type { ModalProps } from "../contracts/ModalContract";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) {
    return [];
  }
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
    .filter((el) => !el.hasAttribute("disabled"))
    .filter((el) => el.getAttribute("aria-hidden") !== "true");
}

function getMaxWidth(size: "sm" | "md" | "lg") {
  if (size === "sm") {
    return 480;
  }
  if (size === "lg") {
    return 760;
  }
  return 620;
}

function CloseIcon() {
  return (
    <svg
      aria-hidden
      height="18"
      viewBox="0 0 24 24"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Close</title>
      <path
        d="M18 6L6 18M6 6l12 12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function Modal({
  open,
  title,
  description,
  size = "md",
  dismissible = true,
  closeAriaLabel = "Close dialog",
  labelledBy,
  describedBy,
  onClose,
  children,
  className,
  style,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const resolvedLabelledBy = labelledBy ?? (title ? titleId : undefined);
  const resolvedDescribedBy =
    describedBy ?? (description ? descriptionId : undefined);

  const body = useMemo(() => {
    if (typeof document === "undefined") {
      return null;
    }
    return document.body;
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousActive =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const focusable = getFocusableElements(panelRef.current);
    if (focusable.length > 0) {
      focusable[0]?.focus();
    } else {
      panelRef.current?.focus();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && dismissible) {
        event.preventDefault();
        onClose?.({ reason: "escape" });
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const currentFocusable = getFocusableElements(panelRef.current);
      if (currentFocusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = currentFocusable[0];
      const last = currentFocusable.at(-1);
      if (!(first && last)) {
        return;
      }

      const active = document.activeElement;
      if (event.shiftKey) {
        if (active === first || !panelRef.current?.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last || !panelRef.current?.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousActive?.focus();
    };
  }, [dismissible, onClose, open]);

  if (!(open && body)) {
    return null;
  }

  const maxWidth = getMaxWidth(size);

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "grid",
        placeItems: "center",
        padding: "var(--ui-space-lg)",
        background: "color-mix(in srgb, #000 40%, transparent)",
      }}
    >
      {dismissible ? (
        <button
          aria-label={closeAriaLabel}
          onClick={() => onClose?.({ reason: "backdrop" })}
          style={{
            position: "absolute",
            inset: 0,
            border: "none",
            background: "transparent",
            padding: 0,
            cursor: "default",
          }}
          type="button"
        />
      ) : null}
      <div
        aria-describedby={resolvedDescribedBy}
        aria-labelledby={resolvedLabelledBy}
        aria-modal="true"
        className={className}
        ref={panelRef}
        role="dialog"
        style={{
          position: "relative",
          zIndex: 1,
          width: "min(100%, 960px)",
          maxWidth,
          background: "var(--ui-color-surface)",
          borderRadius: "var(--ui-radius-lg)",
          border: "1px solid var(--ui-color-border)",
          boxShadow:
            "0 18px 40px color-mix(in srgb, var(--ui-color-text) 20%, transparent)",
          padding: "var(--ui-space-xxl)",
          color: "var(--ui-color-text)",
          outline: "none",
          ...style,
        }}
        tabIndex={-1}
      >
        {(title || dismissible) && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "var(--ui-space-md)",
              marginBottom: description
                ? "var(--ui-space-sm)"
                : "var(--ui-space-lg)",
            }}
          >
            <div style={{ flex: "1 1 auto", minWidth: 0 }}>
              {title ? (
                <div
                  id={resolvedLabelledBy === titleId ? titleId : undefined}
                  style={{
                    fontFamily: "var(--ui-font-heading)",
                    fontSize: 22,
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </div>
              ) : null}
              {description ? (
                <div
                  id={
                    resolvedDescribedBy === descriptionId
                      ? descriptionId
                      : undefined
                  }
                  style={{
                    marginTop: title ? 6 : 0,
                    fontFamily: "var(--ui-font-body)",
                    fontSize: 14,
                    color: "var(--ui-color-text-muted)",
                  }}
                >
                  {description}
                </div>
              ) : null}
            </div>
            {dismissible ? (
              <button
                aria-label={closeAriaLabel}
                onClick={() => onClose?.({ reason: "close_button" })}
                style={{
                  flex: "0 0 auto",
                  border: "1px solid var(--ui-color-border)",
                  background: "transparent",
                  borderRadius: "var(--ui-radius-pill)",
                  width: 36,
                  height: 36,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--ui-color-text-muted)",
                  cursor: "pointer",
                }}
                type="button"
              >
                <CloseIcon />
              </button>
            ) : null}
          </div>
        )}

        <div style={{ display: "grid", gap: "var(--ui-space-md)" }}>
          {children}
        </div>
      </div>
    </div>,
    body
  );
}
