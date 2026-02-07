import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  buttonContract,
  searchInputContract,
  checkboxContract,
  pageNumberContract,
  iconContract,
} from "../src/contracts";

const components = {
  Button: buttonContract,
  SearchInput: searchInputContract,
  Checkbox: checkboxContract,
  PageNumber: pageNumberContract,
  Icon: iconContract,
} as const;

const schemaDir = resolve("src/generated/schemas");

const fileNameMap: Record<keyof typeof components, string> = {
  Button: "button",
  SearchInput: "search-input",
  Checkbox: "checkbox",
  PageNumber: "page-number",
  Icon: "icon",
};

async function main() {
  await mkdir(schemaDir, { recursive: true });

  const manifest: { components: Record<string, { schema: string }> } = {
    components: {},
  };

  for (const [name, schema] of Object.entries(components)) {
    const fileBase = fileNameMap[name as keyof typeof components];
    const jsonSchema = zodToJsonSchema(schema, name);
    const fileName = `${fileBase}.schema.json`;
    const filePath = resolve(schemaDir, fileName);

    await writeFile(filePath, JSON.stringify(jsonSchema, null, 2), "utf8");
    manifest.components[name] = {
      schema: `schemas/${fileName}`,
    };
  }

  const manifestPath = resolve("src/generated/manifest.json");
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
