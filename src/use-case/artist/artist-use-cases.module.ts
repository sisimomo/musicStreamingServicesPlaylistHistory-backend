import { Module } from "@nestjs/common";

import { DatabaseModule } from "@infrastructure";

import { ArtistUseCases } from "./artist.use-case";

@Module({
  imports: [DatabaseModule],
  providers: [ArtistUseCases],
  exports: [ArtistUseCases],
})
export class ArtistUseCasesModule {}
