import { Entity } from "@seedwork/domain/entity/entity";
import { RepositoryInterface } from "./repository-contracts";
import { UniqueEntityId } from "@seedwork/domain/value-objects/unique-entity-id";
import { NotFoundError } from "../errors/in-memory/not-found.error";


export default abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E>{
 public items: E[] = [];

  async Insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async FindByID(id: string | UniqueEntityId): Promise<E> {
    const _id: string = `${id}`    
    return this._get(_id);
  }
  async FindAll(): Promise<E[]> {
    return this.items;
  }
  async Update(entity: E): Promise<void> {
   await this._get(entity.id)
    const indexFound = this.items.findIndex((item) => item.id === entity.id);
    this.items[indexFound] = entity;
  }
  async Delete(id: string | UniqueEntityId): Promise<void> {
    const _id: string = `${id}`
    await this._get(_id)
    const indexFound = this.items.findIndex((item) => item.id === _id);
    this.items.splice(indexFound, 1);
  }

  protected async _get(id: string): Promise<E> {
    const item = this.items.find((i) => i.id === id);
    if (!item) throw new NotFoundError(`Entity not found using ID ${id}`);
    return item;
  }

}