import { Type } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { PageInfo, PageQueryArgs } from "@core";

export interface IEntityConverterService<Entity, Item, Page> {
  toPage(entities: Entity[], pageQueryArgs: PageQueryArgs): Page;
  toItem(entity: Entity): Item;
}

export function EntityConverterService<Entity, Item, Page>(itemClassRef: Type<Item>, pageClassRef: Type<Page>) {
  abstract class InnerEntityConverterService implements IEntityConverterService<Entity, Item, Page> {
    public toPage(entities: Entity[], pageQueryArgs: PageQueryArgs): Page {
      return this.fromItemsToPage(
        this.toItems(entities),
        plainToInstance(PageInfo, {
          skipped: pageQueryArgs.skip,
          took: pageQueryArgs.take,
        }),
      );
    }

    private fromItemsToPage(items: Item[], pageInfo: PageInfo): Page {
      return plainToInstance(pageClassRef, {
        items,
        pageInfo,
      });
    }

    private toItems(entities: Entity[]): Item[] {
      return entities.map(entity => this.toItem(entity));
    }

    public toItem(entity: Entity): Item {
      return plainToInstance(itemClassRef, entity);
    }
  }

  return InnerEntityConverterService;
}
