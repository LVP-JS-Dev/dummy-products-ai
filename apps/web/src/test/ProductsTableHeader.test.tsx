import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ProductsTableHeader } from "@/components/products/ProductsTableHeader";
import {
  mapTanStackHeaderGroupsToViewModel,
  type ProductsTableHeaderRowViewModel,
} from "@/components/products/ProductsTableHeaderModel";
import {
  mapProductToRow,
  type Product,
  type ProductRow,
} from "@/domain/Products";
import { productsTableColumns } from "@/domain/ProductsTableColumns";

afterEach(() => {
  cleanup();
});

function renderHeader(rows: ProductsTableHeaderRowViewModel[]) {
  return render(
    <table>
      <ProductsTableHeader rows={rows} />
    </table>
  );
}

function createProductsTable(data: ProductRow[], sorting: SortingState) {
  return createTable<ProductRow>({
    data,
    columns: productsTableColumns,
    state: {
      sorting,
      columnPinning: { left: [], right: [] },
    },
    onStateChange: () => undefined,
    renderFallbackValue: null,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
}

describe("ProductsTableHeader", () => {
  it("maps TanStack header state into sortable and direction view model fields", () => {
    const products: Product[] = [
      {
        id: 1,
        title: "Banana",
        price: 20,
        rating: 2.1,
        brand: "Brand A",
        sku: "BAN-1",
      },
    ];
    const table = createProductsTable(products.map(mapProductToRow), [
      { id: "price", desc: true },
    ]);

    const rows = mapTanStackHeaderGroupsToViewModel(table.getHeaderGroups());
    const price = rows[0].cells.find((cell) => cell.label === "Цена");
    const vendor = rows[0].cells.find((cell) => cell.label === "Вендор");

    expect(price?.direction).toBe("desc");
    expect(price?.sortable).toBe(true);
    expect(vendor?.sortable).toBe(false);
  });

  it("renders sortable and non-sortable columns with semantic headers", () => {
    renderHeader([
      {
        id: "header-row",
        cells: [
          {
            id: "name",
            label: "Название",
            sortable: true,
            direction: "asc",
            isPlaceholder: false,
            onSortToggle: () => undefined,
          },
          {
            id: "vendor",
            label: "Вендор",
            sortable: false,
            isPlaceholder: false,
          },
        ],
      },
    ]);

    const nameHeader = screen.getByRole("columnheader", { name: "Название" });
    const vendorHeader = screen.getByRole("columnheader", { name: "Вендор" });

    expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
    expect(vendorHeader).not.toHaveAttribute("aria-sort");

    const nameButton = screen.getByRole("button", { name: "Название" });
    expect(nameButton).toBeInTheDocument();
    expect(nameButton.innerHTML).toContain("<svg");
    expect(
      screen.queryByRole("button", { name: "Вендор" })
    ).not.toBeInTheDocument();
  });

  it("triggers sort callback for pointer and keyboard interactions", async () => {
    const user = userEvent.setup();
    const onSortToggle = vi.fn();

    renderHeader([
      {
        id: "header-row",
        cells: [
          {
            id: "price",
            label: "Цена",
            sortable: true,
            isPlaceholder: false,
            onSortToggle,
          },
        ],
      },
    ]);

    const sortButton = screen.getByRole("button", { name: "Цена" });

    await user.click(sortButton);
    expect(onSortToggle).toHaveBeenCalledTimes(1);

    sortButton.focus();
    await user.keyboard("{Enter}");
    expect(onSortToggle).toHaveBeenCalledTimes(2);
  });
});
