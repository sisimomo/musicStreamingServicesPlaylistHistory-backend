import { Module } from "@nestjs/common";

import { DatabaseModule } from "@infrastructure";

import { ArtistUseCase } from "./artist.use-case";

@Module({
  imports: [DatabaseModule],
  providers: [ArtistUseCase],
  exports: [ArtistUseCase],
})
export class ArtistUseCaseModule {}
