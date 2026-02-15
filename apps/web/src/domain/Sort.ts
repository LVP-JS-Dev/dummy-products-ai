export const ALLOWED_SORT_FIELDS = ["name", "price", "rating"] as const;
export const ALLOWED_SORT_DIRECTIONS = ["asc", "desc"] as const;

export type SortField = (typeof ALLOWED_SORT_FIELDS)[number];
export type SortDirection = (typeof ALLOWED_SORT_DIRECTIONS)[number];

export interface SortDescriptor {
	field: SortField;
	direction: SortDirection;
}

export function sortRows<
	T extends { name: string; price: number; rating: number },
>(rows: T[], sort: SortDescriptor): T[] {
	const dir = sort.direction === "asc" ? 1 : -1;
	const copy = [...rows];

	copy.sort((a, b) => {
		const av = a[sort.field];
		const bv = b[sort.field];

		if (typeof av === "string" && typeof bv === "string") {
			return av.localeCompare(bv) * dir;
		}

		return (Number(av) - Number(bv)) * dir;
	});

	return copy;
}
