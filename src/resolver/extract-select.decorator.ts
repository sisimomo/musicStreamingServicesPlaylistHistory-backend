import { createParamDecorator, ExecutionContext, Type } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql/type";

import { SelectScalar } from "@core";

interface ExtractSelectOptions {
  field?: string;
  itemClassRef: Type;
}

export const ExtractSelect = createParamDecorator((options: ExtractSelectOptions, ctx: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(ctx);
  const graphqlResolveInfo: GraphQLResolveInfo = gqlContext.getInfo();
  return graphqlResolveInfoToSelectScalar(graphqlResolveInfo, options.field ?? "", options.itemClassRef);
});

const graphqlResolveInfoToSelectScalar = (
  graphqlResolveInfo: GraphQLResolveInfo,
  field: string,
  itemClassRef: Type,
): SelectScalar => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return new PrismaSelect(graphqlResolveInfo).valueOf(field, itemClassRef.name).select as SelectScalar;
};
