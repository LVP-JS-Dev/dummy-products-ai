import type { SortingState, Updater } from "@tanstack/react-table";

import {
  ALLOWED_SORT_FIELDS,
  type SortDescriptor,
  type SortDirection,
  type SortField,
} from "@/domain/sort";

function isSortField(value: string): value is SortField {
  return (ALLOWED_SORT_FIELDS as readonly string[]).includes(value);
}

export function sortDescriptorToSortingState(
  sort: SortDescriptor
): SortingState {
  return [{ id: sort.field, desc: sort.direction === "desc" }];
}

export function sortingStateToSortDescriptor(
  sorting: SortingState,
  fallback: SortDescriptor
): SortDescriptor {
  const first = sorting[0];
  if (!(first && isSortField(first.id))) {
    return fallback;
  }

  const direction: SortDirection = first.desc ? "desc" : "asc";
  return { field: first.id, direction };
}

export function applySortingUpdate(
  updater: Updater<SortingState>,
  current: SortingState,
  fallback: SortDescriptor
): SortDescriptor {
  const next = typeof updater === "function" ? updater(current) : updater;
  return sortingStateToSortDescriptor(next, fallback);
}
