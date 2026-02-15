import { SortIndicator } from "@dummy-products/ui-kit";
import type {
	ProductsTableHeaderCellViewModel,
	ProductsTableHeaderRowViewModel,
} from "@/components/products/ProductsTableHeaderModel";

function getAriaSort(
	cell: ProductsTableHeaderCellViewModel,
): "ascending" | "descending" | "none" | undefined {
	if (!cell.sortable) {
		return undefined;
	}
	if (cell.direction === "asc") {
		return "ascending";
	}
	if (cell.direction === "desc") {
		return "descending";
	}
	return "none";
}

function ProductsTableHeaderCell({
	cell,
}: {
	cell: ProductsTableHeaderCellViewModel;
}) {
	if (cell.isPlaceholder) {
		return <th />;
	}

	let alignClass = "";
	if (cell.align === "right") {
		alignClass = "text-right";
	} else if (cell.align === "center") {
		alignClass = "text-center";
	}
	const baseCellStyle = {
		padding: "22px 12px",
		verticalAlign: "middle",
	} as const;

	if (!(cell.sortable && cell.onSortToggle)) {
		return (
			<th
				aria-sort={getAriaSort(cell)}
				className={alignClass}
				style={baseCellStyle}
			>
				<span
					style={{
						fontFamily: "var(--ui-font-heading)",
						color: "var(--ui-color-text-tertiary)",
						fontWeight: 700,
						fontSize: 16,
						lineHeight: "29.984px",
					}}
				>
					{cell.label}
				</span>
			</th>
		);
	}

	return (
		<th
			aria-sort={getAriaSort(cell)}
			className={alignClass}
			style={baseCellStyle}
		>
			<button
				data-testid={`sort-${cell.id}`}
				onClick={cell.onSortToggle}
				style={{
					display: "inline-flex",
					alignItems: "center",
					gap: 4,
					fontFamily: "var(--ui-font-heading)",
					color: "var(--ui-color-text-tertiary)",
					fontWeight: 700,
					fontSize: 16,
					lineHeight: "29.984px",
				}}
				type="button"
			>
				<span>{cell.label}</span>
				<SortIndicator direction={cell.direction} size={14} />
			</button>
		</th>
	);
}

export function ProductsTableHeader({
	rows,
}: {
	rows: ProductsTableHeaderRowViewModel[];
}) {
	return (
		<thead style={{ background: "var(--ui-color-surface)" }}>
			{rows.map((row) => (
				<tr key={row.id}>
					{row.cells.map((cell) => (
						<ProductsTableHeaderCell cell={cell} key={cell.id} />
					))}
				</tr>
			))}
		</thead>
	);
}
