// Graphql Responses must have a globally unique ID to enables simple caching and object lookups see:
// https://graphql.org/learn/global-object-identification/

export class InvalidTypename extends Error {
  constructor(
    public actualTypename: string,
    public expectedTypename: string,
  ) {
    super(
      `The query expected an ID for the typename "${expectedTypename}", but received an ID for the typename "${actualTypename}" instead.`,
    );
  }
}

export const toGlobalId = (typename: string, id: number): string => {
  return Buffer.from(`${typename}:${id}`).toString("base64");
};

export const globalIdToTypenameAndId = (globalId: string): { typename: string; id: number } => {
  const buffer = Buffer.from(globalId, "base64");
  const [typename, id] = buffer.toString().split(":");
  return { typename, id: Number.parseInt(id, 10) };
};

export const globalIdToTableId = (globalId: string, expectedTypename: string): number => {
  const { typename, id } = globalIdToTypenameAndId(globalId);
  validateIdTypename(typename, expectedTypename);
  return id;
};

const validateIdTypename = (actualTypename: string, expectedTypename: string): void => {
  if (actualTypename !== expectedTypename) {
    throw new InvalidTypename(actualTypename, expectedTypename);
  }
};
