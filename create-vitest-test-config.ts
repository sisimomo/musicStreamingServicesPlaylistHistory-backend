import { resolve } from "node:path";

import { loadEnv } from "vite";
import { InlineConfig } from "vitest";

export const createVitestTestConfig = (testingType: string): InlineConfig => {
  const inlineConfig: InlineConfig = {
    root: "./",
    globals: true,
    isolate: false,
    passWithNoTests: true,
    include: ["src/**/*.test.ts"],
    env: loadEnv("test", process.cwd(), ""),
    alias: {
      "@core": resolve(__dirname, "src/core"),
      "@infrastructure": resolve(__dirname, "src/infrastructure"),
      "@resolver": resolve(__dirname, "src/resolver"),
      "@use-case": resolve(__dirname, "src/use-case"),
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: `coverage/${testingType}`,
      include: ["src/**/*.ts"],
    },
  };
  if (testingType === "e2e") {
    inlineConfig.include = ["test-e2e/**/*.test.ts"];
    inlineConfig.hookTimeout = 50_000;
  }
  return inlineConfig;
};
