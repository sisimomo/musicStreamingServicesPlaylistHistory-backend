import { Type } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "./page-info";

// Using a Thunk to allow circular dependencies
export function Page<Item>(classRefThunk: () => Type<Item>) {
  @ObjectType({ isAbstract: true })
  abstract class InnerPage {
    @Field(() => [classRefThunk()])
    items!: Item[];

    @Field(() => PageInfo)
    pageInfo!: PageInfo;
  }

  return InnerPage;
}
