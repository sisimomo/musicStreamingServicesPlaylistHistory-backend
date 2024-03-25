import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PrismaArtistRepository, PrismaService, PrismaSongRepository } from "./prisma";

@Module({
  providers: [
    ConfigService,
    PrismaService,
    {
      provide: "ArtistRepository",
      useClass: PrismaArtistRepository,
    },
    {
      provide: "SongRepository",
      useClass: PrismaSongRepository,
    },
  ],
  exports: ["ArtistRepository", "SongRepository"],
})
export class DatabaseModule {}
