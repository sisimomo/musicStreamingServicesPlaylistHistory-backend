import { Artist, type Prisma } from "@prisma/client";

import { Repository } from "@core";

export interface ArtistRepository extends Repository<Artist, Prisma.ArtistCreateInput, Prisma.ArtistUpdateInput> {}
