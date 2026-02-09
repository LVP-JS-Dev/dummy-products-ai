export function safeParseJson<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function readStorage(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(
  storage: Storage,
  key: string,
  value: string
): void {
  try {
    storage.setItem(key, value);
  } catch {
    // ignore storage quota/security errors
  }
}

export function removeStorage(storage: Storage, key: string): void {
  try {
    storage.removeItem(key);
  } catch {
    // ignore
  }
}
