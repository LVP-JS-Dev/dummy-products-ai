import { getConfig, setConfig } from "../generated/.kubb/fetch.ts";

export type {
	Client as DummyJsonClient,
	RequestConfig as DummyJsonRequestConfig,
	RequestCredentials as DummyJsonRequestCredentials,
	ResponseConfig as DummyJsonResponseConfig,
	ResponseErrorConfig as DummyJsonResponseErrorConfig,
} from "../generated/.kubb/fetch.ts";
export {
	fetch as dummyJsonFetch,
	getConfig as getDummyJsonFetchConfig,
	setConfig as setDummyJsonFetchConfig,
} from "../generated/.kubb/fetch.ts";
export {
	listProducts,
	login,
	searchProducts,
} from "../generated/clients/index.ts";
export type * from "../generated/models/index.ts";

type HeadersLike = Record<string, string> | [string, string][] | undefined;

function normalizeHeaders(headers: HeadersLike): Record<string, string> {
	if (!headers) {
		return {};
	}
	if (Array.isArray(headers)) {
		return Object.fromEntries(headers);
	}
	return { ...headers };
}

export function configureDummyJsonApi(input: {
	token?: string | null;
	json?: boolean;
	headers?: Record<string, string>;
}) {
	const current = getConfig();
	let headers = normalizeHeaders(current.headers);

	if (input.json !== false && !headers["content-type"]) {
		headers["content-type"] = "application/json";
	}

	if (input.headers) {
		Object.assign(headers, input.headers);
	}

	const token = input.token;
	if (typeof token === "string" && token.trim()) {
		headers.Authorization = `Bearer ${token}`;
	} else if (token === null) {
		// Avoid `delete` while still removing the header key.
		const { Authorization: _authorization, ...rest } = headers;
		headers = rest;
	}

	setConfig({ ...current, headers });
}

export function setDummyJsonAuthToken(token: string | null) {
	configureDummyJsonApi({ token });
}
