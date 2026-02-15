import type { Header, HeaderGroup } from "@tanstack/react-table";

import type { ProductRow } from "@/domain/Products";
import type { ProductsColumnMeta } from "@/domain/ProductsTableColumns";

export interface ProductsTableHeaderCellViewModel {
	id: string;
	label: string;
	align?: "left" | "right";
	sortable: boolean;
	direction?: "asc" | "desc";
	isPlaceholder: boolean;
	onSortToggle?: () => void;
}

export interface ProductsTableHeaderRowViewModel {
	id: string;
	cells: ProductsTableHeaderCellViewModel[];
}

function getSortDirection(
	sorted: false | "asc" | "desc",
): "asc" | "desc" | undefined {
	if (sorted === false) {
		return undefined;
	}
	if (sorted === "desc") {
		return "desc";
	}
	return "asc";
}

function getHeaderLabel(
	header: Header<ProductRow, unknown>,
	meta?: ProductsColumnMeta,
): string {
	if (meta && typeof meta.label === "string") {
		return meta.label;
	}
	if (typeof header.column.columnDef.header === "string") {
		return header.column.columnDef.header;
	}
	return header.column.id;
}

export function mapTanStackHeaderToViewModel(
	header: Header<ProductRow, unknown>,
): ProductsTableHeaderCellViewModel {
	if (header.isPlaceholder) {
		return {
			id: header.id,
			label: "",
			sortable: false,
			isPlaceholder: true,
		};
	}

	const meta = header.column.columnDef.meta as ProductsColumnMeta | undefined;
	const sortable = header.column.getCanSort();
	const direction = getSortDirection(header.column.getIsSorted());

	return {
		id: header.id,
		label: getHeaderLabel(header, meta),
		align: meta?.align,
		sortable,
		direction,
		isPlaceholder: false,
		onSortToggle: sortable
			? () => header.column.toggleSorting(direction === "asc")
			: undefined,
	};
}

export function mapTanStackHeaderGroupsToViewModel(
	headerGroups: HeaderGroup<ProductRow>[],
): ProductsTableHeaderRowViewModel[] {
	return headerGroups.map((group) => ({
		id: group.id,
		cells: group.headers.map(mapTanStackHeaderToViewModel),
	}));
}
