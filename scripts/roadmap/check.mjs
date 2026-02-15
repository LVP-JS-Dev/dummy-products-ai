import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const GENERATED = path.join(ROOT, "docs", "ROADMAP.generated.md");
const TMP = path.join(ROOT, "docs", ".ROADMAP.generated.tmp.md");

let execError = null;

try {
  try {
    execFileSync("node", ["scripts/roadmap/generate.mjs", "--out", TMP], {
      stdio: "inherit",
    });
  } catch (error) {
    execError = error;
  }

  if (!fs.existsSync(GENERATED)) {
    console.error("Roadmap generated file is missing. Run: pnpm roadmap:gen");
    process.exitCode = 1;
  } else {
    const current = fs.readFileSync(GENERATED, "utf8");
    const regenerated = fs.readFileSync(TMP, "utf8");

    if (current !== regenerated) {
      console.error(
        "Roadmap generated file is out of date. Run: pnpm roadmap:gen"
      );
      process.exitCode = 1;
    }
  }

  if (execError) {
    process.exitCode = 1;
  }
} finally {
  fs.rmSync(TMP, { force: true });
}
