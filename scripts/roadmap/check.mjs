import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const GENERATED = path.join(ROOT, "docs", "ROADMAP.generated.md");
const TMP = path.join(ROOT, "docs", ".ROADMAP.generated.tmp.md");

execFileSync("node", ["scripts/roadmap/generate.mjs", "--out", TMP], {
  stdio: "inherit",
});

const current = fs.readFileSync(GENERATED, "utf8");
const regenerated = fs.readFileSync(TMP, "utf8");

if (current !== regenerated) {
  console.error("Roadmap generated file is out of date. Run: pnpm roadmap:gen");
  process.exit(1);
}

fs.unlinkSync(TMP);
