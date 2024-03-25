import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ isAbstract: true })
export abstract class StreamingServiceItem {
  @Field(() => String)
  streamingService!: string;

  @Field()
  streamingServiceInternalId!: string;
}
