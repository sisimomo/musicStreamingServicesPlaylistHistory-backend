import { Injectable } from "@nestjs/common";
import { Artist } from "@prisma/client";

import { PrismaService } from "@core/database/prisma.service";

import { GetArtistsArgs } from "@context/artist/dto/request/args/get-artists.args";

@Injectable()
export class ArtistRepository {
  constructor(private db: PrismaService) {}

  public async findById(id: number): Promise<Artist> {
    return this.db.artist.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  public async findAll(artistsArgs: GetArtistsArgs): Promise<Artist[]> {
    return this.db.artist.findMany({
      skip: artistsArgs.skip,
      take: artistsArgs.take,
    });
  }
}
