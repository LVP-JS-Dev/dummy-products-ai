import { chromium } from "playwright";

const pages = [
	{ url: "http://localhost:4000", name: "Home" },
	{ url: "http://localhost:4000/docs", name: "Docs Index" },
	{
		url: "http://localhost:4000/docs/getting-started",
		name: "Getting Started",
	},
	{ url: "http://localhost:4000/docs/architecture", name: "Architecture" },
	{
		url: "http://localhost:4000/docs/components/button",
		name: "Button Component",
	},
	{
		url: "http://localhost:4000/docs/components/input",
		name: "Input Component",
	},
	{ url: "http://localhost:4000/ru", name: "RU Home" },
	{ url: "http://localhost:4000/ru/docs", name: "RU Docs Index" },
];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

const results = [];

for (const { url, name } of pages) {
	try {
		const response = await page.goto(url, {
			waitUntil: "networkidle",
			timeout: 10000,
		});
		const status = response.status();
		const title = await page.title();
		results.push({
			name,
			url,
			status,
			title,
			ok: status >= 200 && status < 400,
		});
		console.log(`✓ ${name}: ${status} - ${title}`);
	} catch (error) {
		results.push({
			name,
			url,
			status: "ERROR",
			title: error.message,
			ok: false,
		});
		console.log(`✗ ${name}: ERROR - ${error.message}`);
	}
}

await browser.close();

const failed = results.filter((r) => !r.ok);
if (failed.length > 0) {
	console.log(`\n❌ ${failed.length} pages failed`);
	process.exit(1);
} else {
	console.log(`\n✅ All ${results.length} pages OK`);
}
