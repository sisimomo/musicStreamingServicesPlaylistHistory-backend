import { startAndInitializeDbContainer } from "./setup-tests.e2e";

module.exports = async function () {
  await startAndInitializeDbContainer();
};
