import { Args, Parent, ResolveProperty, Resolver } from "@nestjs/graphql";
import { Song as SongEntity } from "@prisma/client";

import { ArtistPage, globalIdToTypenameAndId, PageQueryArgs, SelectScalar, Song, SongPage } from "@core";

import { ArtistUseCase, SongUseCase } from "@use-case";

import { SongIdQueryArgs } from "../core/dto/args/song.id.query.args";
import { BaseResolver } from "./base.resolver";
import { ExtractSelect } from "./extract-select.decorator";
import { ArtistEntityConverterService } from "./page-converter/artist-entity-converter.service";
import { SongEntityConverterService } from "./page-converter/song-entity-converter.service";

@Resolver(() => Song)
export class SongResolver extends BaseResolver<SongEntity, SongIdQueryArgs, Song, SongPage>(
  Song,
  SongIdQueryArgs,
  SongPage,
) {
  constructor(
    songUseCases: SongUseCase,
    songEntityConverterService: SongEntityConverterService,
    private readonly artistUseCases: ArtistUseCase,
    private readonly artistEntityConverterService: ArtistEntityConverterService,
  ) {
    super(songUseCases, songEntityConverterService);
  }

  @ResolveProperty("artists", () => ArtistPage)
  public async resolveSongs(
    @Parent() parent: Song,
    @Args() args: PageQueryArgs,
    @ExtractSelect({ field: "items", itemClassRef: Song }) select: SelectScalar,
  ): Promise<ArtistPage> {
    const entities = await this.artistUseCases.findAllBySongIdPaginated(
      select,
      globalIdToTypenameAndId(parent.id).id,
      args,
    );
    return this.artistEntityConverterService.toPage(entities, args);
  }
}
