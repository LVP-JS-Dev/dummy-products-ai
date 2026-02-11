import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const navigateMock = vi.fn(() => Promise.resolve());
const fetchProductsPageMock = vi.fn();
const searchProductsPageMock = vi.fn();
const loadSortMock = vi.fn();
const saveSortMock = vi.fn();
const clearSortMock = vi.fn();
const clearAuthSessionMock = vi.fn();
const useSearchMock = vi.fn(() => ({}));

vi.mock("@dummy-products/ui-kit", () => ({
  Button: ({ onPress, text }: { onPress?: () => void; text: string }) => (
    <button onClick={onPress} type="button">
      {text}
    </button>
  ),
  Pagination: () => <div>pagination</div>,
  SearchInput: ({
    onSubmit,
    onValueChange,
    placeholder,
    state,
    value,
  }: {
    onSubmit?: (input: { value: string }) => void;
    onValueChange?: (input: { value: string }) => void;
    placeholder?: string;
    state?: "active" | "inactive" | "disabled";
    value?: string;
  }) => (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.({ value: value ?? "" });
      }}
    >
      <input
        aria-label="Поиск товаров"
        disabled={state === "disabled"}
        onChange={(event) => onValueChange?.({ value: event.target.value })}
        placeholder={placeholder}
        value={value}
      />
      <button type="submit">submit-search</button>
    </form>
  ),
}));

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => () => ({
    useSearch: () => useSearchMock(),
  }),
  redirect: vi.fn(),
  useNavigate: () => navigateMock,
}));

vi.mock("@/api/DummyJson", () => ({
  fetchProductsPage: (input: unknown) => fetchProductsPageMock(input),
  searchProductsPage: (input: unknown) => searchProductsPageMock(input),
}));

vi.mock("@/auth/Session", () => ({
  clearAuthSession: () => clearAuthSessionMock(),
  loadAuthSession: () => ({ token: "token", username: "user" }),
}));

vi.mock("@/auth/SortStorage", () => ({
  clearSort: () => clearSortMock(),
  loadSort: () => loadSortMock(),
  saveSort: (input: unknown) => saveSortMock(input),
}));

import { ProductsPage } from "../routes/products";

describe("ProductsPage header search", () => {
  beforeEach(() => {
    navigateMock.mockClear();
    fetchProductsPageMock.mockReset();
    searchProductsPageMock.mockReset();
    loadSortMock.mockReset();
    saveSortMock.mockReset();
    clearSortMock.mockReset();
    clearAuthSessionMock.mockReset();
    useSearchMock.mockReset();

    useSearchMock.mockReturnValue({});
    loadSortMock.mockReturnValue(null);
    fetchProductsPageMock.mockResolvedValue({
      products: [],
      total: 0,
      skip: 0,
      limit: 10,
    });
    searchProductsPageMock.mockResolvedValue({
      products: [],
      total: 0,
      skip: 0,
      limit: 10,
    });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("renders dedicated products header with primary search input", async () => {
    render(<ProductsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Товары" })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Найти")).toBeInTheDocument();
    expect(
      screen.getByText("Найдите товар по названию, вендору или артикулу.")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchProductsPageMock).toHaveBeenCalled();
    });
  });

  it("syncs header search input to URL after debounce", () => {
    vi.useFakeTimers();
    render(<ProductsPage />);

    navigateMock.mockClear();

    fireEvent.change(screen.getByPlaceholderText("Найти"), {
      target: { value: "iphone" },
    });

    expect(navigateMock).not.toHaveBeenCalledWith(
      expect.objectContaining({ search: { q: "iphone" } })
    );

    act(() => {
      vi.advanceTimersByTime(399);
    });

    expect(navigateMock).not.toHaveBeenCalledWith(
      expect.objectContaining({ search: { q: "iphone" } })
    );

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(navigateMock).toHaveBeenCalledWith({
      to: "/products",
      search: { q: "iphone" },
      replace: true,
    });

    expect(searchProductsPageMock).toHaveBeenCalledTimes(0);
  });

  it("calls search API (not list API) when URL query is non-empty", async () => {
    useSearchMock.mockReturnValue({ q: "iphone" });
    render(<ProductsPage />);

    await waitFor(() => {
      expect(searchProductsPageMock).toHaveBeenCalledWith({
        q: "iphone",
        limit: 10,
        skip: 0,
      });
    });
    expect(fetchProductsPageMock).toHaveBeenCalledTimes(0);
  });

  it("shows error state on failed search and retries successfully", async () => {
    useSearchMock.mockReturnValue({ q: "iphone" });

    searchProductsPageMock.mockReset();
    searchProductsPageMock
      .mockRejectedValueOnce(new Error("boom"))
      .mockResolvedValueOnce({
        products: [],
        total: 0,
        skip: 0,
        limit: 10,
      });

    render(<ProductsPage />);

    expect(await screen.findByText("Ошибка загрузки")).toBeInTheDocument();
    expect(screen.getByText("boom")).toBeInTheDocument();
    expect(searchProductsPageMock).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Повторить" }));

    await waitFor(() => {
      expect(searchProductsPageMock).toHaveBeenCalledTimes(2);
    });
    await waitFor(() => {
      expect(screen.queryByText("Ошибка загрузки")).not.toBeInTheDocument();
    });
  });
});
