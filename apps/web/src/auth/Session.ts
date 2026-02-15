import type { AuthSession, StorageScope } from "@/domain/Auth";
import {
	readStorage,
	removeStorage,
	safeParseJson,
	writeStorage,
} from "@/lib/Storage";

const AUTH_KEY = "dummy-products.auth";

interface StoredAuth {
	token: string;
	username: string;
}

function parseStoredAuth(raw: string): StoredAuth | null {
	const data = safeParseJson<unknown>(raw);
	if (!data || typeof data !== "object") {
		return null;
	}
	const token = (data as { token?: unknown }).token;
	const username = (data as { username?: unknown }).username;

	if (typeof token !== "string" || token.length === 0) {
		return null;
	}
	if (typeof username !== "string" || username.length === 0) {
		return null;
	}

	return { token, username };
}

export function loadAuthSession(): AuthSession | null {
	const sessionRaw = readStorage(sessionStorage, AUTH_KEY);
	if (sessionRaw) {
		const parsed = parseStoredAuth(sessionRaw);
		if (parsed) {
			return { ...parsed, scope: "session" };
		}
	}

	const localRaw = readStorage(localStorage, AUTH_KEY);
	if (localRaw) {
		const parsed = parseStoredAuth(localRaw);
		if (parsed) {
			return { ...parsed, scope: "local" };
		}
	}

	return null;
}

export function saveAuthSession(input: {
	token: string;
	username: string;
	rememberMe: boolean;
}): AuthSession {
	clearAuthSession();
	const scope: StorageScope = input.rememberMe ? "local" : "session";
	const storage = scope === "local" ? localStorage : sessionStorage;
	writeStorage(
		storage,
		AUTH_KEY,
		JSON.stringify({ token: input.token, username: input.username }),
	);
	return { token: input.token, username: input.username, scope };
}

export function clearAuthSession(): void {
	removeStorage(sessionStorage, AUTH_KEY);
	removeStorage(localStorage, AUTH_KEY);
}

export function loadLastUsedUsername(): string | null {
	const session = loadAuthSession();
	return session?.username ?? null;
}
