import type { ColumnDef } from "@tanstack/react-table";

import type { ProductRow } from "@/domain/Products";

export interface ProductsColumnMeta {
  label: string;
  align?: "left" | "right";
}

export const productsTableColumns: ColumnDef<ProductRow>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Название",
    enableSorting: true,
    meta: { label: "Название", align: "left" } satisfies ProductsColumnMeta,
  },
  {
    id: "vendor",
    accessorKey: "vendor",
    header: "Вендор",
    enableSorting: false,
    meta: { label: "Вендор", align: "left" } satisfies ProductsColumnMeta,
  },
  {
    id: "article",
    accessorKey: "article",
    header: "Артикул",
    enableSorting: false,
    meta: { label: "Артикул", align: "left" } satisfies ProductsColumnMeta,
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Цена",
    enableSorting: true,
    meta: { label: "Цена", align: "right" } satisfies ProductsColumnMeta,
  },
  {
    id: "rating",
    accessorKey: "rating",
    header: "Рейтинг",
    enableSorting: true,
    meta: { label: "Рейтинг", align: "right" } satisfies ProductsColumnMeta,
  },
];
