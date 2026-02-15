#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const fileKey = process.env.FIGMA_FILE_KEY ?? "zZovsAwSXtBZAWKhXS40Pj";
const token = process.env.FIGMA_TOKEN;
const outDir =
	process.env.FIGMA_OUT_DIR ??
	"openspec/changes/ui-kit-figma-playwright-parity/artifacts/figma";
const retries = [5000, 15_000, 30_000];
const nodeIds = ["1046:50", "1046:71", "1:417", "1:451"];

const fallbackRefs = [
	"requirements/auth-form.png",
	"requirements/goods-list.png",
	"apps/web/src/routes/login.figma-map.md",
	"apps/web/src/routes/products.figma-map.md",
];

await fs.mkdir(outDir, { recursive: true });

async function sleep(ms) {
	await new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeSummary(summary) {
	await fs.writeFile(
		path.join(outDir, "reference-summary.json"),
		`${JSON.stringify(summary, null, 2)}\n`,
		"utf8",
	);
}

if (!token) {
	const summary = {
		source: "fallback",
		reason: "FIGMA_TOKEN is not set",
		fileKey,
		nodeIds,
		fallbackRefs,
		timestamp: new Date().toISOString(),
	};
	await writeSummary(summary);
	console.log("Figma token missing; wrote fallback summary.");
	process.exit(0);
}

let lastError = null;
for (let attempt = 0; attempt <= retries.length; attempt += 1) {
	try {
		const ids = encodeURIComponent(nodeIds.join(","));
		const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${ids}&depth=2`;
		const response = await fetch(url, {
			headers: {
				"X-Figma-Token": token,
			},
		});

		if (!response.ok) {
			const body = await response.text();
			throw new Error(`HTTP ${response.status}: ${body.slice(0, 300)}`);
		}

		const json = await response.json();
		await fs.writeFile(
			path.join(outDir, "nodes.json"),
			`${JSON.stringify(json, null, 2)}\n`,
			"utf8",
		);
		await writeSummary({
			source: "figma-api",
			fileKey,
			nodeIds,
			artifact: "nodes.json",
			timestamp: new Date().toISOString(),
		});
		console.log("Fetched Figma nodes successfully.");
		process.exit(0);
	} catch (error) {
		lastError = error instanceof Error ? error.message : String(error);
		if (attempt < retries.length) {
			await sleep(retries[attempt]);
		}
	}
}

await writeSummary({
	source: "fallback",
	reason: lastError,
	fileKey,
	nodeIds,
	fallbackRefs,
	retryMs: retries,
	timestamp: new Date().toISOString(),
});
console.log("Figma fetch failed after retries; wrote fallback summary.");
