import { Checkbox, Icon } from "@dummy-products/ui-kit";
import type { ColumnDef } from "@tanstack/react-table";

import type { ProductRow } from "@/domain/Products";

export interface ProductsColumnMeta {
	label: string;
	align?: "left" | "right" | "center";
}

const priceFormatter = new Intl.NumberFormat("ru-RU", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

function formatPriceRUB(value: number): string {
	return priceFormatter.format(value);
}

function formatRating(value: number): string {
	return `${value.toFixed(1)}/5`;
}

export const productsTableColumns: ColumnDef<ProductRow>[] = [
	{
		id: "select",
		enableSorting: false,
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllRowsSelected()}
				disabled={false}
				onCheckedChange={({ checked }) => table.toggleAllRowsSelected(checked)}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				disabled={false}
				onCheckedChange={({ checked }) => row.toggleSelected(checked)}
			/>
		),
		meta: { label: "", align: "left" } satisfies ProductsColumnMeta,
	},
	{
		id: "name",
		accessorKey: "name",
		header: "Наименование",
		enableSorting: true,
		cell: ({ row }) => {
			const img = row.original.thumbnailUrl;
			const category = row.original.category;
			return (
				<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
					<div
						aria-hidden
						style={{
							width: 48,
							height: 48,
							borderRadius: 8,
							background: "var(--ui-color-surface-muted)",
							overflow: "hidden",
							border: "1px solid var(--ui-color-border-subtle)",
							flex: "0 0 auto",
						}}
					>
						{img ? (
							<img
								alt=""
								height={48}
								src={img}
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
								width={48}
							/>
						) : null}
					</div>
					<div style={{ display: "grid", gap: 2 }}>
						<div
							style={{
								fontFamily: "var(--ui-font-heading)",
								fontWeight: 700,
								fontSize: 16,
								color: "#161919",
								lineHeight: "29.984px",
							}}
						>
							{row.original.name}
						</div>
						{category ? (
							<div
								style={{
									fontFamily: "var(--ui-font-body)",
									fontSize: 14,
									color: "var(--ui-color-text-muted)",
									lineHeight: "26.236px",
								}}
							>
								{category}
							</div>
						) : null}
					</div>
				</div>
			);
		},
		meta: { label: "Наименование", align: "left" } satisfies ProductsColumnMeta,
	},
	{
		id: "vendor",
		accessorKey: "vendor",
		header: "Вендор",
		enableSorting: false,
		cell: ({ row }) => (
			<span
				style={{
					fontFamily: "var(--ui-font-body)",
					fontWeight: 700,
					fontSize: 16,
					color: "#000000",
					lineHeight: "21.789px",
				}}
			>
				{row.original.vendor}
			</span>
		),
		meta: { label: "Вендор", align: "center" } satisfies ProductsColumnMeta,
	},
	{
		id: "article",
		accessorKey: "article",
		header: "Артикул",
		enableSorting: false,
		cell: ({ row }) => (
			<span
				style={{
					fontFamily: "var(--ui-font-body)",
					fontSize: 16,
					color: "#000000",
					lineHeight: "21.789px",
				}}
			>
				{row.original.article}
			</span>
		),
		meta: { label: "Артикул", align: "center" } satisfies ProductsColumnMeta,
	},
	{
		id: "rating",
		accessorKey: "rating",
		header: "Оценка",
		enableSorting: true,
		cell: ({ row }) => {
			const low = row.original.rating < 3;
			return (
				<span
					style={{
						fontFamily: "var(--ui-font-body)",
						fontSize: 16,
						lineHeight: "21.789px",
						color: low ? "#dc2626" : "#000000",
					}}
				>
					{formatRating(row.original.rating)}
				</span>
			);
		},
		meta: { label: "Оценка", align: "center" } satisfies ProductsColumnMeta,
	},
	{
		id: "price",
		accessorKey: "price",
		header: "Цена, ₽",
		enableSorting: true,
		cell: ({ row }) => (
			<span
				style={{
					fontFamily: "var(--ui-font-mono)",
					fontSize: 16,
					color: "#222222",
					lineHeight: "17.6px",
				}}
			>
				{formatPriceRUB(row.original.price)}
			</span>
		),
		meta: { label: "Цена, ₽", align: "center" } satisfies ProductsColumnMeta,
	},
	{
		id: "actions",
		enableSorting: false,
		header: "",
		cell: () => (
			<div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
				<button
					aria-label="Действие"
					style={{
						display: "inline-flex",
						width: 52,
						height: 27,
						borderRadius: 23,
						alignItems: "center",
						justifyContent: "center",
						background: "var(--ui-color-primary)",
						color: "var(--ui-color-on-primary)",
						border: "none",
						cursor: "pointer",
					}}
					type="button"
				>
					<Icon name="plus_circle" size={18} />
				</button>
				<button
					aria-label="Еще"
					style={{
						display: "inline-flex",
						width: 32,
						height: 32,
						borderRadius: 999,
						alignItems: "center",
						justifyContent: "center",
						border: "1px solid var(--ui-color-border)",
						color: "var(--ui-color-text-muted)",
						background: "transparent",
						cursor: "pointer",
					}}
					type="button"
				>
					<Icon name="more_horizontal" size={18} />
				</button>
			</div>
		),
		meta: { label: "", align: "right" } satisfies ProductsColumnMeta,
	},
];
