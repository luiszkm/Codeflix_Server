import { NotFoundError } from "../../errors/in-memory/not-found.error"
import { Entity } from "../entity/entity"
import { InMemoryRepository } from "./in-memory.repository"


type StubEntityProps = {
  name: string
  description: string
}
class StubEntity extends Entity<StubEntityProps> { }
class StubInMemoryRepository extends InMemoryRepository<StubEntity> { }

describe("InMemoryRepository -  Unit test", () => {
  let repository: StubInMemoryRepository
  beforeEach(() => {
    repository = new StubInMemoryRepository()
  })
  it("should be able to create a new Entity", async () => {
    const entity = new StubEntity({
      name: "Stub",
      description: "Stub description",
    })
    await repository.Insert(entity)
    expect(repository.items).toHaveLength(1)
    expect(entity.toJSON()).toEqual(repository.items[0].toJSON())
  })
  it("should throw error when Entity not found", async () => {
    const id = '3f5c40f8-5147-44df-9a00-c20da340808c'
    await expect(repository.FindByID("fake id")).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake id")
    )
    await expect(repository.FindByID(id)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${id}`)
    )
  })
  it("should be able find a entity by id", async () => {
    const entity = new StubEntity({
      name: "Stub",
      description: "Stub description",
    })
    await repository.Insert(entity)
    let entityFound = await repository.FindByID(entity.id)
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON())

    entityFound = await repository.FindByID(entity.uniqueEntityId)
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON())

  })

  it("should be able to find all entities", async () => {
    const entity = new StubEntity({
      name: "Stub",
      description: "Stub description",
    })
    await repository.Insert(entity)
    const entities = await repository.FindAll()
    expect(entities).toHaveLength(1)
    expect(entities[0].toJSON()).toStrictEqual(entity.toJSON())
  })

  it("should throw error on update when Entity not found", async () => {
    let entity = new StubEntity({
      name: "Stub",
      description: "Stub description",
    })
    expect(repository.Update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${entity.id}`)
    )
  })
  it("should throw error on delete when Entity not found", async () => {
    let entity = new StubEntity({
      name: "Stub",
      description: "Stub description",
    })
    expect(repository.Delete("fake id")).rejects.toThrow(
      new NotFoundError(`Entity not found using ID fake id`)
    )
    expect(repository.Delete(entity.id)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${entity.id}`)
    )
    expect(repository.Delete(entity.uniqueEntityId)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${entity.id}`)
    )
  })
  it("should be able to update a entity by id", async () => {
    const entity = new StubEntity({
      name: "Stub",
      description: "Stub description",
    })
    await repository.Insert(entity)
    const entityUpdated = new StubEntity({
      name: "Stub updated",
      description: "Stub description updated"
    },
      entity.uniqueEntityId
    )
    await repository.Update(entityUpdated)
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON())
  })

  it("should be able to delete a entity by id", async () => {
    const entity = new StubEntity({
      name: "Stub",
      description: "Stub description",
    })
    await repository.Insert(entity)
    await repository.Delete(entity.id)
    expect(repository.items).toHaveLength(0)
    await repository.Insert(entity)
    await repository.Delete(entity.uniqueEntityId)
    expect(repository.items).toHaveLength(0)
  })
})