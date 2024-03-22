import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PrismaArtistRepository, PrismaService } from "./prisma";

@Module({
  providers: [
    ConfigService,
    PrismaService,
    {
      provide: "ArtistRepository",
      useClass: PrismaArtistRepository,
    },
  ],
  exports: ["ArtistRepository"],
})
export class DatabaseModule {}
