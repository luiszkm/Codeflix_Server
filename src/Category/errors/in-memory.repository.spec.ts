import { UniqueEntityId } from "../../@seedwork/domain/value-objects/unique-entity-id";
import { Entity } from "../../@seedwork/domain/entity/entity";
import InMemoryRepository from "../repository/in-memory.respository";
import { NotFoundError } from "./in-memory/not-found.error";
import e from "express";

type StubEntityProps = {
  // id?: string | UniqueEntityId;
  name: string;
  description?: string;
}
class StubEntity extends Entity<StubEntityProps> { }
class StubInMemoryRepository extends InMemoryRepository<StubEntity> { }

describe('InMemoryRepository Unit Test', () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => {
    repository = new StubInMemoryRepository();
  })
  it('should be able to insert a new entity', async () => {
    const entity = new StubEntity({ name: 'test', description: 'test' });
    await repository.Insert(entity);
    const result = repository.items[0].toJSON();
    expect(entity.toJSON()).toStrictEqual(result);
  })
  it('should not be able to find a entity by id, throw error entity notfound', async () => {
    const id = new UniqueEntityId('82eb823f-b26c-476b-97ad-8fbf954a80a7');
    await expect(repository.FindByID('fake id')).rejects.toThrow(new NotFoundError('Entity not found using ID fake id'));
    await expect(repository.FindByID(id)).rejects.toThrow(new NotFoundError(`Entity not found using ID 82eb823f-b26c-476b-97ad-8fbf954a80a7`));
  })
  it('should be able to find a entity by id', async () => {
    const entity = new StubEntity({ name: 'test', description: 'test' });
    await repository.Insert(entity);
    {
      const result = await repository.FindByID(entity.id);
      expect(entity.toJSON()).toStrictEqual(result.toJSON());
    }
    {
      const result = await repository.FindByID(entity.uniqueEntityId);
      expect(entity.toJSON()).toStrictEqual(result.toJSON());
    }
  })
  it('should be able to find all entities ', async () => {
    const entity = new StubEntity({ name: 'test', description: 'test' });
    await repository.Insert(entity);
    const result = await repository.FindAll();
    expect(entity.toJSON()).toStrictEqual(result[0].toJSON());
  })
  it('should not be able to update a entity, throw error entity not found', async () => {
    const entity = new StubEntity({ name: 'test', description: 'test' });
    expect(repository.Update(entity)).rejects.toThrow(new NotFoundError(`Entity not found using ID ${entity.id}`));
  })

  it('should be able to update a entity', async () => {
    const entity = new StubEntity({ name: 'test', description: 'test' });
    await repository.Insert(entity);
    const entityUpdated = new StubEntity({ name: 'test updated', description: 'test updated' }, entity.uniqueEntityId);
    await repository.Update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());

  })

  it('should not be able to delete a entity, throw error entity not found', async () => {
    {
      const id = new UniqueEntityId('82eb823f-b26c-476b-97ad-8fbf954a80a7');
      expect(repository.Delete(id)).rejects.toThrow(new NotFoundError(`Entity not found using ID ${id}`));
    }
    {
      const id = " invalid id";
      expect(repository.Delete(id)).rejects.toThrow(new NotFoundError(`Entity not found using ID ${id}`));
    }
  })

  it('should be able to delete a entity', async () => {
    const entity = new StubEntity({ name: 'test', description: 'test' });
    await repository.Insert(entity);
    await repository.Delete(entity.id);
    expect(repository.items).toHaveLength(0);
    await repository.Insert(entity);
    await repository.Delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
  })

});