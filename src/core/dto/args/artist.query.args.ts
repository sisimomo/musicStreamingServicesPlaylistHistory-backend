import { ArgsType, Field } from "@nestjs/graphql";

import { globalIdToTableId } from "../guid-transformers";
import { ArtistOutput } from "../output/artist.output";

@ArgsType()
export class ArtistQueryArgs {
  @Field(() => String)
  private id!: string;

  public get internalId(): number {
    return globalIdToTableId(this.id, ArtistOutput.__typename);
  }
}
