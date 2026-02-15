import { loadAuthSession } from "@/auth/Session";
import {
	ALLOWED_SORT_DIRECTIONS,
	ALLOWED_SORT_FIELDS,
	type SortDescriptor,
	type SortDirection,
	type SortField,
} from "@/domain/Sort";
import {
	readStorage,
	removeStorage,
	safeParseJson,
	writeStorage,
} from "@/lib/Storage";

const SORT_KEY = "dummy-products.sort";

function isSortField(value: unknown): value is SortField {
	return (
		typeof value === "string" &&
		ALLOWED_SORT_FIELDS.includes(value as (typeof ALLOWED_SORT_FIELDS)[number])
	);
}

function isSortDirection(value: unknown): value is SortDirection {
	return (
		typeof value === "string" &&
		ALLOWED_SORT_DIRECTIONS.includes(
			value as (typeof ALLOWED_SORT_DIRECTIONS)[number],
		)
	);
}

function parseSort(raw: string): SortDescriptor | null {
	const data = safeParseJson<unknown>(raw);
	if (!data || typeof data !== "object") {
		return null;
	}
	const field = (data as { field?: unknown }).field;
	const direction = (data as { direction?: unknown }).direction;
	if (!isSortField(field)) {
		return null;
	}
	if (!isSortDirection(direction)) {
		return null;
	}
	return { field, direction };
}

export function loadSort(): SortDescriptor | null {
	const session = loadAuthSession();
	if (!session) {
		return null;
	}
	const storage = session.scope === "local" ? localStorage : sessionStorage;
	const raw = readStorage(storage, SORT_KEY);
	if (!raw) {
		return null;
	}
	return parseSort(raw);
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
