#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:3001}"
CHANGE_DIR="${CHANGE_DIR:-openspec/changes/ui-kit-figma-playwright-parity}"
ROUND="${PARITY_ROUND:-round1}"

CAP_DIR="${CHANGE_DIR}/artifacts/screenshots/${ROUND}/web-requirements"
DIFF_DIR="${CHANGE_DIR}/artifacts/diffs/${ROUND}"
SUMMARY_JSON="${DIFF_DIR}/requirements-diff.json"

mkdir -p "$CAP_DIR" "$DIFF_DIR"

if ! command -v compare >/dev/null 2>&1; then
  echo "ImageMagick 'compare' not found in PATH." >&2
  exit 1
fi

if ! command -v identify >/dev/null 2>&1; then
  echo "ImageMagick 'identify' not found in PATH." >&2
  exit 1
fi

capture() {
  local route="$1"
  local out="$2"
  local viewport="$3"
  local wait_ms="$4"

  npx playwright screenshot \
    --wait-for-timeout "$wait_ms" \
    --viewport-size "$viewport" \
    "${BASE_URL}${route}" \
    "$out" >/dev/null
}

capture "/login" "${CAP_DIR}/login.png" "1920,1080" 1600
capture "/products" "${CAP_DIR}/products.png" "1920,824" 2200

diff_pair() {
  local name="$1"
  local captured="$2"
  local reference="$3"
  local diff_img="$4"

  local wh total_pixels metric_raw ae percent
  wh="$(identify -format '%w %h' "$captured")"
  total_pixels="$(( ${wh% *} * ${wh#* } ))"

  # NOTE: compare prints the metric to stderr.
  metric_raw="$(compare -metric AE "$captured" "$reference" "$diff_img" 2>&1 >/dev/null || true)"
  ae="$(awk '{print $1}' <<<"$metric_raw")"
  if [[ -z "$ae" ]]; then
    echo "Unexpected compare output for ${name}: ${metric_raw}" >&2
    return 1
  fi

  percent="$(awk -v ae="$ae" -v total="$total_pixels" 'BEGIN { printf "%.4f", (ae/total)*100 }')"

  printf '{"name":"%s","captured":"%s","reference":"%s","diff":"%s","different_pixels":%s,"total_pixels":%s,"different_percent":%s}\n' \
    "$name" "$captured" "$reference" "$diff_img" "$ae" "$total_pixels" "$percent"
}

tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

{
  diff_pair \
    "login" \
    "${CAP_DIR}/login.png" \
    "requirements/auth-form.png" \
    "${DIFF_DIR}/login-diff.png"
  diff_pair \
    "products" \
    "${CAP_DIR}/products.png" \
    "requirements/goods-list.png" \
    "${DIFF_DIR}/products-diff.png"
} >"$tmp"

{
  echo "{"
  echo "  \"baseUrl\": \"${BASE_URL}\","
  echo "  \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\","
  echo "  \"pairs\": ["
  awk 'BEGIN{first=1} { if (!first) print ","; first=0; printf "    %s", $0 } END{ print "" }' "$tmp"
  echo "  ]"
  echo "}"
} >"$SUMMARY_JSON"

echo "Wrote diff summary to $SUMMARY_JSON"
echo "Captured images: $CAP_DIR"
echo "Diff images: $DIFF_DIR"
