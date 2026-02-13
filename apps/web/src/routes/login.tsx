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
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, User, X } from "lucide-react";
import { type FormEvent, useId, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { login } from "@/api/DummyJson";
import { ApiError } from "@/api/Http";
import {
  loadAuthSession,
  loadLastUsedUsername,
  saveAuthSession,
} from "@/auth/Session";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const session = loadAuthSession();
    if (session) {
      throw redirect({ to: "/products" });
    }
  },
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
    <div className="login-shell">
      <main
        aria-labelledby="login-title"
        className="login-main"
        data-testid="login-page"
      >
        <Card elevated outlined style={{ width: "100%" }}>
          <header className="login-card-header">
            <Logo decorative />
            <Text
              as="h1"
              id="login-title"
              style={{
                textAlign: "center",
                fontFamily: "var(--ui-font-ui)",
                fontSize: 40,
                lineHeight: "44px",
                letterSpacing: "-0.6px",
              }}
              variant="heading"
              weight="semibold"
            >
              Добро пожаловать!
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "var(--ui-font-ui)",
                fontSize: 18,
                lineHeight: "27px",
                color: "var(--ui-color-text-faint)",
              }}
              variant="muted"
              weight="medium"
            >
              Пожалуйста, авторизируйтесь
            </Text>
          </header>

          <form data-testid="login-form" noValidate onSubmit={onSubmit}>
            <div className="login-form-fields">
              <Input
                autoComplete="username"
                endAdornment={
                  username.trim() ? (
                    <button
                      aria-label="Очистить логин"
                      className="login-field-action"
                      onClick={() => {
                        setUsername("");
                        setErrors((prev) => ({
                          ...prev,
                          username: undefined,
                          form: undefined,
                        }));
                      }}
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
                onValueChange={({ value }) => {
                  setUsername(value);
                  setErrors((prev) => ({
                    ...prev,
                    username: undefined,
                    form: undefined,
                  }));
                }}
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
                    className="login-field-action"
                    onClick={() => setShowPassword((value) => !value)}
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
                onValueChange={({ value }) => {
                  setPassword(value);
                  setErrors((prev) => ({
                    ...prev,
                    password: undefined,
                    form: undefined,
                  }));
                }}
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
                  className="login-form-error"
                  data-testid="login-error"
                  id={formErrorId}
                  role="alert"
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
            text="или"
            tone="muted"
          />

          <Text
            as="p"
            style={{
              marginTop: "var(--ui-space-md)",
              textAlign: "center",
              fontFamily: "var(--ui-font-ui)",
              fontSize: 18,
              lineHeight: "27px",
              color: "var(--ui-color-text-subtle)",
            }}
            variant="muted"
            weight="regular"
          >
            Нет аккаунта?{" "}
            <Link
              href="/register"
              onClick={(event) => {
                event.preventDefault();
                toast.message("Регистрация пока недоступна");
              }}
            >
              Создать
            </Link>
          </Text>
        </Card>
      </main>
    </div>
  );
}
