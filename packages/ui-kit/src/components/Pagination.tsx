"use client";

import type * as React from "react";
import type { PaginationProps } from "../contracts/PaginationContract";
import { Icon } from "./Icon";

const buttonBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 30,
  height: 30,
  borderRadius: "var(--ui-radius-xs)",
  border: "1px solid var(--ui-color-border-subtle)",
  background: "var(--ui-color-surface)",
  color: "var(--ui-color-text-tertiary)",
  fontFamily: "var(--ui-font-heading)",
  fontSize: 14,
  lineHeight: "26px",
  cursor: "pointer",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number
) {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const half = Math.floor(maxVisiblePages / 2);
  let start = currentPage - half;
  let end = start + maxVisiblePages - 1;

  if (start < 1) {
    start = 1;
    end = maxVisiblePages;
  }

  if (end > totalPages) {
    end = totalPages;
    start = totalPages - maxVisiblePages + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function Pagination({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
  disabled,
  prevAriaLabel = "Previous page",
  nextAriaLabel = "Next page",
  pageAriaLabelPrefix = "Page",
  onPageChange,
}: PaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = clamp(currentPage, 1, safeTotalPages);
  const hasHighOverflow = currentPage > safeTotalPages;
  const hasLowOverflow = currentPage < 1;
  const pageButtons = getVisiblePages(
    safeCurrentPage,
    safeTotalPages,
    Math.max(3, maxVisiblePages)
  );
  const isDisabled = Boolean(disabled);
  const canPrev = !isDisabled && (safeCurrentPage > 1 || hasHighOverflow);
  const canNext =
    !isDisabled && (safeCurrentPage < safeTotalPages || hasLowOverflow);
  const prevTarget = hasHighOverflow ? safeTotalPages : safeCurrentPage - 1;
  const nextTarget = hasLowOverflow ? 1 : safeCurrentPage + 1;

  function emitPage(page: number) {
    if (isDisabled || page < 1 || page > safeTotalPages) {
      return;
    }
    if (page === currentPage) {
      return;
    }
    onPageChange?.({ page });
  }

  return (
    <nav
      aria-label="Pagination"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--ui-space-sm)",
      }}
    >
      <button
        aria-label={prevAriaLabel}
        disabled={!canPrev}
        onClick={() => emitPage(prevTarget)}
        style={{
          ...buttonBase,
          borderColor: "transparent",
          background: "transparent",
          width: 24,
          color: "var(--ui-color-text-muted)",
          opacity: canPrev ? 1 : 0.45,
          cursor: canPrev ? "pointer" : "default",
        }}
        type="button"
      >
        <Icon name="caret_left" size={20} />
      </button>
      {pageButtons.map((page) => {
        const selected = page === safeCurrentPage;
        return (
          <button
            aria-current={selected ? "page" : undefined}
            aria-label={`${pageAriaLabelPrefix} ${page}`}
            disabled={isDisabled}
            key={page}
            onClick={() => emitPage(page)}
            style={{
              ...buttonBase,
              borderColor: selected
                ? "var(--ui-color-accent)"
                : "var(--ui-color-border-subtle)",
              background: selected
                ? "var(--ui-color-accent)"
                : "var(--ui-color-surface)",
              color: selected
                ? "var(--ui-color-on-primary)"
                : "var(--ui-color-text-tertiary)",
              opacity: isDisabled ? 0.5 : 1,
              cursor: isDisabled ? "default" : "pointer",
            }}
            type="button"
          >
            {page}
          </button>
        );
      })}
      <button
        aria-label={nextAriaLabel}
        disabled={!canNext}
        onClick={() => emitPage(nextTarget)}
        style={{
          ...buttonBase,
          borderColor: "transparent",
          background: "transparent",
          width: 24,
          color: "var(--ui-color-text-muted)",
          opacity: canNext ? 1 : 0.45,
          cursor: canNext ? "pointer" : "default",
        }}
        type="button"
      >
        <Icon name="caret_right" size={20} />
      </button>
    </nav>
  );
}
