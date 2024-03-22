export interface Repository<Entity, CreateEntity, UpdateEntity> {
  findAllWithPagination(skip: number, take: number): Promise<Entity[]>;

  findById(id: number): Promise<Entity>;

  create(entity: CreateEntity): Promise<Entity>;

  update(id: number, entity: UpdateEntity): Promise<Entity>;
}
