export type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  brand?: string | null;
  sku?: string | null;
};

export type ProductPage = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductRow = {
  id: number;
  name: string;
  price: number;
  vendor: string;
  article: string;
  rating: number;
};

export function mapProductToRow(product: Product): ProductRow {
  return {
    id: product.id,
    name: product.title,
    price: product.price,
    vendor: product.brand?.trim() || "-",
    article: product.sku?.trim() || String(product.id),
    rating: product.rating,
  };
}
