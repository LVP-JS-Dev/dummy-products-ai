#!/usr/bin/env bash
set -euo pipefail

# Captures web routes in the same viewport sizes as `requirements/*.png`,
# enabling direct pixel-level comparison via ImageMagick.

BASE_URL="${1:-http://localhost:3001}"
OUT_DIR="${2:-openspec/changes/ui-kit-figma-playwright-parity/artifacts/screenshots/round1/web-ref}"

mkdir -p "$OUT_DIR"

# Matches requirements/auth-form.png (1920x1080)
npx playwright screenshot \
  --wait-for-timeout 1600 \
  --viewport-size "1920,1080" \
  "${BASE_URL}/login" \
  "${OUT_DIR}/login.png" >/dev/null

# Matches requirements/goods-list.png (1920x824)
npx playwright screenshot \
  --wait-for-timeout 2500 \
  --viewport-size "1920,824" \
  "${BASE_URL}/products" \
  "${OUT_DIR}/products.png" >/dev/null

echo "Captured web reference screenshots to $OUT_DIR"
