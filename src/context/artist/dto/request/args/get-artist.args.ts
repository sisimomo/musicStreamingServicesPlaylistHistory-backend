import { ArgsType, Field } from "@nestjs/graphql";

import { globalIdToTableId } from "@core/utils/guid-transformers";

import { ArtistResponse } from "@context/artist/dto/response/artist.object";

@ArgsType()
export class GetArtistArgs {
  @Field(() => String)
  private id!: string;

  public get internalId(): number {
    return globalIdToTableId(this.id, ArtistResponse.__typename);
  }
}
