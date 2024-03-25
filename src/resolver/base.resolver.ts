import { Type } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { plainToInstance } from "class-transformer";

import { IdQueryArgs, PageQueryArgs, SelectScalar } from "@core";

import { BaseUseCase } from "../use-case/base.use-case";
import { ExtractSelect } from "./extract-select.decorator";
import { IEntityConverterService } from "./page-converter/entity-converter.service";

export function BaseResolver<Entity, GenericIdQueryArgs extends IdQueryArgs<number>, Item, Page>(
  itemClassRef: Type<Item>,
  idQueryArgsClassRef: Type<GenericIdQueryArgs>,
  pageClassRef: Type<Page>,
) {
  @Resolver({ isAbstract: true })
  abstract class InnerBaseResolver {
    protected constructor(
      private readonly baseUseCase: BaseUseCase<Entity, number>,
      private readonly entityConverterService: IEntityConverterService<Entity, Item, Page>,
    ) {}

    @Query(() => itemClassRef, {
      name: toCamelCase(itemClassRef.name),
    })
    public async find(
      @Args({
        type: () => idQueryArgsClassRef,
      })
      args: GenericIdQueryArgs,
      @ExtractSelect({ itemClassRef }) select: SelectScalar,
    ): Promise<Item> {
      args = plainToInstance(idQueryArgsClassRef, args);
      return this.entityConverterService.toItem(await this.baseUseCase.findById(select, args.dbId));
    }

    @Query(() => pageClassRef, {
      name: `${toCamelCase(itemClassRef.name)}s`,
    })
    public async findAllWithPagination(
      @Args() args: PageQueryArgs,
      @ExtractSelect({ field: "items", itemClassRef }) select: SelectScalar,
    ): Promise<Page> {
      const entities = await this.baseUseCase.findAllWithPagination(select, args);
      return this.entityConverterService.toPage(entities, args);
    }
  }
  return InnerBaseResolver;
}

function toCamelCase(str: string) {
  return str.replaceAll(/^\w|[A-Z]|\b\w|\s+/g, function (match, index) {
    if (+match === 0) return "";
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
