import { Artist as ArtistEntity } from "@prisma/client";

import { Artist, ArtistPage } from "@core";

import { EntityConverterService } from "./entity-converter.service";

export class ArtistEntityConverterService extends EntityConverterService<ArtistEntity, Artist, ArtistPage>(
  Artist,
  ArtistPage,
) {}
