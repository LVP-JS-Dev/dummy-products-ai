import { ApiError, readJsonOrThrow } from "@/api/Http";
import type { ProductPage } from "@/domain/Products";

const BASE_URL = "https://dummyjson.com";
const REQUEST_TIMEOUT_MS = 10_000;

export interface LoginResponse {
	token: string;
	username: string;
}

async function fetchWithTimeout(
	input: URL | string,
	init?: RequestInit,
): Promise<Response> {
	const controller = new AbortController();
	const timeoutId = window.setTimeout(
		() => controller.abort(),
		REQUEST_TIMEOUT_MS,
	);
	try {
		return await fetch(input, { ...init, signal: controller.signal });
	} catch (err) {
		if (err instanceof DOMException && err.name === "AbortError") {
			throw new ApiError("Request timed out", 408);
		}
		throw err;
	} finally {
		window.clearTimeout(timeoutId);
	}
}

export async function login(input: {
	username: string;
	password: string;
}): Promise<LoginResponse> {
	const res = await fetchWithTimeout(`${BASE_URL}/auth/login`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			username: input.username,
			password: input.password,
		}),
	});

	const data = await readJsonOrThrow<
		Partial<LoginResponse> & { accessToken?: unknown; username?: unknown }
	>(res);

	let token: string | null = null;
	if (typeof data.token === "string" && data.token.length > 0) {
		token = data.token;
	} else if (
		typeof data.accessToken === "string" &&
		data.accessToken.length > 0
	) {
		token = data.accessToken;
	}

	if (!token) {
		throw new ApiError("Invalid auth response", 500);
	}
	return {
		token,
		username:
			typeof data.username === "string" && data.username.length > 0
				? data.username
				: input.username,
	};
}

export async function fetchProductsPage(input: {
	limit: number;
	skip: number;
}): Promise<ProductPage> {
	const url = new URL(`${BASE_URL}/products`);
	url.searchParams.set("limit", String(input.limit));
	url.searchParams.set("skip", String(input.skip));

	const res = await fetchWithTimeout(url);
	return await readJsonOrThrow<ProductPage>(res);
}

export async function searchProductsPage(input: {
	q: string;
	limit: number;
	skip: number;
}): Promise<ProductPage> {
	const url = new URL(`${BASE_URL}/products/search`);
	url.searchParams.set("q", input.q);
	url.searchParams.set("limit", String(input.limit));
	url.searchParams.set("skip", String(input.skip));

	const res = await fetchWithTimeout(url);
	return await readJsonOrThrow<ProductPage>(res);
}
