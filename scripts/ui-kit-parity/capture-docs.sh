#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:4000}"
OUT_DIR="${2:-openspec/changes/ui-kit-figma-playwright-parity/artifacts/screenshots/round1/docs}"
PARALLELISM="${PARALLELISM:-3}"

mkdir -p "$OUT_DIR"

components=(
  input
  button
  checkbox
  divider
  link
  text
  toast
  card
  spinner
  image
  icon
  pagination
  page-number
  search-input
)

printf '%s\n' "${components[@]}" \
  | xargs -I{} -P "$PARALLELISM" bash -c '
      set -euo pipefail
      component="$1"
      out_dir="$2"
      base_url="$3"
      npx playwright screenshot \
        --full-page \
        --wait-for-timeout 1200 \
        --viewport-size "1440,1800" \
        "${base_url}/docs/components/${component}" \
        "${out_dir}/${component}.png" >/dev/null
    ' _ {} "$OUT_DIR" "$BASE_URL"

echo "Captured docs screenshots to $OUT_DIR"
