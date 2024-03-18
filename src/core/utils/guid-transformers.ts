export const toGlobalId = (typename: string, id: number): string => {
  return Buffer.from(`${typename}:${id}`).toString("base64");
};

export const globalIdToTypenameAndId = (globalId: string): { typename: string; id: number } => {
  const buffer = Buffer.from(globalId, "base64");
  const [typename, id] = buffer.toString().split(":");
  return { typename, id: Number.parseInt(id, 10) };
};
