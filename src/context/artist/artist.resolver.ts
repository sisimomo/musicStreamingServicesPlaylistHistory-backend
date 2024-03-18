import { Inject, Logger } from "@nestjs/common";
import { Args, Info, Query, Resolver } from "@nestjs/graphql";
import { plainToClass } from "class-transformer";
import { GraphQLResolveInfo } from "graphql/type";

import { BaseResolver } from "@core/resolver/base-resolver";

import { ArtistRepository } from "@context/artist/artist.repository";
import { ArtistsArgs } from "@context/artist/dto/artist.args";
import { ArtistResponseDto } from "@context/artist/dto/artist-response-dto.object";

@Resolver(() => ArtistResponseDto)
export class ArtistResolver extends BaseResolver {
  constructor(
    private readonly artistsService: ArtistRepository,
    @Inject(Logger) private readonly logger: Logger,
  ) {
    super();
  }

  @Query(() => ArtistResponseDto)
  async artist(@Info() graphQLResolveInfo: GraphQLResolveInfo, @Args("id") id: string): Promise<ArtistResponseDto> {
    const artist = await this.artistsService.findOneById(this.globalIdToTableId(id, ArtistResponseDto.__typename));
    this.logger.log(graphQLResolveInfo);
    return plainToClass(ArtistResponseDto, artist);
  }

  @Query(() => [ArtistResponseDto])
  async artists(@Args() artistsArgs: ArtistsArgs): Promise<ArtistResponseDto[]> {
    const artists = await this.artistsService.findAll(artistsArgs);
    return artists.map(artist => plainToClass(ArtistResponseDto, artist));
  }
}
