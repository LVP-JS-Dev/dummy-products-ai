import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const fetchPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "generated",
  ".kubb",
  "fetch.ts"
);

const fetchSource = fs.readFileSync(fetchPath, "utf8");
const normalizedParamsPlaceholder = ["$", "{normalizedParams}"].join("");
const responseStatusPlaceholder = ["$", "{response.status}"].join("");

const replacements = [
  {
    marker:
      "  let targetUrl = [config.baseURL, config.url].filter(Boolean).join('')",
    insert: [
      "  const targetPath = config.url || ''",
      "  const isAbsoluteUrl = /^https?:\\/\\//i.test(targetPath)",
      "  let targetUrl = isAbsoluteUrl ? targetPath : [config.baseURL, targetPath].filter(Boolean).join('')",
    ].join("\n"),
  },
  {
    marker: `  if (config.params) {\n    targetUrl += \`?${normalizedParamsPlaceholder}\`\n  }`,
    insert: `  if (normalizedParams.size > 0) {\n    targetUrl += \`?${normalizedParamsPlaceholder}\`\n  }`,
  },
  {
    marker:
      "  const response = await globalThis.fetch(targetUrl, {\n    credentials: config.credentials || 'same-origin',\n    method: config.method?.toUpperCase(),\n    body: config.data instanceof FormData ? config.data : JSON.stringify(config.data),\n    signal: config.signal,\n    headers: config.headers,\n  })",
    insert: [
      "  const hasBody = config.data !== undefined && config.data !== null",
      "  const isFormDataBody = config.data instanceof FormData",
      "  const body = !hasBody ? undefined : isFormDataBody ? config.data : JSON.stringify(config.data)",
      "  const headers = new Headers(config.headers)",
      "",
      "  if (hasBody && !isFormDataBody && !headers.has('content-type')) {",
      "    headers.set('content-type', 'application/json')",
      "  }",
      "",
      "  const response = await globalThis.fetch(targetUrl, {",
      "    credentials: config.credentials || 'same-origin',",
      "    method: config.method?.toUpperCase(),",
      "    body,",
      "    signal: config.signal,",
      "    headers,",
      "  })",
    ].join("\n"),
  },
  {
    marker:
      "  const data = [204, 205, 304].includes(response.status) || !response.body ? {} : await response.json()",
    insert: [
      "  const hasNoPayload = [204, 205, 304].includes(response.status) || !response.body",
      "  const responseContentType = response.headers.get('content-type') || ''",
      "  const data = hasNoPayload",
      "    ? {}",
      "    : responseContentType.includes('application/json')",
      "      ? await response.json()",
      "      : await response.text()",
    ].join("\n"),
  },
];

let updatedFetch = fetchSource;
for (const { marker, insert } of replacements) {
  if (!updatedFetch.includes(marker)) {
    throw new Error(`fetch.ts template marker not found: ${marker}`);
  }
  updatedFetch = updatedFetch.replace(marker, insert);
}

if (!updatedFetch.includes("if (!response.ok)")) {
  const dataMarker = [
    "  const hasNoPayload = [204, 205, 304].includes(response.status) || !response.body",
    "  const responseContentType = response.headers.get('content-type') || ''",
    "  const data = hasNoPayload",
    "    ? {}",
    "    : responseContentType.includes('application/json')",
    "      ? await response.json()",
    "      : await response.text()",
  ].join("\n");
  if (!updatedFetch.includes(dataMarker)) {
    throw new Error("fetch.ts data block marker not found; patch aborted.");
  }
  const errorBlock = [
    "",
    "  if (!response.ok) {",
    `    const error = new Error(response.statusText || \`Request failed with status ${responseStatusPlaceholder}\`) as Error & {`,
    "      data: unknown",
    "      status: number",
    "      headers: Headers",
    "    }",
    "    error.data = data",
    "    error.status = response.status",
    "    error.headers = response.headers as Headers",
    "    throw error",
    "  }",
  ].join("\n");
  updatedFetch = updatedFetch.replace(dataMarker, `${dataMarker}${errorBlock}`);
}

fs.writeFileSync(fetchPath, updatedFetch);

const loginSchemaPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "generated",
  "zod",
  "loginResponseSchema.ts"
);

const loginSchemaSource = fs.readFileSync(loginSchemaPath, "utf8");
if (!loginSchemaSource.includes("Either token or accessToken is required.")) {
  const refineBlock = [
    ".refine((data) => {",
    '  const hasToken = typeof data.token === "string" && data.token.length > 0;',
    '  const hasAccessToken = typeof data.accessToken === "string" && data.accessToken.length > 0;',
    "  return hasToken || hasAccessToken;",
    "}, {",
    '  message: "Either token or accessToken is required.",',
    "})",
  ].join("\n");
  const describeMatch = loginSchemaSource.match(
    /\.describe\("DummyJSON response[\s\S]*?"\)/
  );
  if (!describeMatch) {
    throw new Error(
      "loginResponseSchema describe marker not found; patch aborted."
    );
  }
  const loginSchemaUpdated = loginSchemaSource.replace(
    describeMatch[0],
    (match) => `${refineBlock}${match}`
  );
  fs.writeFileSync(loginSchemaPath, loginSchemaUpdated);
}
