import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

import { createVitestTestConfig } from "./create-vitest-test-config";

export default defineConfig({
  test: { ...createVitestTestConfig("e2e"), setupFiles: ["./test-e2e/setup-tests.e2e.ts"] },
  plugins: [swc.vite()],
});
