import { Inject, Injectable } from "@nestjs/common";
import { Prisma, Song } from "@prisma/client";

import { PageQueryArgs, SongRepository } from "@core";

import { BaseUseCase } from "../base.use-case";

@Injectable()
export class SongUseCase implements BaseUseCase<Song, number> {
  constructor(@Inject("SongRepository") private repository: SongRepository) {}

  public async findById(select: Prisma.SongSelectScalar, id: number): Promise<Song> {
    return this.repository.findById(select, id);
  }

  public async findAllWithPagination(select: Prisma.SongSelectScalar, pageQueryArgs: PageQueryArgs): Promise<Song[]> {
    return this.repository.findAllPaginated(select, pageQueryArgs.skip, pageQueryArgs.take);
  }

  public async findAllByArtistIdPaginated(
    select: Prisma.SongSelectScalar,
    artistId: number,
    pageQueryArgs: PageQueryArgs,
  ): Promise<Song[]> {
    return this.repository.findAllByArtistIdPaginated(select, artistId, pageQueryArgs.skip, pageQueryArgs.take);
  }
}
