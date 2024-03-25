import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PageInfo {
  @Field(() => Int)
  skipped!: number;

  @Field(() => Int)
  took!: number;
}
