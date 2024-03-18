import { Field, ID, ObjectType } from "@nestjs/graphql";

import { GlobalId } from "@core/decorator/global-id";

@ObjectType(ArtistResponseDto.__typename)
export class ArtistResponseDto {
  static __typename: string = "Artist";

  @Field(() => ID)
  @GlobalId(ArtistResponseDto.__typename)
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
  streamingServiceId!: string;
}
