import assert from "node:assert/strict";
import test from "node:test";
import {
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";
import {
  mapProductToRow,
  type Product,
  type ProductRow,
} from "@/domain/Products";
import { productsTableColumns } from "@/domain/ProductsTableColumns";

function createProductsTable(data: ProductRow[], sorting: SortingState) {
  return createTable<ProductRow>({
    data,
    columns: productsTableColumns,
    state: { sorting },
    onStateChange: () => undefined,
    renderFallbackValue: null,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
}

test("products list and search data use the same TanStack columns and sorting behavior", () => {
  const listProducts: Product[] = [
    { id: 1, title: "Banana", price: 20, rating: 2.1, brand: "A", sku: "B-1" },
    { id: 2, title: "Apple", price: 30, rating: 4.8, brand: "B", sku: "A-1" },
  ];
  const searchProducts: Product[] = [
    { id: 3, title: "Zeta", price: 15, rating: 4.1, brand: "C", sku: "Z-1" },
    { id: 4, title: "Alpha", price: 10, rating: 2.2, brand: "D", sku: "A-2" },
  ];

  const sorting: SortingState = [{ id: "name", desc: false }];

  const listTable = createProductsTable(
    listProducts.map(mapProductToRow),
    sorting
  );
  const searchTable = createProductsTable(
    searchProducts.map(mapProductToRow),
    sorting
  );

  const listNames = listTable
    .getRowModel()
    .rows.map((row) => row.original.name);
  const searchNames = searchTable
    .getRowModel()
    .rows.map((row) => row.original.name);

  assert.deepEqual(listNames, ["Apple", "Banana"]);
  assert.deepEqual(searchNames, ["Alpha", "Zeta"]);

  assert.equal(productsTableColumns.length, 5);
});

test("products table supports price sorting", () => {
  const products: Product[] = [
    { id: 1, title: "Banana", price: 20, rating: 2.1, brand: "A", sku: "B-1" },
    { id: 2, title: "Apple", price: 30, rating: 4.8, brand: "B", sku: "A-1" },
    { id: 3, title: "Cherry", price: 10, rating: 3.2, brand: "C", sku: "C-1" },
  ];
  const sorting: SortingState = [{ id: "price", desc: false }];
  const table = createProductsTable(products.map(mapProductToRow), sorting);
  const prices = table.getRowModel().rows.map((row) => row.original.price);
  assert.deepEqual(prices, [10, 20, 30]);
});

test("products table supports rating sorting", () => {
  const products: Product[] = [
    { id: 1, title: "Banana", price: 20, rating: 2.1, brand: "A", sku: "B-1" },
    { id: 2, title: "Apple", price: 30, rating: 4.8, brand: "B", sku: "A-1" },
    { id: 3, title: "Cherry", price: 10, rating: 3.2, brand: "C", sku: "C-1" },
  ];
  const sorting: SortingState = [{ id: "rating", desc: false }];
  const table = createProductsTable(products.map(mapProductToRow), sorting);
  const ratings = table.getRowModel().rows.map((row) => row.original.rating);
  assert.deepEqual(ratings, [2.1, 3.2, 4.8]);
});
