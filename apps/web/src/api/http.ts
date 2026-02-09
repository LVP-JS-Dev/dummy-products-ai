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
      if (typeof msg === "string" && msg.trim()) message = msg;
    } catch {
      // ignore
    }
    throw new ApiError(message, res.status);
  }

  return (await res.json()) as T;
}
