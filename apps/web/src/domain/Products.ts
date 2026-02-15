export interface Product {
	id: number;
	title: string;
	price: number;
	rating: number;
	brand?: string | null;
	sku?: string | null;
	category?: string | null;
	thumbnail?: string | null;
}

export interface ProductPage {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
}

export interface ProductRow {
	id: number;
	name: string;
	category: string;
	thumbnailUrl: string | null;
	price: number;
	vendor: string;
	article: string;
	rating: number;
}

export function mapProductToRow(product: Product): ProductRow {
	return {
		id: product.id,
		name: product.title,
		category: product.category?.trim() || "",
		thumbnailUrl:
			typeof product.thumbnail === "string" && product.thumbnail.trim()
				? product.thumbnail
				: null,
		price: product.price,
		vendor: product.brand?.trim() || "-",
		article: product.sku?.trim() || String(product.id),
		rating: product.rating,
	};
}
