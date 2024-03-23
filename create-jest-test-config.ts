import type { Config } from "jest";

import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

export const createJestTestConfig = (testingType: string): Config => {
  const config: Config = {
    transform: {
      "^.+\\.(t|j)s$": [
        "@swc/jest",
        {
          jsc: {
            target: "es2022",
          },
        },
      ],
    },
    testEnvironment: "node",
    cacheDirectory: ".tmp/jestCache",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts"],
    clearMocks: true,
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    testMatch: ["<rootDir>/src/**/*.test.ts"],
  };
  if (testingType === "e2e") {
    config.testMatch = ["<rootDir>/test-e2e/**/*.test.ts"];
    config.globalSetup = "<rootDir>test-e2e/global.setup.ts";
    config.globalTeardown = "<rootDir>test-e2e/global.teardown.ts";
  }
  return config;
};
