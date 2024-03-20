import { Module } from "@nestjs/common";

import { PrismaModule } from "@core/database/prisma.module";

import { ArtistRepository } from "./artist.repository";
import { ArtistResolver } from "./artist.resolver";
import { ArtistService } from "./artist.service";

@Module({
  imports: [PrismaModule],
  providers: [ArtistResolver, ArtistRepository, ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
