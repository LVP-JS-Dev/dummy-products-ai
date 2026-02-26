import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT_DIR = process.cwd();

const CSS_PATH = path.join(ROOT_DIR, "packages/ui-kit/src/tokens.css");
const SPEC_PATH = path.join(ROOT_DIR, "packages/ui-kit/src/tokens.spec.json");

// =============================================================================
// CSS Parser
// =============================================================================

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

function parseCssTokenNames(css) {
	const rootBody = extractRootBlock(css);
	if (!rootBody) {
		throw new Error(`Could not find a ':root { ... }' block in ${CSS_PATH}`);
	}

	const withoutComments = rootBody.replaceAll(/\/\*[\s\S]*?\*\//g, "");

	const names = new Set();
	const re = /(--ui-[a-z0-9-]+)\s*:/gi;
	let match = re.exec(withoutComments);
	while (match) {
		names.add(match[1]);
		match = re.exec(withoutComments);
	}

	return names;
}

// =============================================================================
// Spec Parser
// =============================================================================

function extractSpecTokenNames(spec) {
	const names = new Set();

	// Simple token arrays
	const simpleCategories = ["colors", "spacing", "radii"];
	for (const cat of simpleCategories) {
		if (spec[cat]?.tokens) {
			for (const token of spec[cat].tokens) {
				if (token.name) {
					names.add(token.name);
				}
			}
		}
	}

	// Typography nested arrays
	if (spec.typography) {
		const typoArrays = [
			"fontFamilies",
			"fontSizes",
			"fontWeights",
			"lineHeights",
			"letterSpacing",
		];
		for (const arr of typoArrays) {
			if (spec.typography[arr]) {
				for (const token of spec.typography[arr]) {
					if (token.name) {
						names.add(token.name);
					}
				}
			}
		}
	}

	// Effects nested arrays
	if (spec.effects) {
		const effectArrays = ["shadows", "gradients", "strokes"];
		for (const arr of effectArrays) {
			if (spec.effects[arr]) {
				for (const token of spec.effects[arr]) {
					if (token.name) {
						names.add(token.name);
					}
				}
			}
		}
	}

	return names;
}

// =============================================================================
// Main
// =============================================================================

async function main() {
	const [cssRaw, specRaw] = await Promise.all([
		fs.readFile(CSS_PATH, "utf8"),
		fs.readFile(SPEC_PATH, "utf8"),
	]);

	const cssTokens = parseCssTokenNames(cssRaw);
	const spec = JSON.parse(specRaw);
	const specTokens = extractSpecTokenNames(spec);

	const missingInCss = [...specTokens].filter((t) => !cssTokens.has(t));
	const missingInSpec = [...cssTokens].filter((t) => !specTokens.has(t));

	console.log("Token Validation Report");
	console.log("========================");
	console.log(`CSS tokens:  ${cssTokens.size}`);
	console.log(`Spec tokens: ${specTokens.size}`);
	console.log("");

	let hasProblems = false;

	if (missingInCss.length > 0) {
		hasProblems = true;
		console.log(`❌ Missing in CSS (${missingInCss.length}):`);
		for (const t of missingInCss.sort()) {
			console.log(`   - ${t}`);
		}
		console.log("");
	}

	if (missingInSpec.length > 0) {
		hasProblems = true;
		console.log(`❌ Missing in Spec (${missingInSpec.length}):`);
		for (const t of missingInSpec.sort()) {
			console.log(`   - ${t}`);
		}
		console.log("");
	}

	if (!hasProblems) {
		console.log("✅ All tokens in sync!");
	}

	process.exit(hasProblems ? 1 : 0);
}

main().catch((err) => {
	console.error(err?.stack ?? String(err));
	process.exit(1);
});
