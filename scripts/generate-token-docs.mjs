import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT_DIR = process.cwd();

const CSS_TOKENS_PATH = path.join(ROOT_DIR, "packages/ui-kit/src/tokens.css");
const DOCS_METADATA_PATH = path.join(
  ROOT_DIR,
  "packages/ui-kit/src/tokens.docs.json"
);
const OUTPUT_MDX_PATH = path.join(
  ROOT_DIR,
  "apps/fumadocs/content/docs/design-tokens.mdx"
);

const RE_GROUP_KEY = /^--ui-([a-z0-9]+)-/i;
const RE_COLOR_SUBGROUP = /^--ui-color-([a-z0-9]+)-/i;

function parseArgs(argv) {
  return {
    check: argv.includes("--check"),
  };
}

function extractRootBlock(css) {
  const rootStart = css.indexOf(":root");
  if (rootStart === -1) {
    return null;
  }

  const braceStart = css.indexOf("{", rootStart);
  if (braceStart === -1) {
    return null;
  }

  let depth = 0;
  for (let i = braceStart; i < css.length; i += 1) {
    const char = css[i];
    if (char === "{") {
      depth += 1;
    }
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return css.slice(braceStart + 1, i);
      }
    }
  }

  return null;
}

function parseCssVariablesFromRoot(css) {
  const rootBody = extractRootBlock(css);
  if (!rootBody) {
    throw new Error(
      `Could not find a ':root { ... }' block in ${CSS_TOKENS_PATH}`
    );
  }

  // Remove block comments to avoid matching tokens inside commented sections.
  const withoutComments = rootBody.replaceAll(/\/\*[\s\S]*?\*\//g, "");

  const tokens = [];
  const re = /(--ui-[a-z0-9-]+)\s*:\s*([^;]+)\s*;/gi;
  let match = re.exec(withoutComments);
  while (match) {
    const name = match[1];
    const value = match[2].trim();
    tokens.push({ name, value });
    match = re.exec(withoutComments);
  }

  if (tokens.length === 0) {
    throw new Error(`No '--ui-*' tokens found in ${CSS_TOKENS_PATH}`);
  }

  return tokens;
}

function groupKeyFromTokenName(tokenName) {
  const m = tokenName.match(RE_GROUP_KEY);
  return m ? m[1].toLowerCase() : "other";
}

function subgroupKeyFromTokenName(tokenName, groupKey) {
  if (groupKey !== "color") {
    return null;
  }
  // --ui-color-<palette>-<rest>
  const m = tokenName.match(RE_COLOR_SUBGROUP);
  if (m) {
    return m[1].toLowerCase();
  }
  // e.g. --ui-color-white
  return "base";
}

const GROUPS = [
  {
    key: "color",
    title: "Colors",
    usageExample: `/* Example usage */
.card {
  background: var(--ui-color-white);
  border: 1px solid var(--ui-color-gray-200);
  color: var(--ui-color-text-primary);
}
`,
  },
  {
    key: "font",
    title: "Typography",
    usageExample: `/* Example usage */
h1, h2 {
  font-family: var(--ui-font-heading);
}
p {
  font-family: var(--ui-font-body);
}
`,
  },
  {
    key: "space",
    title: "Spacing",
    usageExample: `/* Example usage */
.stack {
  display: grid;
  gap: var(--ui-space-md);
}
`,
  },
  {
    key: "radius",
    title: "Radius",
    usageExample: `/* Example usage */
.button {
  border-radius: var(--ui-radius-md);
}
`,
  },
];

function groupTitle(groupKey) {
  return GROUPS.find((g) => g.key === groupKey)?.title ?? "Other";
}

function groupOrder(groupKey) {
  const idx = GROUPS.findIndex((g) => g.key === groupKey);
  return idx === -1 ? 999 : idx;
}

function escapeMd(value) {
  // Keep it readable in tables. Backticks are escaped by using code spans.
  return value.replaceAll("|", "\\|").trim();
}

function renderTable(rows) {
  return [
    "| Token | Value | Description |",
    "| --- | --- | --- |",
    ...rows.map(
      (r) =>
        `| \`${r.name}\` | \`${escapeMd(r.value)}\` | ${escapeMd(r.description)} |`
    ),
  ].join("\n");
}

function validateTokenMetadata({ tokenNames, metadata }) {
  const cssTokenNames = new Set(tokenNames);
  const metaTokenNames = new Set(Object.keys(metadata));

  const missingMeta = [...cssTokenNames].filter(
    (name) => !metaTokenNames.has(name)
  );
  const missingCss = [...metaTokenNames].filter(
    (name) => !cssTokenNames.has(name)
  );

  if (missingMeta.length > 0) {
    throw new Error(
      `Missing metadata for ${missingMeta.length} token(s):\n${missingMeta
        .sort()
        .map((n) => `- ${n}`)
        .join("\n")}`
    );
  }

  if (missingCss.length > 0) {
    throw new Error(
      `Metadata contains ${missingCss.length} unknown token(s):\n${missingCss
        .sort()
        .map((n) => `- ${n}`)
        .join("\n")}`
    );
  }
}

function buildRows({ tokens, metadata }) {
  return tokens
    .map((t) => {
      const groupKey = groupKeyFromTokenName(t.name);
      return {
        ...t,
        description: metadata[t.name]?.description ?? "",
        groupKey,
        subgroupKey: subgroupKeyFromTokenName(t.name, groupKey),
      };
    })
    .sort((a, b) => {
      const groupCmp = groupOrder(a.groupKey) - groupOrder(b.groupKey);
      if (groupCmp !== 0) {
        return groupCmp;
      }
      const subCmp = (a.subgroupKey ?? "").localeCompare(b.subgroupKey ?? "");
      if (subCmp !== 0) {
        return subCmp;
      }
      return a.name.localeCompare(b.name);
    });
}

function groupRows(rows) {
  const grouped = new Map();
  for (const row of rows) {
    const key = row.groupKey;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key).push(row);
  }
  return grouped;
}

function buildMdx({ tokens, metadata }) {
  validateTokenMetadata({
    tokenNames: tokens.map((t) => t.name),
    metadata,
  });

  const rows = buildRows({ tokens, metadata });
  const grouped = groupRows(rows);

  const mdxLines = [];
  mdxLines.push("---");
  mdxLines.push('title: "Design Tokens"');
  mdxLines.push('description: "Reference for UI Kit public CSS variables"');
  mdxLines.push("---");
  mdxLines.push("");
  mdxLines.push("> This page is generated. Do not edit it by hand.");
  mdxLines.push("");
  mdxLines.push("## Import");
  mdxLines.push("");
  mdxLines.push("Import the token stylesheet once in your app’s global CSS:");
  mdxLines.push("");
  mdxLines.push("```css");
  mdxLines.push('@import "@dummy-products/ui-kit/tokens.css";');
  mdxLines.push("```");
  mdxLines.push("");

  for (const [groupKey, groupRows] of [...grouped.entries()].sort(
    ([a], [b]) => groupOrder(a) - groupOrder(b)
  )) {
    mdxLines.push(`## ${groupTitle(groupKey)}`);
    mdxLines.push("");

    if (groupKey === "color") {
      const byPalette = new Map();
      for (const r of groupRows) {
        const palette = r.subgroupKey ?? "base";
        if (!byPalette.has(palette)) {
          byPalette.set(palette, []);
        }
        byPalette.get(palette).push(r);
      }

      for (const [palette, paletteRows] of [...byPalette.entries()].sort(
        (a, b) => a[0].localeCompare(b[0])
      )) {
        mdxLines.push(`### ${palette[0].toUpperCase()}${palette.slice(1)}`);
        mdxLines.push("");
        mdxLines.push(
          renderTable(
            paletteRows.map((r) => ({
              name: r.name,
              value: r.value,
              description: r.description,
            }))
          )
        );
        mdxLines.push("");
      }
    } else {
      mdxLines.push(
        renderTable(
          groupRows.map((r) => ({
            name: r.name,
            value: r.value,
            description: r.description,
          }))
        )
      );
      mdxLines.push("");
    }

    const usage = GROUPS.find((g) => g.key === groupKey)?.usageExample;
    if (usage) {
      mdxLines.push("### Example");
      mdxLines.push("");
      mdxLines.push("```css");
      mdxLines.push(usage.trimEnd());
      mdxLines.push("```");
      mdxLines.push("");
    }
  }

  mdxLines.push("");
  return mdxLines.join("\n");
}

async function main() {
  const { check } = parseArgs(process.argv.slice(2));

  const [cssRaw, metadataRaw] = await Promise.all([
    fs.readFile(CSS_TOKENS_PATH, "utf8"),
    fs.readFile(DOCS_METADATA_PATH, "utf8"),
  ]);

  const tokens = parseCssVariablesFromRoot(cssRaw);
  const metadata = JSON.parse(metadataRaw);

  const mdx = buildMdx({ tokens, metadata });

  if (check) {
    const existing = await fs
      .readFile(OUTPUT_MDX_PATH, "utf8")
      .catch(() => null);
    if (existing !== mdx) {
      throw new Error(
        `Token docs are out of date.\nRun: pnpm docs:generate-tokens\n\nExpected output: ${OUTPUT_MDX_PATH}`
      );
    }
    return;
  }

  await fs.mkdir(path.dirname(OUTPUT_MDX_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_MDX_PATH, mdx, "utf8");
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err?.stack ?? String(err));
  process.exit(1);
});
