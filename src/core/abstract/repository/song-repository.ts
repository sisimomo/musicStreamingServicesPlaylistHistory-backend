import { type Prisma, Song } from "@prisma/client";

import { Repository, SelectScalar } from "../repository";

export interface SongRepository extends Repository<Song, number, Prisma.SongCreateInput, Prisma.SongUpdateInput> {
  findAllByArtistIdPaginated(select: SelectScalar, artistId: number, skip: number, take: number): Promise<Song[]>;
}
