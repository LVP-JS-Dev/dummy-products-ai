import fs from "node:fs";
import path from "node:path";

const targetPath = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
  "generated",
  ".kubb",
  "fetch.ts"
);

const source = fs.readFileSync(targetPath, "utf8");

if (source.includes("if (!response.ok)")) {
  process.exit(0);
}

const marker =
  "const data = [204, 205, 304].includes(response.status) || !response.body ? {} : await response.json()";

const insert = `${marker}\n\n  if (!response.ok) {\n    const error = new Error(response.statusText || \`Request failed with status \${response.status}\`) as Error & {\n      data: unknown\n      status: number\n    }\n    error.data = data\n    error.status = response.status\n    throw error\n  }`;

if (!source.includes(marker)) {
  throw new Error("fetch.ts template marker not found; patch aborted.");
}

const updated = source.replace(marker, insert);

fs.writeFileSync(targetPath, updated);
