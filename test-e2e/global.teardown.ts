import { stopDbContainer } from "./setup-tests.e2e";

module.exports = async function () {
  await stopDbContainer();
};
