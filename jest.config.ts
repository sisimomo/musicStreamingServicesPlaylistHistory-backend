import { createJestTestConfig } from "./create-jest-test-config";

export default {
  ...createJestTestConfig("(unit|e2e)"),
};
