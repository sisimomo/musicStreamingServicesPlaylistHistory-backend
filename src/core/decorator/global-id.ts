import { Transform } from "class-transformer";

import { toGlobalId } from "@core/utils/guid-transformers";

export function GlobalId(type: string): PropertyDecorator {
  return Transform(({ value }) => toGlobalId(type, value as number), { toClassOnly: true });
}
