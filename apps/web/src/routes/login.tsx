import {
  Button,
  Card,
  Checkbox,
  Divider,
  Input,
  Link,
  Logo,
  Spinner,
  Text,
} from "@dummy-products/ui-kit";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, User, X } from "lucide-react";
import {
  type CSSProperties,
  type FormEvent,
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
        data-testid="login-page"
        style={{ width: "100%", maxWidth: 420 }}
      >
        <Card
          elevated
          outlined
          style={{
            width: "100%",
            padding: "var(--ui-space-xxl)",
            borderRadius: "var(--ui-radius-lg)",
          }}
        >
          <header
            style={{
              display: "grid",
              justifyItems: "center",
              gap: "var(--ui-space-md)",
              marginBottom: "var(--ui-space-lg)",
            }}
          >
            <Logo decorative />
            <Text
              as="h1"
              className="inner-shadow-top"
              id="login-title"
              style={{ textAlign: "center" }}
              variant="heading"
            >
              Добро пожаловать!
            </Text>
            <Text
              className="inner-shadow"
              style={{ textAlign: "center" }}
              variant="muted"
            >
              Пожалуйста, авторизируйтесь
            </Text>
          </header>

          <form data-testid="login-form" noValidate onSubmit={onSubmit}>
            <div style={{ display: "grid", gap: "var(--ui-space-md)" }}>
              <Input
                autoComplete="username"
                endAdornment={
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
                error={errors.username}
                errorId={usernameErrorId}
                id="username"
                label="Логин"
                onValueChange={({ value }) => setUsername(value)}
                startAdornment={<User size={16} strokeWidth={2.1} />}
                type="text"
                value={username}
              />

              <Input
                autoComplete="current-password"
                endAdornment={
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
                error={errors.password}
                errorId={passwordErrorId}
                id="password"
                label="Пароль"
                onValueChange={({ value }) => setPassword(value)}
                startAdornment={<Lock size={16} strokeWidth={2.1} />}
                type={showPassword ? "text" : "password"}
                value={password}
              />

              <Checkbox
                checked={rememberMe}
                onCheckedChange={({ checked }) => setRememberMe(checked)}
              >
                Запомнить данные
              </Checkbox>

              {errors.form ? (
                <p
                  data-testid="login-error"
                  id={formErrorId}
                  role="alert"
                  style={{
                    margin: 0,
                    fontFamily: "var(--ui-font-body)",
                    fontSize: 13,
                    color: "var(--ui-color-danger)",
                  }}
                >
                  {errors.form}
                </p>
              ) : null}

              <Button
                ariaDescribedBy={errors.form ? formErrorId : undefined}
                buttonType="submit"
                disabled={submitting}
                fullWidth
                id="login-submit"
                loading={submitting}
                size="lg"
                text={submitting ? "Вход..." : "Войти"}
                variant="blue"
              >
                {submitting ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "var(--ui-space-sm)",
                    }}
                  >
                    <Spinner label="" size="sm" tone="inverse" />
                    <span>Вход...</span>
                  </span>
                ) : (
                  "Войти"
                )}
              </Button>
            </div>
          </form>

          <Divider
            style={{
              marginTop: "var(--ui-space-lg)",
              marginBottom: "var(--ui-space-md)",
            }}
            text="ИЛИ"
          />

          <Text as="p" style={{ textAlign: "center" }} variant="muted">
            Нет аккаунта? <Link href="/register">Создать</Link>
          </Text>
        </Card>
      </main>
    </div>
  );
}

const fieldActionStyle: CSSProperties = {
  border: "none",
  background: "transparent",
  color: "var(--ui-color-text-muted)",
  width: 28,
  height: 28,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  cursor: "pointer",
};
