import { Category } from "core/Category/domain/entity/category"
import { NotFoundError } from "core/@seedwork/errors/in-memory/not-found.error"
import { CategoryInMemoryRepository } from "core/Category/infra/repository/category-in-memory.repository"
import { GetCategoryUseCase } from "../get-category.use-case"

describe('GetCategoryUseCase - unit test', () => {
  let useCase: GetCategoryUseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    useCase = new GetCategoryUseCase(repository)
  })
  it('should not be able to get a category by id with invalid id', async () => {
    expect(async () => {
      await useCase.Execute({ id: 'invalid_id' })
    }).rejects.toThrowError(new NotFoundError("Entity not found using ID invalid_id"))
  })
  it('should  be able to get a category by id', async () => {
    const spt = jest.spyOn(repository, 'FindByID')
    const items = [
      new Category({ name: 'any_name', }),
    ]
    repository.items = items
    const output = await useCase.Execute({ id: items[0].id })
    expect(spt).toHaveBeenCalledTimes(1)
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'any_name',
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at
    })
  })
})