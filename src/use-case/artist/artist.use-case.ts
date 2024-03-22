import { Inject, Injectable } from "@nestjs/common";
import { Artist } from "@prisma/client";

import { ArtistQueryArgs, ArtistRepository, ArtistsQueryArgs } from "@core";

@Injectable()
export class ArtistUseCases {
  constructor(@Inject("ArtistRepository") private repository: ArtistRepository) {}

  public async find(getArtistArgs: ArtistQueryArgs): Promise<Artist> {
    return this.repository.findById(getArtistArgs.internalId);
  }

  public async findAllWithPagination(getArtistsArgs: ArtistsQueryArgs): Promise<Artist[]> {
    return this.repository.findAllWithPagination(getArtistsArgs.skip, getArtistsArgs.take);
  }
}
