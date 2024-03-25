import { Song as SongEntity } from "@prisma/client";

import { Song, SongPage } from "@core";

import { EntityConverterService } from "./entity-converter.service";

export class SongEntityConverterService extends EntityConverterService<SongEntity, Song, SongPage>(Song, SongPage) {}
