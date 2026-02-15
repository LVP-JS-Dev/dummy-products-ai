#!/usr/bin/env node

import fs from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3001";
const round = process.env.PARITY_ROUND ?? "round2";
const STABLE_RENDER_DELAY = 600;
const PRODUCT_STABLE_RENDER_DELAY = 1500;
const PRODUCT_SELECT_RENDER_DELAY = 300;

const outDir = `openspec/changes/ui-kit-figma-playwright-parity/artifacts/screenshots/${round}/web-requirements`;

const figmaProducts = [
	{
		id: 1,
		title: "USB Флэшкарта 16GB",
		category: "Аксессуары",
		brand: "Samsung",
		sku: "RCH45Q1A",
		rating: 4.3,
		price: 48_652,
		thumbnail: null,
	},
	{
		id: 2,
		title: "Игровая консоль PlaySta...",
		category: "Игровые приставки",
		brand: "Sony",
		sku: "HT45Q21",
		rating: 4.1,
		price: 56_236,
		thumbnail: null,
	},
	{
		id: 3,
		title: "Смартфон Apple iPhone 17",
		category: "Телефоны",
		brand: "Apple",
		sku: "GUYHD2-X4",
		rating: 4.7,
		price: 88_652,
		thumbnail: null,
	},
	{
		id: 4,
		title: "Утюг Braun TexStyle 9",
		category: "Бытовая техника",
		brand: "TexStyle",
		sku: "DFCHQ1A",
		rating: 4.9,
		price: 4233,
		thumbnail: null,
	},
	{
		id: 5,
		title: "Фен Dyson Supersonic Nural",
		category: "Электроника",
		brand: "Dyson",
		sku: "FJHHGF-CR4",
		rating: 3.3,
		price: 48_652,
		thumbnail: null,
	},
];

await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

const loginCtx = await browser.newContext({
	viewport: { width: 1920, height: 1080 },
});
const loginPage = await loginCtx.newPage();
await loginPage.goto(`${baseUrl}/login`, { waitUntil: "networkidle" });
await loginPage.locator("#username").fill("test");
await loginPage.locator("#password").fill("1234567890123");
await loginPage.locator("body").click({ position: { x: 10, y: 10 } });
// Allow UI to settle for parity screenshots (input render + font swap).
await loginPage.waitForTimeout(STABLE_RENDER_DELAY);
await loginPage.screenshot({ path: `${outDir}/login.png` });
await loginCtx.close();

const productsCtx = await browser.newContext({
	viewport: { width: 1920, height: 824 },
});
await productsCtx.addInitScript(() => {
	sessionStorage.setItem(
		"dummy-products.auth",
		JSON.stringify({ token: "parity-token", username: "parity-user" }),
	);
});
const productsPage = await productsCtx.newPage();
await productsPage.route("**/products?*", async (route) => {
	const url = route.request().url();
	const parsed = new URL(url);
	const limit = Number(parsed.searchParams.get("limit") || "20");
	const skip = Number(parsed.searchParams.get("skip") || "0");
	const products = figmaProducts.slice(0, limit);
	await route.fulfill({
		status: 200,
		contentType: "application/json",
		body: JSON.stringify({
			products,
			total: 120,
			skip,
			limit,
		}),
	});
});
await productsPage.route("**/products/search?*", async (route) => {
	await route.fulfill({
		status: 200,
		contentType: "application/json",
		body: JSON.stringify({
			products: figmaProducts,
			total: 5,
			skip: 0,
			limit: 5,
		}),
	});
});

await productsPage.goto(`${baseUrl}/products`, { waitUntil: "networkidle" });
// Allow table rows and fonts to stabilize before selection.
await productsPage.waitForTimeout(PRODUCT_STABLE_RENDER_DELAY);
await productsPage.locator("tbody tr").nth(2).locator("button").first().click();
// Wait for row selection styles to apply before capturing.
await productsPage.waitForTimeout(PRODUCT_SELECT_RENDER_DELAY);
await productsPage.screenshot({ path: `${outDir}/products.png` });
await productsCtx.close();

await browser.close();

console.log(`Captured deterministic parity screenshots to ${outDir}`);
