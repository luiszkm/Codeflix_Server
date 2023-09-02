import { CreateCategoryUseCase } from "../create-category.use-case"
import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository"

describe('CreateCategoryUseCase - unit test', () => {
  let useCase: CreateCategoryUseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    useCase = new CreateCategoryUseCase(repository)
  })
  it('should be able to create a category with props required', async () => {
    const spyInsert = jest.spyOn(repository, 'Insert')
    let output = await useCase.Execute({ name: 'any_name' })
    expect(spyInsert).toHaveBeenCalledTimes(1)
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'any_name',
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at
    })
    output = await useCase.Execute({ name: 'any_name', description: 'any_description' })
  })
  it('should be able to create a category with props optional;', async () => {
    const spyInsert = jest.spyOn(repository, 'Insert')
  let  output = await useCase.Execute({ name: 'any_name', description: 'any_description', is_active: false })
    expect(spyInsert).toHaveBeenCalledTimes(1)
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'any_name',
      description: 'any_description',
      is_active: false,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at
    })
    ///////
    output = await useCase.Execute({ name: 'any_name', description: 'any_description', is_active: false })
    expect(spyInsert).toHaveBeenCalledTimes(2)
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: 'any_name',
      description: 'any_description',
      is_active: false,
      created_at: repository.items[1].created_at,
      updated_at: repository.items[1].updated_at
    })
    /////
    output = await useCase.Execute({ name: 'any_name', is_active: false })
    expect(spyInsert).toHaveBeenCalledTimes(3)
    expect(output).toStrictEqual({
      id: repository.items[2].id,
      name: 'any_name',
      description: null,
      is_active: false,
      created_at: repository.items[2].created_at,
      updated_at: repository.items[2].updated_at
    })
  })

})