export interface SelectScalar {
  [key: string]: boolean;
}

export interface Repository<Entity, ID, CreateInput, UpdateInput> {
  findAllPaginated(select: SelectScalar, skip: number, take: number): Promise<Entity[]>;

  findById(select: SelectScalar, id: ID): Promise<Entity>;

  create(createInput: CreateInput): Promise<Entity>;

  update(id: ID, updateInput: UpdateInput): Promise<Entity>;
}
