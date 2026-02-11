import { expect, test } from "@playwright/test";

import {
  buildProductPage,
  mockAuthError,
  mockAuthSuccess,
  mockProductsPage,
} from "./Fixtures";

const LOGIN_URL_RE = /\/login$/;
const PRODUCTS_URL_RE = /\/products$/;

test.describe("auth flows", () => {
  test("login required-field validation", async ({ page }) => {
    await page.goto("/login");

    await page.locator("#login-submit").click();

    await expect(page.getByText("Логин обязателен")).toBeVisible();
    await expect(page.getByText("Пароль обязателен")).toBeVisible();
  });

  test("auth api error surfaces in the form", async ({ page }) => {
    await mockAuthError(page, { message: "Invalid credentials" });
    await page.goto("/login");

    await page.getByLabel("Логин").fill("wrong");
    await page.getByRole("textbox", { name: "Пароль" }).fill("bad");
    await page.locator("#login-submit").click();

    await expect(page.getByTestId("login-error")).toHaveText(
      "Invalid credentials"
    );
  });

  test("unauthenticated users are redirected to login", async ({ page }) => {
    await page.goto("/products");
    await expect(page).toHaveURL(LOGIN_URL_RE);
    await expect(page.getByTestId("login-page")).toBeVisible();
  });

  test("remember me enabled persists session across contexts", async ({
    page,
  }) => {
    await mockAuthSuccess(page, { username: "kminchelle" });
    await mockProductsPage(page, buildProductPage());

    await page.goto("/login");
    await page.getByLabel("Логин").fill("kminchelle");
    await page.getByRole("textbox", { name: "Пароль" }).fill("any");
    await page.getByLabel("Запомнить данные").check({ force: true });
    await page.locator("#login-submit").click();

    await expect(page).toHaveURL(PRODUCTS_URL_RE);

    const storageState = await page.context().storageState();
    const browser = page.context().browser();
    if (!browser) {
      throw new Error("Browser instance is not available in this context.");
    }

    const nextContext = await browser.newContext({ storageState });
    const nextPage = await nextContext.newPage();
    await mockProductsPage(nextPage, buildProductPage());

    await nextPage.goto("/products");
    await expect(nextPage).toHaveURL(PRODUCTS_URL_RE);

    await nextContext.close();
  });

  test("remember me disabled does not persist session across contexts", async ({
    page,
  }) => {
    await mockAuthSuccess(page, { username: "kminchelle" });
    await mockProductsPage(page, buildProductPage());

    await page.goto("/login");
    await page.getByLabel("Логин").fill("kminchelle");
    await page.getByRole("textbox", { name: "Пароль" }).fill("any");
    await page.locator("#login-submit").click();

    await expect(page).toHaveURL(PRODUCTS_URL_RE);

    const storageState = await page.context().storageState();
    const browser = page.context().browser();
    if (!browser) {
      throw new Error("Browser instance is not available in this context.");
    }

    const nextContext = await browser.newContext({ storageState });
    const nextPage = await nextContext.newPage();
    await nextPage.goto("/products");

    await expect(nextPage).toHaveURL(LOGIN_URL_RE);

    await nextContext.close();
  });
});
