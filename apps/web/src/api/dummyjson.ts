import { ApiError, readJsonOrThrow } from "@/api/http";
import type { ProductPage } from "@/domain/products";

const BASE_URL = "https://dummyjson.com";

export type LoginResponse = {
  token: string;
  username: string;
};

export async function login(input: {
  username: string;
  password: string;
}): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
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
  const token =
    typeof data.token === "string" && data.token.length > 0
      ? data.token
      : typeof data.accessToken === "string" && data.accessToken.length > 0
        ? data.accessToken
        : null;

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

  const res = await fetch(url);
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

  const res = await fetch(url);
  return await readJsonOrThrow<ProductPage>(res);
}
