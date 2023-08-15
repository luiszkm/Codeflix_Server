import { UniqueEntityId } from "@seedwork/domain/value-objects/unique-entity-id"
import { Entity } from "../../@seedwork/domain/entity/entity"

export interface RepositoryInterface<E extends Entity> {
  Insert(entity: E): Promise<void>
  FindByID(id: string | UniqueEntityId): Promise<E>
  FindAll(): Promise<E[]>
  Update(entity: E): Promise<void>
  Delete(id: string | UniqueEntityId): Promise<void>
}