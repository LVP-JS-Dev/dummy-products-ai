#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:5173}"
OUT_DIR="${2:-openspec/changes/ui-kit-figma-playwright-parity/artifacts/screenshots/round1/web}"

mkdir -p "$OUT_DIR"

BASE_URL_ENV="$BASE_URL" OUT_DIR_ENV="$OUT_DIR" \
  npx --yes --package=playwright node --input-type=module <<'EOF'
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL_ENV;
const outDir = process.env.OUT_DIR_ENV;
const authKey = "dummy-products.auth";
const authValue = JSON.stringify({ token: "parity-token", username: "parity-user" });

const browser = await chromium.launch();

const loginContext = await browser.newContext({ viewport: { width: 1440, height: 1800 } });
const loginPage = await loginContext.newPage();
await loginPage.goto(\`\${baseUrl}/login\`, { waitUntil: "networkidle" });
await loginPage.waitForTimeout(1200);
await loginPage.screenshot({ path: \`\${outDir}/login.png\`, fullPage: true });
await loginContext.close();

const productsContext = await browser.newContext({ viewport: { width: 1440, height: 1800 } });
await productsContext.addInitScript(
  ({ key, value }) => {
    window.sessionStorage.setItem(key, value);
  },
  { key: authKey, value: authValue }
);
const productsPage = await productsContext.newPage();
await productsPage.goto(\`\${baseUrl}/products\`, { waitUntil: "networkidle" });
await productsPage.waitForTimeout(2000);
await productsPage.screenshot({ path: \`\${outDir}/products.png\`, fullPage: true });
await productsContext.close();

await browser.close();
EOF

echo "Captured web screenshots to $OUT_DIR"
