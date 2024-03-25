import { Module } from "@nestjs/common";

import { DatabaseModule } from "@infrastructure";

import { SongUseCase } from "./song.use-case";

@Module({
  imports: [DatabaseModule],
  providers: [SongUseCase],
  exports: [SongUseCase],
})
export class SongUseCaseModule {}
