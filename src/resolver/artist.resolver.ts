import { Args, Query, Resolver } from "@nestjs/graphql";
import { ArtistUseCases } from "@use-case";
import { plainToClass } from "class-transformer";

import { ArtistOutput, ArtistQueryArgs, ArtistsQueryArgs } from "@core";

@Resolver(() => ArtistOutput)
export class ArtistResolver {
  constructor(private readonly service: ArtistUseCases) {}

  @Query(() => ArtistOutput)
  async artist(@Args() args: ArtistQueryArgs): Promise<ArtistOutput> {
    return plainToClass(ArtistOutput, await this.service.find(plainToClass(ArtistQueryArgs, args)));
  }

  @Query(() => [ArtistOutput])
  async artists(@Args() args: ArtistsQueryArgs): Promise<ArtistOutput[]> {
    const entities = await this.service.findAllWithPagination(args);
    return entities.map(entity => plainToClass(ArtistOutput, entity));
  }
}
