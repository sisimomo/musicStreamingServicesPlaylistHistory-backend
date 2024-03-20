import { Args, Query, Resolver } from "@nestjs/graphql";
import { plainToClass } from "class-transformer";

import { ArtistService } from "@context/artist/artist.service";
import { GetArtistArgs } from "@context/artist/dto/request/args/get-artist.args";
import { GetArtistsArgs } from "@context/artist/dto/request/args/get-artists.args";
import { ArtistResponse } from "@context/artist/dto/response/artist.object";

@Resolver(() => ArtistResponse)
export class ArtistResolver {
  constructor(private readonly service: ArtistService) {}

  @Query(() => ArtistResponse)
  async artist(@Args() args: GetArtistArgs): Promise<ArtistResponse> {
    return plainToClass(ArtistResponse, await this.service.find(plainToClass(GetArtistArgs, args)));
  }

  @Query(() => [ArtistResponse])
  async artists(@Args() args: GetArtistsArgs): Promise<ArtistResponse[]> {
    const entities = await this.service.findAll(args);
    return entities.map(entity => plainToClass(ArtistResponse, entity));
  }
}
