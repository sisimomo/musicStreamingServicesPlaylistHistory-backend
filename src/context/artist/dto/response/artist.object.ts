import { Field, ID, ObjectType } from "@nestjs/graphql";

import { ToGlobalId } from "@core/decorator/to-global-id";

@ObjectType(ArtistResponse.__typename)
export class ArtistResponse {
  static __typename: string = "Artist";

  @Field(() => ID)
  @ToGlobalId(ArtistResponse.__typename)
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
