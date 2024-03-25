import { Type } from "@nestjs/common";
import { ArgsType, Field } from "@nestjs/graphql";

import { globalIdToTableId } from "../guid-transformers";

export interface IdQueryArgs<ID> {
  dbId: ID;
}

export function BaseIdQueryArgs<Item>(classRef: Type<Item>) {
  @ArgsType()
  abstract class InnerBaseIdQueryArgs implements IdQueryArgs<number> {
    @Field(() => String)
    private id!: string;

    public get dbId(): number {
      return globalIdToTableId(this.id, classRef.name);
    }
  }

  return InnerBaseIdQueryArgs;
}
