import { Icon } from "@dummy-products/ui-kit";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, User, X } from "lucide-react";
import {
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { login } from "@/api/DummyJson";
import { ApiError } from "@/api/Http";
import { loadLastUsedUsername, saveAuthSession } from "@/auth/Session";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

type FieldErrors = Partial<Record<"username" | "password" | "form", string>>;

export function validateLoginFields(input: {
  username: string;
  password: string;
}): FieldErrors {
  const nextErrors: FieldErrors = {};
  if (!input.username.trim()) {
    nextErrors.username = "Логин обязателен";
  }
  if (!input.password.trim()) {
    nextErrors.password = "Пароль обязателен";
  }
  return nextErrors;
}

export function readAuthErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    return err.message;
  }
  if (err instanceof Error && err.message.trim()) {
    return err.message;
  }
  return "Не удалось выполнить вход";
}

export function LoginPage() {
  const navigate = useNavigate();
  const defaultUsername = useMemo(() => loadLastUsedUsername() ?? "", []);

  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const usernameErrorId = useId();
  const passwordErrorId = useId();
  const formErrorId = useId();

  async function submitLogin() {
    if (submittingRef.current) {
      return;
    }

    const nextErrors = validateLoginFields({ username, password });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setErrors({});

    try {
      const trimmedUsername = username.trim();
      const res = await login({ username: trimmedUsername, password });
      saveAuthSession({
        token: res.token,
        username: res.username ?? trimmedUsername,
        rememberMe,
      });
      await navigate({ to: "/products" });
    } catch (err) {
      setErrors({ form: readAuthErrorMessage(err) });
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    submitLogin().catch(() => {
      // Errors are handled in submitLogin.
    });
  }

  return (
    <div
      style={{
        minHeight: "100svh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        background:
          "radial-gradient(circle at 50% 20%, #f8f9fb 0%, #f1f2f5 55%, #edeef2 100%)",
      }}
    >
      <main
        aria-labelledby="login-title"
        style={{
          width: "min(100%, 372px)",
          borderRadius: 28,
          border: "1px solid #e8e9ef",
          boxShadow: "0 18px 50px rgba(17, 24, 39, 0.09)",
          background: "var(--ui-color-surface)",
          padding: "28px 22px 26px",
        }}
      >
        <header
          style={{
            display: "grid",
            justifyItems: "center",
            gap: 12,
            marginBottom: 22,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ececf0",
              background: "#fbfbfd",
              color: "#23252f",
            }}
          >
            <Icon name="square" size={18} />
          </span>
          <h1
            id="login-title"
            style={{
              margin: 0,
              fontFamily: "var(--ui-font-heading)",
              fontWeight: 700,
              color: "#22242d",
              fontSize: 46,
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            Добро пожаловать!
          </h1>
          <p
            style={{
              margin: 0,
              color: "#b4b6bf",
              fontFamily: "var(--ui-font-body)",
              fontSize: 21,
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            Пожалуйста, авторизируйтесь
          </p>
        </header>

        <form noValidate onSubmit={onSubmit}>
          <div style={{ display: "grid", gap: 16 }}>
            <TextField
              autoComplete="username"
              error={errors.username}
              errorId={usernameErrorId}
              icon={<User size={16} strokeWidth={2.1} />}
              id="username"
              label="Логин"
              onChange={setUsername}
              trailing={
                username.trim() ? (
                  <button
                    aria-label="Очистить логин"
                    onClick={() => setUsername("")}
                    style={fieldActionStyle}
                    type="button"
                  >
                    <X size={14} strokeWidth={2.2} />
                  </button>
                ) : null
              }
              value={username}
            />
            <TextField
              autoComplete="current-password"
              error={errors.password}
              errorId={passwordErrorId}
              icon={<Lock size={16} strokeWidth={2.1} />}
              id="password"
              label="Пароль"
              onChange={setPassword}
              trailing={
                <button
                  aria-label={
                    showPassword ? "Скрыть пароль" : "Показать пароль"
                  }
                  onClick={() => setShowPassword((value) => !value)}
                  style={fieldActionStyle}
                  type="button"
                >
                  {showPassword ? (
                    <Eye size={15} strokeWidth={2.1} />
                  ) : (
                    <EyeOff size={15} strokeWidth={2.1} />
                  )}
                </button>
              }
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                fontFamily: "var(--ui-font-body)",
                fontSize: 14,
                color: "#adb0ba",
              }}
            >
              <input
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.currentTarget.checked)}
                style={{ width: 16, height: 16, margin: 0 }}
                type="checkbox"
              />
              Запомнить данные
            </label>
            {errors.form ? (
              <p
                id={formErrorId}
                role="alert"
                style={{
                  margin: 0,
                  fontFamily: "var(--ui-font-body)",
                  fontSize: 13,
                  color: "#dc2626",
                }}
              >
                {errors.form}
              </p>
            ) : null}
            <button
              aria-busy={submitting || undefined}
              aria-describedby={errors.form ? formErrorId : undefined}
              disabled={submitting}
              style={{
                height: 52,
                border: "1px solid #5965ff",
                borderRadius: 10,
                color: "#f4f8ff",
                fontFamily: "var(--ui-font-heading)",
                fontWeight: 700,
                fontSize: 26,
                lineHeight: 1,
                background:
                  "linear-gradient(180deg, #4451ff 0%, #2e3bdc 50%, #2330cb 100%)",
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.75 : 1,
              }}
              type="submit"
            >
              {submitting ? "Вход..." : "Войти"}
            </button>
          </div>
        </form>

        <div
          aria-hidden
          style={{
            marginTop: 18,
            marginBottom: 14,
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 12,
            color: "#cacbd2",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "var(--ui-font-body)",
          }}
        >
          <span style={{ height: 1, background: "#e8e9ee" }} />
          <span>ИЛИ</span>
          <span style={{ height: 1, background: "#e8e9ee" }} />
        </div>

        <p
          style={{
            margin: 0,
            textAlign: "center",
            fontFamily: "var(--ui-font-body)",
            fontSize: 15,
            color: "#868995",
          }}
        >
          Нет аккаунта?{" "}
          <a
            href="/register"
            style={{
              color: "#3a46ea",
              fontWeight: 700,
              textDecoration: "underline",
              fontFamily: "var(--ui-font-body)",
              fontSize: 15,
            }}
          >
            Создать
          </a>
        </p>
      </main>
    </div>
  );
}

const fieldActionStyle: CSSProperties = {
  border: "none",
  background: "transparent",
  color: "#b5b7c0",
  width: 28,
  height: 28,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  cursor: "pointer",
};

function TextField(props: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: ReactNode;
  trailing?: ReactNode;
  error?: string;
  errorId: string;
  type?: "text" | "password";
  autoComplete?: string;
}) {
  const error = props.error;

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label
        htmlFor={props.id}
        style={{
          fontFamily: "var(--ui-font-heading)",
          fontSize: 28,
          fontWeight: 700,
          color: "#2d2f39",
          lineHeight: 1,
        }}
      >
        {props.label}
      </label>
      <div
        style={{
          height: 50,
          borderRadius: 10,
          border: error ? "1px solid #dc2626" : "1px solid #e2e4ea",
          display: "grid",
          gridTemplateColumns: "24px minmax(0, 1fr) 28px",
          alignItems: "center",
          gap: 8,
          padding: "0 10px",
          color: "#b4b6bf",
        }}
      >
        <span aria-hidden>{props.icon}</span>
        <input
          aria-describedby={error ? props.errorId : undefined}
          aria-invalid={Boolean(error)}
          autoComplete={props.autoComplete}
          id={props.id}
          onChange={(event) => props.onChange(event.currentTarget.value)}
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            fontFamily: "var(--ui-font-ui)",
            fontSize: 25,
            fontWeight: 500,
            lineHeight: 1,
            color: "#2f3139",
            background: "transparent",
          }}
          type={props.type ?? "text"}
          value={props.value}
        />
        {props.trailing ?? <span aria-hidden />}
      </div>
      {error ? (
        <p
          id={props.errorId}
          role="alert"
          style={{
            margin: 0,
            color: "#dc2626",
            fontFamily: "var(--ui-font-body)",
            fontSize: 12,
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
