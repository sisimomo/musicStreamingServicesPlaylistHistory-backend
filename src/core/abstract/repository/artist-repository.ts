import { Artist, type Prisma } from "@prisma/client";

import { Repository, SelectScalar } from "../repository";

export interface ArtistRepository
  extends Repository<Artist, number, Prisma.ArtistCreateInput, Prisma.ArtistUpdateInput> {
  findAllBySongIdPaginated(select: SelectScalar, artistId: number, skip: number, take: number): Promise<Artist[]>;
}
