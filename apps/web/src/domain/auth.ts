export type StorageScope = "local" | "session";

export type AuthSession = {
  token: string;
  username: string;
  scope: StorageScope;
};
