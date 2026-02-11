import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  buttonContract,
  buttonEvents,
  checkboxContract,
  checkboxEvents,
  iconContract,
  pageNumberContract,
  pageNumberEvents,
  paginationContract,
  paginationEvents,
  searchInputContract,
  searchInputEvents,
  sortIndicatorContract,
} from "../src/contracts";

const components = {
  Button: { props: buttonContract, events: buttonEvents },
  SearchInput: { props: searchInputContract, events: searchInputEvents },
  Checkbox: { props: checkboxContract, events: checkboxEvents },
  Pagination: { props: paginationContract, events: paginationEvents },
  PageNumber: { props: pageNumberContract, events: pageNumberEvents },
  Icon: { props: iconContract },
  SortIndicator: { props: sortIndicatorContract },
} as const;

const schemaDir = resolve("src/generated/schemas");

const fileNameMap: Record<keyof typeof components, string> = {
  Button: "button",
  SearchInput: "search-input",
  Checkbox: "checkbox",
  Pagination: "pagination",
  PageNumber: "page-number",
  Icon: "icon",
  SortIndicator: "sort-indicator",
};

function toKebabCase(value: string) {
  return value
    .replaceAll("_", "-")
    .replaceAll(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

async function main() {
  await mkdir(schemaDir, { recursive: true });

  const manifest: {
    components: Record<
      string,
      {
        schema: string;
        propsSchema: string;
        events?: Record<string, { payloadSchema: string }>;
      }
    >;
  } = {
    components: {},
  };

  for (const [componentName, component] of Object.entries(components)) {
    const fileBase = fileNameMap[componentName as keyof typeof components];

    const propsSchema = zodToJsonSchema(component.props, componentName);
    const propsFileName = `${fileBase}.schema.json`;
    const propsFilePath = resolve(schemaDir, propsFileName);

    await writeFile(
      propsFilePath,
      `${JSON.stringify(propsSchema, null, 2)}\n`,
      "utf8"
    );

    const eventsManifest: Record<string, { payloadSchema: string }> = {};

    if ("events" in component && component.events) {
      for (const [eventName, payloadContract] of Object.entries(
        component.events
      )) {
        const payloadSchema = zodToJsonSchema(
          payloadContract,
          `${componentName}.${eventName}`
        );
        const payloadFileName = `${fileBase}.${toKebabCase(eventName)}.schema.json`;
        const payloadFilePath = resolve(schemaDir, payloadFileName);

        await writeFile(
          payloadFilePath,
          `${JSON.stringify(payloadSchema, null, 2)}\n`,
          "utf8"
        );
        eventsManifest[eventName] = {
          payloadSchema: `schemas/${payloadFileName}`,
        };
      }
    }

    const schemaPath = `schemas/${propsFileName}`;
    const hasEventSchemas = Object.keys(eventsManifest).length > 0;

    if (hasEventSchemas) {
      manifest.components[componentName] = {
        schema: schemaPath,
        propsSchema: schemaPath,
        events: eventsManifest,
      };
    } else {
      manifest.components[componentName] = {
        schema: schemaPath,
        propsSchema: schemaPath,
      };
    }
  }

  const manifestPath = resolve("src/generated/manifest.json");
  await writeFile(
    manifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8"
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
