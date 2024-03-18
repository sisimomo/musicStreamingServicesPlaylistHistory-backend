import { createEnumObject } from "@src/drizzle/drizzle.utils";

describe("DrizzleUtils", () => {
  const Color = ["Red", "Green", "Blue"] as const;
  describe("run", () => {
    it("Every element of the original array should present", () => {
      const ColorEnum = createEnumObject(Color);
      expect(ColorEnum.Red).toEqual("Red");
      expect(ColorEnum.Green).toEqual("Green");
      expect(ColorEnum.Blue).toEqual("Blue");
    });
  });
});
