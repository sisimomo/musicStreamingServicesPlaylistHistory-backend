import { Transform } from "class-transformer";

import { toGlobalId } from "../guid-transformers";

export function ToGlobalId(type: string): PropertyDecorator {
  return Transform(({ value }) => toGlobalId(type, value as number), { toClassOnly: true });
}
