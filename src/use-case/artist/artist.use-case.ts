import { Inject, Injectable } from "@nestjs/common";
import { Artist, Prisma } from "@prisma/client";

import { ArtistRepository, PageQueryArgs } from "@core";

import { BaseUseCase } from "../base.use-case";

@Injectable()
export class ArtistUseCase implements BaseUseCase<Artist, number> {
  constructor(@Inject("ArtistRepository") private repository: ArtistRepository) {}

  public async findById(select: Prisma.ArtistSelectScalar, id: number): Promise<Artist> {
    return this.repository.findById(select, id);
  }

  public async findAllWithPagination(
    select: Prisma.ArtistSelectScalar,
    getArtistsArgs: PageQueryArgs,
  ): Promise<Artist[]> {
    return this.repository.findAllPaginated(select, getArtistsArgs.skip, getArtistsArgs.take);
  }

  public async findAllBySongIdPaginated(
    select: Prisma.ArtistSelectScalar,
    artistId: number,
    pageQueryArgs: PageQueryArgs,
  ): Promise<Artist[]> {
    return this.repository.findAllBySongIdPaginated(select, artistId, pageQueryArgs.skip, pageQueryArgs.take);
  }
}
