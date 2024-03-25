import { PageQueryArgs, SelectScalar } from "@core";

export interface BaseUseCase<Entity, ID> {
  findById(select: SelectScalar, id: ID): Promise<Entity>;

  findAllWithPagination(select: SelectScalar, getArtistsArgs: PageQueryArgs): Promise<Entity[]>;
}
