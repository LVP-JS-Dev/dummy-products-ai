import { Button, PageNumber, SearchInput } from "@dummy-products/ui-kit";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
  type FormEvent,
  type HTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

import { fetchProductsPage, searchProductsPage } from "@/api/dummyjson";
import { ApiError } from "@/api/http";
import { clearAuthSession, loadAuthSession } from "@/auth/session";
import { clearSort, loadSort, saveSort } from "@/auth/sortStorage";
import type { ProductPage, ProductRow } from "@/domain/products";
import { mapProductToRow } from "@/domain/products";
import type { SortDescriptor, SortField } from "@/domain/sort";
import { sortRows } from "@/domain/sort";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

type ProductsSearch = {
  q?: string;
};

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): ProductsSearch => {
    const q = typeof search.q === "string" ? search.q : undefined;
    return { q: q?.trim() ? q : undefined };
  },
  beforeLoad: () => {
    const session = loadAuthSession();
    if (!session) throw redirect({ to: "/login" });
  },
  component: ProductsPage,
});

const PAGE_LIMIT = 10;

function ProductsPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();

  const [inputQuery, setInputQuery] = useState(search.q ?? "");
  const debouncedQuery = useDebouncedValue(inputQuery, 400);

  const [page, setPage] = useState(1);
  const [data, setData] = useState<ProductPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  const [sort, setSort] = useState<SortDescriptor>(
    () => loadSort() ?? { field: "name", direction: "asc" }
  );

  useEffect(() => {
    const q = debouncedQuery.trim();
    void navigate({
      to: "/products",
      search: q ? { q } : {},
      replace: true,
    });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    setInputQuery(search.q ?? "");
  }, [search.q]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const skip = (page - 1) * PAGE_LIMIT;
        const q = (search.q ?? "").trim();

        const pageData = q
          ? await searchProductsPage({ q, limit: PAGE_LIMIT, skip })
          : await fetchProductsPage({ limit: PAGE_LIMIT, skip });

        if (cancelled) return;
        setData(pageData);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 401) {
          forceLogout();
          return;
        }
        const message =
          err instanceof Error ? err.message : "Failed to load products";
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search.q, retryToken]);

  const rows: ProductRow[] = useMemo(() => {
    const base = (data?.products ?? []).map(mapProductToRow);
    return sortRows(base, sort);
  }, [data, sort]);

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;
  const canPrev = page > 1;
  const canNext = page < totalPages;

  function toggleSort(field: SortField) {
    setSort((prev) => {
      const next: SortDescriptor =
        prev.field === field
          ? { field, direction: prev.direction === "asc" ? "desc" : "asc" }
          : { field, direction: "asc" };
      saveSort(next);
      return next;
    });
  }

  function forceLogout() {
    clearAuthSession();
    clearSort();
    toast.error("Сессия истекла, войдите снова");
    void navigate({ to: "/login", replace: true });
  }

  function onLogout() {
    clearAuthSession();
    clearSort();
    void navigate({ to: "/login" });
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="grid gap-1">
          <div
            style={{
              fontFamily: "var(--ui-font-heading)",
              color: "var(--ui-color-text-primary)",
              fontWeight: 700,
              fontSize: 32,
              lineHeight: 1.2,
            }}
          >
            Товары
          </div>
          <div
            style={{
              color: "var(--ui-color-text-placeholder)",
              fontFamily: "var(--ui-font-body)",
              fontSize: 14,
            }}
          >
            Сортировка применяется только к текущей странице.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AddProductButton />
          <Button onPress={onLogout} text="Выйти" variant="blue" />
        </div>
      </div>

      <div className="mb-4 grid gap-2">
        <div
          style={{
            color: "var(--ui-color-text-primary)",
            fontFamily: "var(--ui-font-heading)",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          Поиск
        </div>
        <SearchInput
          onSubmit={({ value }) => setInputQuery(value)}
          onValueChange={({ value }) => setInputQuery(value)}
          placeholder="Введите запрос"
          showIcon
          state={
            loading ? "disabled" : inputQuery.trim() ? "active" : "inactive"
          }
          value={inputQuery}
        />
      </div>

      <div
        className="mb-2 h-1 overflow-hidden"
        style={{ background: "var(--ui-color-gray-200)" }}
      >
        {loading ? (
          <div
            className="h-full w-2/5 animate-[indeterminate_1.2s_ease-in-out_infinite]"
            style={{ background: "var(--ui-color-blue-primary)" }}
          />
        ) : (
          <div
            className="h-full w-0"
            style={{ background: "var(--ui-color-blue-primary)" }}
          />
        )}
      </div>

      {error ? (
        <div
          style={{
            border: "1px solid var(--ui-color-gray-200)",
            borderRadius: "var(--ui-radius-md)",
            padding: "var(--ui-space-lg)",
            background: "var(--ui-color-white)",
          }}
        >
          <div
            style={{
              color: "var(--ui-color-text-primary)",
              fontFamily: "var(--ui-font-heading)",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            Ошибка загрузки
          </div>
          <div
            style={{
              marginTop: 6,
              color: "var(--ui-color-text-placeholder)",
              fontFamily: "var(--ui-font-body)",
              fontSize: 14,
            }}
          >
            {error}
          </div>
          <div className="mt-3 flex gap-2">
            <Button
              onPress={() => setRetryToken((v) => v + 1)}
              text="Повторить"
              variant="blue"
            />
            <Button onPress={forceLogout} text="Выйти" variant="blue" />
          </div>
        </div>
      ) : (
        <div
          className="overflow-hidden"
          style={{
            border: "1px solid var(--ui-color-gray-200)",
            borderRadius: "var(--ui-radius-md)",
            background: "var(--ui-color-white)",
          }}
        >
          <table className="w-full border-collapse text-left text-xs">
            <thead style={{ background: "#f9fafb" }}>
              <tr className="[&>th]:px-3 [&>th]:py-2">
                <SortableTh
                  active={sort.field === "name"}
                  direction={sort.direction}
                  label="Название"
                  onClick={() => toggleSort("name")}
                />
                <th>Вендор</th>
                <th>Артикул</th>
                <SortableTh
                  active={sort.field === "price"}
                  align="right"
                  direction={sort.direction}
                  label="Цена"
                  onClick={() => toggleSort("price")}
                />
                <SortableTh
                  active={sort.field === "rating"}
                  align="right"
                  direction={sort.direction}
                  label="Рейтинг"
                  onClick={() => toggleSort("rating")}
                />
              </tr>
            </thead>
            <tbody className="[&>tr>td]:px-3 [&>tr>td]:py-2">
              {rows.length === 0 && !loading ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      textAlign: "center",
                      padding: "32px 0",
                      fontFamily: "var(--ui-font-body)",
                      color: "var(--ui-color-text-placeholder)",
                      fontSize: 14,
                    }}
                  >
                    Нет данных
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr
                    className="border-t"
                    key={r.id}
                    style={{ borderColor: "var(--ui-color-gray-200)" }}
                  >
                    <td className="font-medium">{r.name}</td>
                    <td>{r.vendor}</td>
                    <td>{r.article}</td>
                    <td className="text-right tabular-nums">{r.price}</td>
                    <td
                      className="text-right tabular-nums"
                      style={{ color: r.rating < 3 ? "#dc2626" : "inherit" }}
                    >
                      {r.rating}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <div
          style={{
            fontFamily: "var(--ui-font-body)",
            color: "var(--ui-color-text-placeholder)",
            fontSize: 14,
          }}
        >
          {data ? `Страница ${page} из ${totalPages}` : "Загрузка..."}
        </div>
        <div className="flex items-center gap-2">
          <PageNumber
            disabled={!canPrev || loading}
            onPress={() => setPage((p) => Math.max(1, p - 1))}
            selected={false}
            value="‹"
          />
          <PageNumber
            onPress={({ value }) => {
              if (typeof value === "number") setPage(value);
            }}
            selected
            value={page}
          />
          <PageNumber
            disabled={!canNext || loading}
            onPress={() => setPage((p) => p + 1)}
            selected={false}
            value="›"
          />
        </div>
      </div>
    </div>
  );
}

function SortableTh(props: {
  label: string;
  active: boolean;
  direction: SortDescriptor["direction"];
  onClick: () => void;
  align?: "left" | "right";
}) {
  const arrow = props.active ? (props.direction === "asc" ? "↑" : "↓") : "";
  return (
    <th className={props.align === "right" ? "text-right" : ""}>
      <button
        onClick={props.onClick}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontFamily: "var(--ui-font-heading)",
          color: "var(--ui-color-text-primary)",
          fontWeight: 600,
        }}
        type="button"
      >
        <span>{props.label}</span>
        <span style={{ color: "var(--ui-color-text-placeholder)" }}>
          {arrow}
        </span>
      </button>
    </th>
  );
}

function AddProductButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        iconName="plus_circle"
        onPress={() => setOpen(true)}
        showIcon
        text="Добавить"
        variant="blue"
      />
      {open ? <AddProductModal onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function AddProductModal(props: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [vendor, setVendor] = useState("");
  const [article, setArticle] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function saveProduct() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Обязательное поле";
    if (!price.trim()) next.price = "Обязательное поле";
    if (!vendor.trim()) next.vendor = "Обязательное поле";
    if (!article.trim()) next.article = "Обязательное поле";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    toast.success("Товар добавлен");
    props.onClose();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    saveProduct();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4">
      <div
        style={{
          width: "100%",
          maxWidth: 680,
          background: "var(--ui-color-white)",
          borderRadius: "var(--ui-radius-lg)",
          border: "1px solid var(--ui-color-gray-200)",
          padding: "var(--ui-space-xxl)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--ui-font-heading)",
            color: "var(--ui-color-text-primary)",
            fontWeight: 700,
            fontSize: 24,
            marginBottom: "var(--ui-space-lg)",
          }}
        >
          Добавить товар
        </div>
        <form onSubmit={onSubmit}>
          <div style={{ display: "grid", gap: "var(--ui-space-md)" }}>
            <Field
              error={errors.name}
              label="Наименование"
              onChange={setName}
              value={name}
            />
            <Field
              error={errors.price}
              inputMode="decimal"
              label="Цена"
              onChange={setPrice}
              value={price}
            />
            <Field
              error={errors.vendor}
              label="Вендор"
              onChange={setVendor}
              value={vendor}
            />
            <Field
              error={errors.article}
              label="Артикул"
              onChange={setArticle}
              value={article}
            />
          </div>
          <div
            style={{
              marginTop: "var(--ui-space-lg)",
              display: "flex",
              justifyContent: "flex-end",
              gap: "var(--ui-space-sm)",
            }}
          >
            <Button onPress={props.onClose} text="Отмена" variant="blue" />
            <Button onPress={saveProduct} text="Сохранить" variant="blue" />
          </div>
        </form>
      </div>
    </div>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label
        style={{
          color: "var(--ui-color-text-primary)",
          fontFamily: "var(--ui-font-heading)",
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        {props.label}
      </label>
      <input
        aria-invalid={Boolean(props.error)}
        inputMode={props.inputMode}
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
