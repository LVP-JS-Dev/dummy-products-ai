import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const navigateMock = vi.fn();
const loginMock = vi.fn();
const saveAuthSessionMock = vi.fn();
const loadLastUsedUsernameMock = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => () => ({}),
  useNavigate: () => navigateMock,
}));

vi.mock("@/api/dummyjson", () => ({
  login: (input: unknown) => loginMock(input),
}));

vi.mock("@/auth/session", () => ({
  saveAuthSession: (input: unknown) => saveAuthSessionMock(input),
  loadLastUsedUsername: () => loadLastUsedUsernameMock(),
}));

import { LoginPage } from "../routes/login";

describe("LoginPage", () => {
  beforeEach(() => {
    loginMock.mockReset();
    saveAuthSessionMock.mockReset();
    navigateMock.mockReset();
    loadLastUsedUsernameMock.mockReset();
    loadLastUsedUsernameMock.mockReturnValue(null);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders core figma-aligned login structure", () => {
    render(<LoginPage />);

    expect(
      screen.getByRole("heading", { name: "Добро пожаловать!" })
    ).toBeInTheDocument();
    expect(screen.getByText("Пожалуйста, авторизируйтесь")).toBeInTheDocument();
    expect(screen.getByLabelText("Логин")).toBeInTheDocument();
    expect(screen.getByLabelText("Пароль")).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Запомнить данные" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Войти" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Создать" })).toBeInTheDocument();
  });

  it("blocks submission and exposes accessible validation errors for empty required fields", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(screen.getByRole("button", { name: "Войти" }));

    expect(loginMock).not.toHaveBeenCalled();
    expect(screen.getByText("Логин обязателен")).toBeVisible();
    expect(screen.getByText("Пароль обязателен")).toBeVisible();

    const usernameInput = screen.getByLabelText("Логин");
    const passwordInput = screen.getByLabelText("Пароль");

    expect(usernameInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    expect(usernameInput).toHaveAccessibleDescription("Логин обязателен");
    expect(passwordInput).toHaveAccessibleDescription("Пароль обязателен");
  });

  it("prevents duplicate submits during in-flight request and keeps retry path after API error", async () => {
    const user = userEvent.setup();
    let resolveLogin:
      | ((value: { token: string; username: string }) => void)
      | null = null;
    loginMock.mockImplementation(
      () =>
        new Promise<{ token: string; username: string }>((resolve) => {
          resolveLogin = resolve;
        })
    );

    render(<LoginPage />);

    await user.type(screen.getByLabelText("Логин"), "kminchelle");
    await user.type(screen.getByLabelText("Пароль"), "0lelplR");

    const submitButton = screen.getByRole("button", { name: "Войти" });
    await Promise.all([user.click(submitButton), user.click(submitButton)]);

    expect(loginMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Вход..." })).toBeDisabled();

    if (!resolveLogin) {
      throw new Error("Expected login promise resolver");
    }
    const finishLogin = resolveLogin as (value: {
      token: string;
      username: string;
    }) => void;
    finishLogin({ token: "token", username: "kminchelle" });

    await waitFor(() => {
      expect(saveAuthSessionMock).toHaveBeenCalledWith({
        token: "token",
        username: "kminchelle",
        rememberMe: false,
      });
      expect(navigateMock).toHaveBeenCalledWith({ to: "/products" });
    });

    loginMock.mockRejectedValueOnce(new Error("Invalid credentials"));
    await user.click(screen.getByRole("button", { name: "Войти" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid credentials"
    );
    expect(screen.getByRole("button", { name: "Войти" })).toBeEnabled();
  });

  it("passes rememberMe=true when checkbox is selected", async () => {
    const user = userEvent.setup();
    loginMock.mockResolvedValue({ token: "token-2", username: "user-2" });
    render(<LoginPage />);

    await user.type(screen.getByLabelText("Логин"), "user-2");
    await user.type(screen.getByLabelText("Пароль"), "password-2");
    await user.click(
      screen.getByRole("checkbox", { name: "Запомнить данные" })
    );
    await user.click(screen.getByRole("button", { name: "Войти" }));

    await waitFor(() => {
      expect(saveAuthSessionMock).toHaveBeenCalledWith({
        token: "token-2",
        username: "user-2",
        rememberMe: true,
      });
    });
  });
});
