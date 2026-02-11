#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:5173}"
OUT_DIR="${2:-openspec/changes/ui-kit-figma-playwright-parity/artifacts/screenshots/round1/web}"

mkdir -p "$OUT_DIR"

npx playwright screenshot \
  --full-page \
  --wait-for-timeout 1200 \
  --viewport-size "1440,1800" \
  "${BASE_URL}/login" \
  "${OUT_DIR}/login.png" >/dev/null

npx playwright screenshot \
  --full-page \
  --wait-for-timeout 2000 \
  --viewport-size "1440,1800" \
  "${BASE_URL}/products" \
  "${OUT_DIR}/products.png" >/dev/null

echo "Captured web screenshots to $OUT_DIR"
