import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const nativePackagePath = resolve("apps/native/package.json");

if (!existsSync(nativePackagePath)) {
  console.log("No native workspace found at apps/native; skipping dev:native.");
  process.exit(0);
}

const result = spawnSync("pnpm", ["exec", "turbo", "-F", "native", "dev"], {
  stdio: "inherit",
});

if (typeof result.status === "number") {
  process.exit(result.status);
}

process.exit(1);
