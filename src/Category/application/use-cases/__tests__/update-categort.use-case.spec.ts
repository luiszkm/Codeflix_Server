import { UpdateCategoryUseCase } from "../update-category.use-case"
import { CategoryInMemoryRepository } from "Category/infra/repository/category-in-memory.repository"
import { Category } from "Category/domain/entity/category"

describe('UpdateCategoryUseCase - unit test', () => {
  let useCase: UpdateCategoryUseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    useCase = new UpdateCategoryUseCase(repository)
  })
  it('should throws error when entity not found', async () => {
    const id = "fake id"
    await expect(() => {
      useCase.Execute({ id: id, name: 'any_name' })
    }).rejects
  })

  it('should update entity', async () => {
    const spy = jest.spyOn(repository, 'Update')
    const entity = new Category({ name: 'any_name', })
    repository.items = [entity]
    let output = await useCase.Execute({ id: entity.id, name: 'new_name' })

    expect(spy).toBeCalledTimes(1)
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'new_name',
      description: null,
      is_active: true,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    })
  })
  it('should update entity with input value and update empty', async () => {
    const spy = jest.spyOn(repository, 'Update')
    const entity = new Category({ name: 'any_name',description:'any_description' })
    repository.items = [entity]
    let output = await useCase.Execute({ id: entity.id, name: 'new_name' })

    expect(spy).toBeCalledTimes(1)
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'new_name',
      description:'any_description',
      is_active: true,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    })
     output = await useCase.Execute({ id: entity.id, name: 'new_name', is_active: false })

    expect(spy).toBeCalledTimes(2)
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'new_name',
      description:'any_description',
      is_active: false,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    })
     output = await useCase.Execute({ id: entity.id, name: 'new_name', is_active: true })

    expect(spy).toBeCalledTimes(3)
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'new_name',
      description:'any_description',
      is_active: true,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    })
  })
  it('should update entity with many values', async () => {
    const spy = jest.spyOn(repository, 'Update')
    let entity = new Category({ name: 'any_name', })
    repository.items = [entity]
    let output = await useCase.Execute({ id: entity.id, name: 'new_name', description: 'any_description' })
    expect(spy).toBeCalledTimes(1)
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'new_name',
      description: 'any_description',
      is_active: true,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    })
    output = await useCase.Execute({ id: entity.id, name: 'new_name', description: 'any_description1', is_active: false })
    expect(spy).toBeCalledTimes(2)
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'new_name',
      description: 'any_description1',
      is_active: false,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    })
    output = await useCase.Execute({ id: entity.id, name: 'new_name', description: 'any_description2', is_active: true })
        expect(spy).toBeCalledTimes(3)
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'new_name',
      description: 'any_description2',
      is_active: true,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    })
   
  })
  it('should update entity with is active', async () => {
    const spy = jest.spyOn(repository, 'Update')
    let entity = new Category({ name: 'any_name', })
    repository.items = [entity]
    let output = await useCase.Execute({ id: entity.id, name: 'new_name' })
    expect(spy).toBeCalledTimes(1)
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'new_name',
      description: null,
      is_active: true,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    })
    output = await useCase.Execute({ id: entity.id, name: 'new_name', is_active: false })
    expect(spy).toBeCalledTimes(2)

    expect(output).toStrictEqual({
      id: entity.id,
      name: 'new_name',
      description: null,
      is_active: false,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    })
    output = await useCase.Execute({ id: entity.id, name: 'new_name', is_active: true })
    expect(spy).toBeCalledTimes(3)
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'new_name',
      description: null,
      is_active: true,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    })
   
  })
  it('should be able to verify update_at and created_at when entity he was updated', async () => {
    const spy = jest.spyOn(repository, 'Update')
    let entity = new Category({ name: 'any_name', })
    repository.items = [entity]
    let output = await useCase.Execute({ id: entity.id, name: 'new_name', })
    expect(spy).toBeCalledTimes(1)
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'new_name',
      description: null,
      is_active: true,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    })
    const verifyDate = entity.updated_at >= entity.created_at
    expect(verifyDate).toBeTruthy()
   
  })
  it('should be able to verify update_at is bigger than created_at when entity he was updated', async () => {
    const spy = jest.spyOn(repository, 'Update')
    let entity = new Category({ name: 'any_name', })
    const created_at = new Date(entity.created_at.getTime() - 1000)
    entity = new Category({ ...entity.props, created_at })
    repository.items = [entity]
    let output = await useCase.Execute({ id: entity.id, name: 'new_name', })
    expect(spy).toBeCalledTimes(1)
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'new_name',
      description: null,
      is_active: true,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    })
    const verifyDate = entity.updated_at > entity.created_at
    expect(verifyDate).toBeTruthy()
   
  })
})