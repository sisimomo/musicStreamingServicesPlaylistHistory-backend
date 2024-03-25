import { Module } from "@nestjs/common";

import { ArtistUseCaseModule, SongUseCaseModule } from "@use-case";

import { ArtistResolver } from "./artist.resolver";
import { ArtistEntityConverterService } from "./page-converter/artist-entity-converter.service";
import { SongEntityConverterService } from "./page-converter/song-entity-converter.service";
import { SongResolver } from "./song.resolver";

@Module({
  imports: [ArtistUseCaseModule, SongUseCaseModule],
  providers: [ArtistResolver, ArtistEntityConverterService, SongResolver, SongEntityConverterService],
})
export class ResolverModule {}
