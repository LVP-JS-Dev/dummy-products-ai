import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tailwindcss(), tanstackRouter({}), react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 3001,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/Setup.ts",
    css: true,
    // `apps/web` uses two test runners:
    // - `tsx --test` for Node's `node:test` style unit tests (e.g. src/domain/*.test.ts)
    // - `vitest` for React/jsdom tests (src/test/*.test.tsx)
    // Prevent Vitest from picking up Node's `node:test` files and failing with
    // "No test suite found".
    include: ["src/test/**/*.test.tsx"],
  },
});
