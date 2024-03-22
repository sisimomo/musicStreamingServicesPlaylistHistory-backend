import { Logger } from "@nestjs/common";
import { mock, MockProxy } from "vitest-mock-extended";

import { HealthController } from "./health.controller";

describe("HealthController", () => {
  let healthController: HealthController;
  let logger: MockProxy<Logger>;

  beforeEach(() => {
    logger = mock<Logger>();
    healthController = new HealthController(logger);
  });

  describe("run", () => {
    it("should return is healthy", () => {
      expect(healthController.run()).toEqual({ status: "ok" });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(logger.log).toHaveBeenCalledTimes(1);
    });
  });
});
