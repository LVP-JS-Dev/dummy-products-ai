export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
}

export async function readJsonOrThrow<T>(res: Response): Promise<T> {
	if (!res.ok) {
		let message = `Request failed (${res.status})`;
		try {
			const data = (await res.json()) as unknown;
			const msg = (data as { message?: unknown }).message;
			if (typeof msg === "string" && msg.trim()) {
				message = msg;
			}
		} catch {
			// ignore
		}
		throw new ApiError(message, res.status);
	}

	if (res.status === 204 || res.headers.get("content-length") === "0") {
		return undefined as T;
	}

	const contentType = res.headers.get("content-type") ?? "";
	if (!contentType.includes("application/json")) {
		return undefined as T;
	}

	return (await res.json()) as T;
}
