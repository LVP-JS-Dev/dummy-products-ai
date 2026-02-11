import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { ProductPage } from "@/domain/Products";

const navigateMock = vi.fn();
const fetchProductsPageMock = vi.fn();
const searchProductsPageMock = vi.fn();
const loadSortMock = vi.fn();
const saveSortMock = vi.fn();
const clearSortMock = vi.fn();
const clearAuthSessionMock = vi.fn();
const routeSearch: { q?: string } = {};

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (config: unknown) => ({
    ...(typeof config === "object" && config ? config : {}),
    useSearch: () => routeSearch,
  }),
  redirect: vi.fn((input: unknown) => input),
  useNavigate: () => navigateMock,
}));

vi.mock("@/api/DummyJson", () => ({
  fetchProductsPage: (input: unknown) => fetchProductsPageMock(input),
  searchProductsPage: (input: unknown) => searchProductsPageMock(input),
}));

vi.mock("@/auth/Session", () => ({
  clearAuthSession: () => clearAuthSessionMock(),
  loadAuthSession: () => ({
    token: "token",
    username: "tester",
    scope: "session",
  }),
}));

vi.mock("@/auth/SortStorage", () => ({
  clearSort: () => clearSortMock(),
  loadSort: () => loadSortMock(),
  saveSort: (value: unknown) => saveSortMock(value),
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

import { ProductsPage } from "../routes/products";

function createProductPage(input: {
  total: number;
  skip: number;
  limit?: number;
  count?: number;
}): ProductPage {
  const limit = input.limit ?? 10;
  const count =
    input.count ?? Math.min(limit, Math.max(0, input.total - input.skip));
  const products = Array.from({ length: count }, (_, index) => {
    const id = input.skip + index + 1;
    return {
      id,
      title: `Product ${id}`,
      price: id * 10,
      rating: 4,
      brand: "Brand",
      sku: `SKU-${id}`,
    };
  });

  return {
    products,
    total: input.total,
    skip: input.skip,
    limit,
  };
}

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe("ProductsPage", () => {
  beforeEach(() => {
    routeSearch.q = undefined;
    navigateMock.mockReset();
    fetchProductsPageMock.mockReset();
    searchProductsPageMock.mockReset();
    loadSortMock.mockReset();
    saveSortMock.mockReset();
    clearSortMock.mockReset();
    clearAuthSessionMock.mockReset();
    loadSortMock.mockReturnValue(null);
    navigateMock.mockResolvedValue(undefined);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders pagination in the table footer for the default products list", async () => {
    fetchProductsPageMock.mockResolvedValueOnce(
      createProductPage({ total: 25, skip: 0 })
    );

    render(<ProductsPage />);

    await waitFor(() => {
      expect(fetchProductsPageMock).toHaveBeenCalledWith({
        limit: 10,
        skip: 0,
      });
    });

    expect(searchProductsPageMock).not.toHaveBeenCalled();

    const shell = screen.getByTestId("products-table-shell");
    const footer = screen.getByTestId("products-table-footer");

    expect(shell).toContainElement(footer);
    expect(within(footer).getByText("Страница 1 из 3")).toBeInTheDocument();
    expect(
      within(footer).getByRole("navigation", { name: "Pagination" })
    ).toBeInTheDocument();
  });

  it("uses the same footer pagination flow for search results", async () => {
    const user = userEvent.setup();
    routeSearch.q = "phone";
    searchProductsPageMock.mockResolvedValue(
      createProductPage({ total: 30, skip: 0 })
    );

    render(<ProductsPage />);

    await waitFor(() => {
      expect(searchProductsPageMock).toHaveBeenNthCalledWith(1, {
        q: "phone",
        limit: 10,
        skip: 0,
      });
    });

    await user.click(
      screen.getByRole("button", { name: "Следующая страница" })
    );

    await waitFor(() => {
      expect(searchProductsPageMock).toHaveBeenNthCalledWith(2, {
        q: "phone",
        limit: 10,
        skip: 10,
      });
    });

    expect(fetchProductsPageMock).not.toHaveBeenCalled();
    expect(screen.getByText("Страница 2 из 3")).toBeInTheDocument();
  });

  it("disables boundary controls and keeps controls disabled while page is loading", async () => {
    const user = userEvent.setup();
    const secondPageDeferred = createDeferred<ProductPage>();

    fetchProductsPageMock
      .mockResolvedValueOnce(createProductPage({ total: 20, skip: 0 }))
      .mockReturnValueOnce(secondPageDeferred.promise);

    render(<ProductsPage />);

    await waitFor(() => {
      expect(fetchProductsPageMock).toHaveBeenNthCalledWith(1, {
        limit: 10,
        skip: 0,
      });
    });

    expect(
      screen.getByRole("button", { name: "Предыдущая страница" })
    ).toBeDisabled();

    await user.click(
      screen.getByRole("button", { name: "Следующая страница" })
    );

    await waitFor(() => {
      expect(fetchProductsPageMock).toHaveBeenNthCalledWith(2, {
        limit: 10,
        skip: 10,
      });
    });

    expect(
      screen.getByRole("button", { name: "Следующая страница" })
    ).toBeDisabled();

    secondPageDeferred.resolve(createProductPage({ total: 20, skip: 10 }));

    await waitFor(() => {
      expect(screen.getByText("Страница 2 из 2")).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", { name: "Следующая страница" })
    ).toBeDisabled();
  });
});
