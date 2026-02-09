import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useMemo, useState } from "react";
import { Button, Checkbox } from "@dummy-products/ui-kit";

import { login } from "@/api/dummyjson";
import { ApiError } from "@/api/http";
import { loadLastUsedUsername, saveAuthSession } from "@/auth/session";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

type FieldErrors = Partial<Record<"username" | "password" | "form", string>>;

function LoginPage() {
  const navigate = useNavigate();
  const defaultUsername = useMemo(() => loadLastUsedUsername() ?? "", []);

  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  async function submitLogin() {
    if (submitting) return;
    const nextErrors: FieldErrors = {};
    if (!username.trim()) nextErrors.username = "Username is required";
    if (!password.trim()) nextErrors.password = "Password is required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setErrors({});

    try {
      const res = await login({ username: username.trim(), password });
      saveAuthSession({
        token: res.token,
        username: res.username ?? username.trim(),
        rememberMe,
      });
      await navigate({ to: "/products" });
    } catch (err) {
      let message = "Login failed";
      if (err instanceof ApiError) message = err.message;
      setErrors({ form: message });
    } finally {
      setSubmitting(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void submitLogin();
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-12">
      <div
        style={{
          border: "1px solid var(--ui-color-gray-200)",
          borderRadius: "var(--ui-radius-md)",
          background: "var(--ui-color-white)",
          padding: "var(--ui-space-xxl)",
        }}
      >
        <div style={{ display: "grid", gap: "var(--ui-space-sm)" }}>
          <h1
            style={{
              fontFamily: "var(--ui-font-heading)",
              color: "var(--ui-color-text-primary)",
              fontWeight: 700,
              fontSize: 24,
              margin: 0,
            }}
          >
            Sign in
          </h1>
          <p
            style={{
              fontFamily: "var(--ui-font-body)",
              color: "var(--ui-color-text-placeholder)",
              fontSize: 14,
              margin: 0,
            }}
          >
            Use your DummyJSON credentials to continue.
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div
            style={{
              display: "grid",
              gap: "var(--ui-space-lg)",
              marginTop: "var(--ui-space-xxl)",
            }}
          >
            <Field
              autoComplete="username"
              error={errors.username}
              id="username"
              label="Username"
              onChange={setUsername}
              value={username}
            />
            <Field
              autoComplete="current-password"
              error={errors.password || errors.form}
              id="password"
              label="Password"
              onChange={setPassword}
              type="password"
              value={password}
            />
            <Checkbox
              checked={rememberMe}
              label="Remember me"
              onCheckedChange={({ checked }) => setRememberMe(checked)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "var(--ui-space-xxl)",
            }}
          >
            <Button
              disabled={submitting}
              loading={submitting}
              onPress={() => void submitLogin()}
              text={submitting ? "Signing in..." : "Sign in"}
              variant="blue"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

function Field(props: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: "text" | "password";
  autoComplete?: string;
}) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label
        htmlFor={props.id}
        style={{
          color: "var(--ui-color-text-primary)",
          fontFamily: "var(--ui-font-heading)",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {props.label}
      </label>
      <input
        aria-invalid={Boolean(props.error)}
        autoComplete={props.autoComplete}
        id={props.id}
        onChange={(e) => props.onChange(e.target.value)}
        style={{
          border: "1px solid var(--ui-color-gray-200)",
          borderRadius: "var(--ui-radius-sm)",
          height: 44,
          padding: "0 var(--ui-space-md)",
          fontFamily: "var(--ui-font-ui)",
          fontSize: 14,
          color: "var(--ui-color-text-primary)",
          outline: "none",
        }}
        type={props.type ?? "text"}
        value={props.value}
      />
      {props.error ? (
        <div
          style={{
            color: "#dc2626",
            fontFamily: "var(--ui-font-body)",
            fontSize: 12,
          }}
        >
          {props.error}
        </div>
      ) : null}
    </div>
  );
}
