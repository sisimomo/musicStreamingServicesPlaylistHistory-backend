import { Module } from "@nestjs/common";

import { ArtistRepository } from "./artist.repository";
import { ArtistResolver } from "./artist.resolver";

@Module({
  providers: [ArtistResolver, ArtistRepository],
})
export class ArtistModule {}
