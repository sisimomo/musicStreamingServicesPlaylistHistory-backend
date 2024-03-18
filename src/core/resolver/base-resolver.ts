import { InvalidTypename } from "@core/resolver/exception/invalid-typename";
import { globalIdToTypenameAndId } from "@core/utils/guid-transformers";

export abstract class BaseResolver {
  protected constructor() {}

  protected globalIdToTableId(globalId: string, expectedTypename: string): number {
    const { typename, id } = globalIdToTypenameAndId(globalId);
    this.validateIdTypename(typename, expectedTypename);
    return id;
  }

  private validateIdTypename(actualTypename: string, expectedTypename: string): void {
    if (actualTypename !== expectedTypename) {
      throw new InvalidTypename(actualTypename, expectedTypename);
    }
  }
}
