import { Args, Parent, ResolveProperty, Resolver } from "@nestjs/graphql";
import { Artist as ArtistEntity } from "@prisma/client";

import { Artist, ArtistPage, globalIdToTableId, PageQueryArgs, SelectScalar, Song, SongPage } from "@core";

import { ArtistUseCase, SongUseCase } from "@use-case";

import { ArtistIdQueryArgs } from "../core/dto/args/artist.id.query.args";
import { BaseResolver } from "./base.resolver";
import { ExtractSelect } from "./extract-select.decorator";
import { ArtistEntityConverterService } from "./page-converter/artist-entity-converter.service";
import { SongEntityConverterService } from "./page-converter/song-entity-converter.service";

@Resolver(() => Artist)
export class ArtistResolver extends BaseResolver<ArtistEntity, ArtistIdQueryArgs, Artist, ArtistPage>(
  Artist,
  ArtistIdQueryArgs,
  ArtistPage,
) {
  constructor(
    artistUseCases: ArtistUseCase,
    artistEntityConverterService: ArtistEntityConverterService,
    private readonly songUseCases: SongUseCase,
    private readonly songEntityConverterService: SongEntityConverterService,
  ) {
    super(artistUseCases, artistEntityConverterService);
  }

  @ResolveProperty("songs", () => SongPage)
  public async resolveSongs(
    @Parent() parent: Artist,
    @Args() args: PageQueryArgs,
    @ExtractSelect({ field: "items", itemClassRef: Song }) select: SelectScalar,
  ): Promise<SongPage> {
    const entities = await this.songUseCases.findAllByArtistIdPaginated(
      select,
      globalIdToTableId(parent.id, Artist.name),
      args,
    );
    return this.songEntityConverterService.toPage(entities, args);
  }
}
