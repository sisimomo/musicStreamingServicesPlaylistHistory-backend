import { Injectable } from "@nestjs/common";
import { Artist } from "@prisma/client";

import { ArtistRepository } from "@context/artist/artist.repository";
import { GetArtistArgs } from "@context/artist/dto/request/args/get-artist.args";
import { GetArtistsArgs } from "@context/artist/dto/request/args/get-artists.args";

@Injectable()
export class ArtistService {
  constructor(private repository: ArtistRepository) {}

  public async find(getArtistArgs: GetArtistArgs): Promise<Artist> {
    return this.repository.findById(getArtistArgs.internalId);
  }

  public async findAll(getArtistsArgs: GetArtistsArgs): Promise<Artist[]> {
    return this.repository.findAll(getArtistsArgs);
  }
}
