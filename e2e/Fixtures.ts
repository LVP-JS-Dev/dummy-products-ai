import type { Page, Route } from "@playwright/test";

export const AUTH_ENDPOINT = "**/dummyjson.com/auth/login";
export const PRODUCTS_ENDPOINT = "**/dummyjson.com/products?*";
export const SEARCH_ENDPOINT = "**/dummyjson.com/products/search?*";

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

export function buildProduct(overrides: Partial<Product> = {}): Product {
	return {
		id: overrides.id ?? 1,
		title: overrides.title ?? "Demo Product",
		price: overrides.price ?? 100,
		rating: overrides.rating ?? 4.2,
		brand: overrides.brand ?? "DemoVendor",
		sku: overrides.sku ?? "SKU-1",
		category: overrides.category ?? "Category",
		thumbnail: overrides.thumbnail ?? null,
	};
}

export function buildProductPage(
	overrides: Partial<ProductPage> = {},
): ProductPage {
	const products = overrides.products ?? [buildProduct()];
	const limit = overrides.limit ?? products.length;
	const skip = overrides.skip ?? 0;
	const total = overrides.total ?? products.length;

	return {
		products,
		total,
		skip,
		limit,
	};
}

export async function mockAuthSuccess(
	page: Page,
	payload: { token?: string; username?: string } = {},
) {
	const token = payload.token ?? "test-token";
	const username = payload.username ?? "kminchelle";

	await page.route(AUTH_ENDPOINT, async (route) => {
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({ token, username }),
		});
	});
}

export async function mockAuthError(
	page: Page,
	payload: { message?: string; status?: number } = {},
) {
	const message = payload.message ?? "Invalid credentials";
	const status = payload.status ?? 401;

	await page.route(AUTH_ENDPOINT, async (route) => {
		await route.fulfill({
			status,
			contentType: "application/json",
			body: JSON.stringify({ message }),
		});
	});
}

export async function mockProductsPage(
	page: Page,
	productPage: ProductPage,
	options: { delayMs?: number } = {},
) {
	await page.route(PRODUCTS_ENDPOINT, async (route: Route) => {
		if (options.delayMs) {
			await new Promise((resolve) => setTimeout(resolve, options.delayMs));
		}
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify(productPage),
		});
	});
}

export async function mockSearchPage(
	page: Page,
	productPage: ProductPage,
	options: { delayMs?: number } = {},
) {
	await page.route(SEARCH_ENDPOINT, async (route: Route) => {
		if (options.delayMs) {
			await new Promise((resolve) => setTimeout(resolve, options.delayMs));
		}
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify(productPage),
		});
	});
}

export async function seedAuthStorage(
	page: Page,
	payload: {
		token?: string;
		username?: string;
		scope?: "local" | "session";
	} = {},
) {
	const token = payload.token ?? "seed-token";
	const username = payload.username ?? "seed-user";
	const scope = payload.scope ?? "local";

	await page.addInitScript(
		({ tokenValue, usernameValue, scopeValue }) => {
			const key = "dummy-products.auth";
			const storage = scopeValue === "local" ? localStorage : sessionStorage;
			storage.setItem(
				key,
				JSON.stringify({ token: tokenValue, username: usernameValue }),
			);
		},
		{ tokenValue: token, usernameValue: username, scopeValue: scope },
	);
}

export async function clearAuthStorage(page: Page) {
	await page.addInitScript(() => {
		localStorage.removeItem("dummy-products.auth");
		sessionStorage.removeItem("dummy-products.auth");
	});
}
