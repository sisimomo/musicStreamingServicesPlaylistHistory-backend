import { Module } from "@nestjs/common";

import { ArtistUseCasesModule } from "@use-case";

import { ArtistResolver } from "./artist.resolver";

@Module({
  imports: [ArtistUseCasesModule],
  providers: [ArtistResolver],
})
export class ResolverModule {}
