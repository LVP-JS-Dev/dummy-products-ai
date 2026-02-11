import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  Input,
  Pagination,
  SearchInput,
  Spinner,
  toast,
} from "@dummy-products/ui-kit";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type Header,
  useReactTable,
} from "@tanstack/react-table";
import {
  type FormEvent,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { fetchProductsPage, searchProductsPage } from "@/api/DummyJson";
import { ApiError } from "@/api/Http";
import { clearAuthSession, loadAuthSession } from "@/auth/Session";
import { clearSort, loadSort, saveSort } from "@/auth/SortStorage";
import type { ProductPage, ProductRow } from "@/domain/Products";
import { mapProductToRow } from "@/domain/Products";
import {
  type ProductsColumnMeta,
  productsTableColumns,
} from "@/domain/ProductsTableColumns";
import type { SortDescriptor } from "@/domain/Sort";
import {
  applySortingUpdate,
  sortDescriptorToSortingState,
} from "@/domain/SortTanstack";
import { useDebouncedValue } from "@/hooks/UseDebouncedValue";

interface ProductsSearch {
  q?: string;
}

function runAsync(promise: Promise<unknown>, context: string): void {
  promise.catch((error: unknown) => {
    console.error(`[runAsync] ${context}`, error);
  });
}

function getSearchInputState(loading: boolean, query: string) {
  if (loading) {
    return "disabled" as const;
  }
  return query.trim() ? ("active" as const) : ("inactive" as const);
}

function getSortDirection(
  sorted: false | "asc" | "desc"
): "asc" | "desc" | undefined {
  if (sorted === false) {
    return undefined;
  }
  if (sorted === "desc") {
    return "desc";
  }
  return "asc";
}

function getHeaderLabel(
  header: Header<ProductRow, unknown>,
  meta?: ProductsColumnMeta
): string {
  if (meta?.label) {
    return meta.label;
  }
  if (typeof header.column.columnDef.header === "string") {
    return header.column.columnDef.header;
  }
  return header.column.id;
}

function renderProductsHeaderCell(
  header: Header<ProductRow, unknown>
): ReactNode {
  const meta = header.column.columnDef.meta as ProductsColumnMeta | undefined;
  if (header.isPlaceholder) {
    return <th key={header.id} />;
  }

  const direction = getSortDirection(header.column.getIsSorted());
  return (
    <SortableTh
      align={meta?.align}
      direction={direction}
      key={header.id}
      label={getHeaderLabel(header, meta)}
      onClick={
        header.column.getCanSort()
          ? () => header.column.toggleSorting(direction === "asc")
          : undefined
      }
      renderHeader={() =>
        flexRender(header.column.columnDef.header, header.getContext())
      }
    />
  );
}

function fetchPageData(query: string, page: number): Promise<ProductPage> {
  const skip = (page - 1) * PAGE_LIMIT;
  const normalizedQuery = query.trim();
  if (normalizedQuery) {
    return searchProductsPage({ q: normalizedQuery, limit: PAGE_LIMIT, skip });
  }
  return fetchProductsPage({ limit: PAGE_LIMIT, skip });
}

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): ProductsSearch => {
    const q = typeof search.q === "string" ? search.q : undefined;
    return { q: q?.trim() ? q : undefined };
  },
  beforeLoad: () => {
    const session = loadAuthSession();
    if (!session) {
      throw redirect({ to: "/login" });
    }
  },
  component: ProductsPage,
});

const PAGE_LIMIT = 10;

export function ProductsPage() {
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

  const forceLogout = useCallback(() => {
    clearAuthSession();
    clearSort();
    toast.error("Сессия истекла, войдите снова");
    runAsync(navigate({ to: "/login", replace: true }), "forceLogout");
  }, [navigate]);

  const onLogout = useCallback(() => {
    clearAuthSession();
    clearSort();
    runAsync(navigate({ to: "/login" }), "onLogout");
  }, [navigate]);

  useEffect(() => {
    const q = debouncedQuery.trim();
    runAsync(
      navigate({
        to: "/products",
        search: q ? { q } : {},
        replace: true,
      }),
      "syncSearchQuery"
    );
    setPage(1);
  }, [debouncedQuery, navigate]);

  useEffect(() => {
    setInputQuery(search.q ?? "");
  }, [search.q]);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    const requestContext = `fetchProductsPage:retry-${retryToken}`;

    runAsync(
      fetchPageData(search.q ?? "", page)
        .then((pageData) => {
          if (cancelled) {
            return;
          }
          setData(pageData);
        })
        .catch((err: unknown) => {
          if (cancelled) {
            return;
          }
          if (err instanceof ApiError && err.status === 401) {
            forceLogout();
            return;
          }
          const message =
            err instanceof Error ? err.message : "Failed to load products";
          setError(message);
        })
        .finally(() => {
          if (!cancelled) {
            setLoading(false);
          }
        }),
      requestContext
    );

    return () => {
      cancelled = true;
    };
  }, [forceLogout, page, retryToken, search.q]);

  const baseRows = useMemo(
    () => (data?.products ?? []).map(mapProductToRow),
    [data]
  );

  const table = useReactTable({
    data: baseRows,
    columns: productsTableColumns,
    state: { sorting: sortDescriptorToSortingState(sort) },
    onSortingChange: (updater) => {
      setSort((prev) => {
        const next = applySortingUpdate(
          updater,
          sortDescriptorToSortingState(prev),
          prev
        );
        saveSort(next);
        return next;
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: false,
    enableSortingRemoval: false,
  });

  const rows = table.getRowModel().rows;

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;
  const searchState = getSearchInputState(loading, inputQuery);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="grid gap-1">
          <div
            style={{
              fontFamily: "var(--ui-font-heading)",
              color: "var(--ui-color-text)",
              fontWeight: 700,
              fontSize: 32,
              lineHeight: 1.2,
            }}
          >
            Товары
          </div>
          <div
            style={{
              color: "var(--ui-color-text-muted)",
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
            color: "var(--ui-color-text)",
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
          state={searchState}
          value={inputQuery}
        />
      </div>

      <div
        className="mb-2 h-1 overflow-hidden"
        style={{ background: "var(--ui-color-surface-muted)" }}
      >
        {loading ? (
          <div
            className="h-full w-2/5 animate-[indeterminate_1.2s_ease-in-out_infinite]"
            style={{ background: "var(--ui-color-primary)" }}
          />
        ) : (
          <div
            className="h-full w-0"
            style={{ background: "var(--ui-color-primary)" }}
          />
        )}
      </div>

      {error ? (
        <Card
          elevated
          style={{
            borderColor: "var(--ui-color-danger)",
          }}
        >
          <CardContent>
            <CardTitle>Ошибка загрузки</CardTitle>
            <CardDescription>{error}</CardDescription>
            <div className="mt-3 flex gap-2">
              <Button
                onPress={() => setRetryToken((v) => v + 1)}
                text="Повторить"
                variant="blue"
              />
              <Button onPress={forceLogout} text="Выйти" variant="secondary" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div
          className="overflow-hidden"
          data-testid="products-table-shell"
          style={{
            border: "1px solid var(--ui-color-border)",
            borderRadius: "var(--ui-radius-md)",
            background: "var(--ui-color-surface)",
          }}
        >
          <table className="w-full border-collapse text-left text-xs">
            <thead style={{ background: "var(--ui-color-surface-muted)" }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="[&>th]:px-3 [&>th]:py-2" key={headerGroup.id}>
                  {headerGroup.headers.map((header) =>
                    renderProductsHeaderCell(header)
                  )}
                </tr>
              ))}
            </thead>
            <tbody className="[&>tr>td]:px-3 [&>tr>td]:py-2">
              {rows.length === 0 && !loading ? (
                <tr>
                  <td
                    colSpan={productsTableColumns.length}
                    style={{
                      textAlign: "center",
                      padding: "32px 0",
                      fontFamily: "var(--ui-font-body)",
                      color: "var(--ui-color-text-muted)",
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
                    style={{ borderColor: "var(--ui-color-border)" }}
                  >
                    {r.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta as
                        | ProductsColumnMeta
                        | undefined;
                      const alignClass =
                        meta?.align === "right"
                          ? "tabular-nums text-right"
                          : "";
                      const isName = cell.column.id === "name";
                      const cellClassName = isName
                        ? `font-medium ${alignClass}`.trim()
                        : alignClass;
                      const isLowRating =
                        cell.column.id === "rating" && r.original.rating < 3;
                      return (
                        <td
                          className={cellClassName}
                          key={cell.id}
                          style={{ color: isLowRating ? "#dc2626" : "inherit" }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div
            className="flex items-center justify-between gap-3 border-t px-3 py-2"
            data-testid="products-table-footer"
            style={{ borderColor: "var(--ui-color-border)" }}
          >
            <div
              style={{
                fontFamily: "var(--ui-font-body)",
                color: "var(--ui-color-text-muted)",
                fontSize: 14,
              }}
            >
              {data ? `Страница ${page} из ${totalPages}` : "Загрузка..."}
            </div>
            <Pagination
              currentPage={page}
              disabled={loading}
              maxVisiblePages={5}
              nextAriaLabel="Следующая страница"
              onPageChange={({ page: nextPage }) => setPage(nextPage)}
              pageAriaLabelPrefix="Страница"
              prevAriaLabel="Предыдущая страница"
              totalPages={totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SortableTh(props: {
  label: string;
  direction?: "asc" | "desc";
  onClick?: () => void;
  align?: "left" | "right";
  renderHeader: () => ReactNode;
}) {
  let arrow = "";
  if (props.direction === "asc") {
    arrow = "↑";
  } else if (props.direction === "desc") {
    arrow = "↓";
  }
  const content = props.renderHeader();
  if (!props.onClick) {
    return (
      <th className={props.align === "right" ? "text-right" : ""}>
        {typeof content === "string" ? content : <span>{props.label}</span>}
      </th>
    );
  }

  return (
    <th className={props.align === "right" ? "text-right" : ""}>
      <button
        onClick={props.onClick}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontFamily: "var(--ui-font-heading)",
          color: "var(--ui-color-text)",
          fontWeight: 600,
        }}
        type="button"
      >
        {typeof content === "string" ? (
          <span>{content}</span>
        ) : (
          <span>{props.label}</span>
        )}
        <span style={{ color: "var(--ui-color-text-muted)" }}>{arrow}</span>
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

function AddProductModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const nameId = useId();
  const priceId = useId();
  const vendorId = useId();
  const articleId = useId();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [vendor, setVendor] = useState("");
  const [article, setArticle] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const previousActive =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");

    function getFocusableElements(): HTMLElement[] {
      const modal = modalRef.current;
      if (!modal) {
        return [];
      }
      return Array.from(
        modal.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter(
        (el) =>
          !el.hasAttribute("disabled") &&
          el.getAttribute("aria-hidden") !== "true"
      );
    }

    const focusable = getFocusableElements();
    if (focusable.length > 0) {
      focusable[0]?.focus();
    } else {
      modalRef.current?.focus();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") {
        return;
      }

      const currentFocusable = getFocusableElements();
      if (currentFocusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = currentFocusable[0];
      const last = currentFocusable.at(-1);
      if (!(first && last)) {
        return;
      }

      const active = document.activeElement;
      if (event.shiftKey) {
        if (active === first || !modalRef.current?.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last || !modalRef.current?.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousActive?.focus();
    };
  }, [onClose]);

  function saveProduct() {
    const next: Record<string, string> = {};
    if (!name.trim()) {
      next.name = "Обязательное поле";
    }
    if (price.trim()) {
      const parsedPrice = Number.parseFloat(price.replace(",", "."));
      if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
        next.price = "Должно быть положительным числом";
      }
    } else {
      next.price = "Обязательное поле";
    }
    if (!vendor.trim()) {
      next.vendor = "Обязательное поле";
    }
    if (!article.trim()) {
      next.article = "Обязательное поле";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      return;
    }

    toast.success("Товар добавлен");
    onClose();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    saveProduct();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4">
      <div
        aria-labelledby="add-product-title"
        aria-modal="true"
        ref={modalRef}
        role="dialog"
        style={{
          width: "100%",
          maxWidth: 680,
          background: "var(--ui-color-surface)",
          borderRadius: "var(--ui-radius-lg)",
          border: "1px solid var(--ui-color-border)",
          padding: "var(--ui-space-xxl)",
        }}
        tabIndex={-1}
      >
        <div
          style={{
            fontFamily: "var(--ui-font-heading)",
            color: "var(--ui-color-text)",
            fontWeight: 700,
            fontSize: 24,
            marginBottom: "var(--ui-space-lg)",
          }}
        >
          <span id="add-product-title">Добавить товар</span>
        </div>
        <form onSubmit={onSubmit}>
          <div style={{ display: "grid", gap: "var(--ui-space-md)" }}>
            <Field
              error={errors.name}
              id={nameId}
              label="Наименование"
              onChange={setName}
              value={name}
            />
            <Field
              error={errors.price}
              id={priceId}
              inputMode="decimal"
              label="Цена"
              onChange={setPrice}
              value={price}
            />
            <Field
              error={errors.vendor}
              id={vendorId}
              label="Вендор"
              onChange={setVendor}
              value={vendor}
            />
            <Field
              error={errors.article}
              id={articleId}
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
            <Button onPress={onClose} text="Отмена" variant="blue" />
            <Button onPress={saveProduct} text="Сохранить" variant="blue" />
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
  onChange: (v: string) => void;
  error?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <Input
      error={props.error}
      id={props.id}
      inputMode={props.inputMode}
      label={props.label}
      onValueChange={({ value }) => props.onChange(value)}
      type="text"
      value={props.value}
    />
  );
}
