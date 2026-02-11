import { SortIndicator } from "@dummy-products/ui-kit";
import type {
  ProductsTableHeaderCellViewModel,
  ProductsTableHeaderRowViewModel,
} from "@/components/products/ProductsTableHeaderModel";

function getAriaSort(
  cell: ProductsTableHeaderCellViewModel
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
    return <th key={cell.id} />;
  }

  const alignClass = cell.align === "right" ? "text-right" : "";

  if (!(cell.sortable && cell.onSortToggle)) {
    return (
      <th aria-sort={getAriaSort(cell)} className={alignClass} key={cell.id}>
        <span
          style={{
            fontFamily: "var(--ui-font-heading)",
            color: "var(--ui-color-text)",
            fontWeight: 600,
          }}
        >
          {cell.label}
        </span>
      </th>
    );
  }

  return (
    <th aria-sort={getAriaSort(cell)} className={alignClass} key={cell.id}>
      <button
        onClick={cell.onSortToggle}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontFamily: "var(--ui-font-heading)",
          color: "var(--ui-color-text)",
          fontWeight: 600,
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
    <thead style={{ background: "var(--ui-color-surface-muted)" }}>
      {rows.map((row) => (
        <tr className="[&>th]:px-3 [&>th]:py-2" key={row.id}>
          {row.cells.map((cell) => (
            <ProductsTableHeaderCell cell={cell} key={cell.id} />
          ))}
        </tr>
      ))}
    </thead>
  );
}
