import { Field, ID, ObjectType } from "@nestjs/graphql";

import { ToGlobalId } from "../decorator/to-global-id";
import { SongPage } from "./paginated";
import { StreamingServiceItem } from "./streaming-service-item";

@ObjectType()
export class Artist extends StreamingServiceItem {
  @Field(() => ID)
  @ToGlobalId(Artist.name)
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  artworkUrl?: string;

  @Field(() => SongPage)
  songs!: SongPage;
}
