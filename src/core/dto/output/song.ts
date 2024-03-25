import { Field, ID, ObjectType } from "@nestjs/graphql";

import { ToGlobalId } from "../decorator/to-global-id";
import { ArtistPage } from "./paginated";
import { StreamingServiceItem } from "./streaming-service-item";

@ObjectType()
export class Song extends StreamingServiceItem {
  @Field(() => ID)
  @ToGlobalId(Song.name)
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  artworkUrl?: string;

  @Field(() => ArtistPage)
  artists!: ArtistPage;
}
