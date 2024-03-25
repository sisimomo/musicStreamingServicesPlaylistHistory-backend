import { Transform } from "class-transformer";

import { toGlobalId } from "../guid-transformers";

export function ToGlobalId(type: string): PropertyDecorator {
  return Transform(({ value }) => transformValue(type, value), { toClassOnly: true });
}

const transformValue = (type: string, value: unknown): string => {
  return typeof value === "number" && !Number.isNaN(value) ? toGlobalId(type, value) : (value as string);
};
