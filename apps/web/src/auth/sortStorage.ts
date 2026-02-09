import { loadAuthSession } from "@/auth/session";
import type { SortDescriptor } from "@/domain/sort";
import {
  readStorage,
  removeStorage,
  safeParseJson,
  writeStorage,
} from "@/lib/storage";

const SORT_KEY = "dummy-products.sort";

function parseSort(raw: string): SortDescriptor | null {
  const data = safeParseJson<unknown>(raw);
  if (!data || typeof data !== "object") return null;
  const field = (data as { field?: unknown }).field;
  const direction = (data as { direction?: unknown }).direction;
  if (field !== "name" && field !== "price" && field !== "rating") return null;
  if (direction !== "asc" && direction !== "desc") return null;
  return { field, direction };
}

export function loadSort(): SortDescriptor | null {
  const sessionRaw = readStorage(sessionStorage, SORT_KEY);
  if (sessionRaw) {
    const parsed = parseSort(sessionRaw);
    if (parsed) return parsed;
  }

  const localRaw = readStorage(localStorage, SORT_KEY);
  if (localRaw) {
    const parsed = parseSort(localRaw);
    if (parsed) return parsed;
  }

  return null;
}

export function saveSort(sort: SortDescriptor): void {
  const session = loadAuthSession();
  const storage = session?.scope === "local" ? localStorage : sessionStorage;
  writeStorage(storage, SORT_KEY, JSON.stringify(sort));
}

export function clearSort(): void {
  removeStorage(sessionStorage, SORT_KEY);
  removeStorage(localStorage, SORT_KEY);
}
