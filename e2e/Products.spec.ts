import { expect, test } from "@playwright/test";

import {
  buildProduct,
  buildProductPage,
  mockProductsPage,
  mockSearchPage,
  seedAuthStorage,
} from "./Fixtures";

const LOADING_INDICATOR_FULL_RE = /w-2\/5/;
const LOADING_INDICATOR_EMPTY_RE = /w-0/;
const PRICE_TEXT_RE = /100,00/;

test.describe("products flows", () => {
  test.beforeEach(async ({ page }) => {
    await seedAuthStorage(page, { scope: "local" });
  });

  test("products list shows loading indicator", async ({ page }) => {
    await mockProductsPage(
      page,
      buildProductPage({
        products: [buildProduct({ id: 1, title: "Desk", rating: 4.1 })],
        total: 1,
        limit: 10,
        skip: 0,
      }),
      { delayMs: 600 }
    );

    await page.goto("/products");

    const indicator = page.getByTestId("products-loading-indicator");
    await expect(indicator).toHaveClass(LOADING_INDICATOR_FULL_RE);
    await expect(page.getByText("Desk")).toBeVisible();
    await expect(indicator).toHaveClass(LOADING_INDICATOR_EMPTY_RE);
  });

  test("pagination boundaries are disabled at edges", async ({ page }) => {
    await page.route("**/products?*", async (route) => {
      const url = new URL(route.request().url());
      const skip = Number(url.searchParams.get("skip") ?? "0");
      const pageData = buildProductPage({
        products:
          skip === 0
            ? [buildProduct({ id: 1, title: "Alpha" })]
            : [buildProduct({ id: 2, title: "Beta" })],
        total: 20,
        limit: 10,
        skip,
      });
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(pageData),
      });
    });

    await page.goto("/products");

    const prev = page.getByLabel("Предыдущая страница");
    const next = page.getByLabel("Следующая страница");

    await expect(prev).toBeDisabled();
    await expect(next).toBeEnabled();

    await next.click();
    await expect(page.getByText("Beta")).toBeVisible();

    await expect(prev).toBeEnabled();
    await expect(next).toBeDisabled();
  });

  test("sorting updates column order and indicator", async ({ page }) => {
    await mockProductsPage(
      page,
      buildProductPage({
        products: [
          buildProduct({ id: 1, title: "Alpha", price: 200, rating: 4.2 }),
          buildProduct({ id: 2, title: "Beta", price: 100, rating: 4.8 }),
        ],
        total: 2,
        limit: 10,
        skip: 0,
      })
    );

    await page.goto("/products");

    const header = page.getByRole("columnheader", { name: "Цена, ₽" });
    await expect(header).toHaveAttribute("aria-sort", "none");

    await page.getByRole("button", { name: "Цена, ₽" }).click();
    await expect(header).toHaveAttribute("aria-sort", "ascending");

    const firstPrice = page.locator("tbody tr").first().locator("td").nth(5);
    await expect(firstPrice).toHaveText(PRICE_TEXT_RE);

    await page.getByRole("button", { name: "Цена, ₽" }).click();
    await expect(header).toHaveAttribute("aria-sort", "descending");
  });

  test("search queries the API and renders results", async ({ page }) => {
    await mockProductsPage(page, buildProductPage({ products: [] }));
    await mockSearchPage(
      page,
      buildProductPage({
        products: [buildProduct({ id: 10, title: "Phone Pro" })],
        total: 1,
        limit: 10,
        skip: 0,
      })
    );

    await page.goto("/products");

    const requestPromise = page.waitForRequest((request) => {
      const url = request.url();
      return url.includes("/products/search") && url.includes("q=phone");
    });

    await page.getByPlaceholder("Введите запрос").fill("phone");
    await page.getByPlaceholder("Введите запрос").press("Enter");

    await requestPromise;
    await expect(page.getByText("Phone Pro")).toBeVisible();
  });

  test("add product validates required fields and shows success toast", async ({
    page,
  }) => {
    await mockProductsPage(page, buildProductPage({ products: [] }));

    await page.goto("/products");

    await page.locator("#add-product-button").click();
    await expect(page.getByTestId("add-product-modal")).toBeVisible();

    await page.locator("#add-product-save").click();
    await expect(page.getByText("Обязательное поле")).toHaveCount(4);

    await page.getByLabel("Наименование").fill("Товар");
    await page.getByLabel("Цена").fill("1200");
    await page.getByLabel("Вендор").fill("Vendor");
    await page.getByLabel("Артикул").fill("ART-1");

    await page.locator("#add-product-save").click();
    await expect(page.getByText("Товар добавлен")).toBeVisible();
  });

  test("rating below 3 is highlighted in red", async ({ page }) => {
    await mockProductsPage(
      page,
      buildProductPage({
        products: [buildProduct({ id: 5, title: "Low Rating", rating: 2.5 })],
        total: 1,
        limit: 10,
        skip: 0,
      })
    );

    await page.goto("/products");

    const rating = page.getByText("2.5/5");
    await expect(rating).toBeVisible();
    await expect(rating).toHaveCSS("color", "rgb(220, 38, 38)");
  });
});
