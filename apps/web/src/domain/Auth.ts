export type StorageScope = "local" | "session";

export interface AuthSession {
  token: string;
  username: string;
  scope: StorageScope;
}
