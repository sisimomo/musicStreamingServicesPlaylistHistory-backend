import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import * as schema from "@src/drizzle/schema";
import { Artist, artist } from "@src/drizzle/schema";

import { ArtistsArgs } from "@context/artist/dto/artist.args";

@Injectable()
export class ArtistRepository {
  constructor(@Inject("db") private db: NodePgDatabase<typeof schema>) {}

  async findOneById(id: number): Promise<Artist> {
    const entity = await this.db.query.artist.findFirst({
      where: eq(artist.id, id),
    });
    if (!entity) {
      throw new NotFoundException(id);
    }
    return entity;
  }

  async findAll(artistsArgs: ArtistsArgs): Promise<Artist[]> {
    return this.db.query.artist.findMany({
      offset: artistsArgs.skip,
      limit: artistsArgs.take,
    });
  }
}
