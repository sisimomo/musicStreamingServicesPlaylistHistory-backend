import { Field, ID, ObjectType } from "@nestjs/graphql";

import { ToGlobalId } from "../decorator/to-global-id";

@ObjectType(ArtistOutput.__typename)
export class ArtistOutput {
  static __typename: string = "Artist";

  @Field(() => ID)
  @ToGlobalId(ArtistOutput.__typename)
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  artworkUrl?: string;

  @Field(() => String)
  streamingService!: string;

  @Field()
  streamingServiceInternalId!: string;
}
