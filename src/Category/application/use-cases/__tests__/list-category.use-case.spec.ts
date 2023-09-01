import { Category } from "../../../domain/entity/category"
import { NotFoundError } from "../../../../@seedwork/errors/in-memory/not-found.error"
import { CategoryInMemoryRepository } from "../../../infra/repository/category-in-memory.repository"
import { CategoryRepository } from "Category/domain/repository/category.repository"
import { ListCategoriesUseCase } from "../list-categories.use-case"

describe('ListCategoryUseCase - unit test', () => {
  let useCase: ListCategoriesUseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    useCase = new ListCategoriesUseCase(repository)
  })
  test("toOutput method", () => {
    const result = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    })
    const output = useCase['toOutput'](result)
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1
    })
  })

  it('should be able to list categories with order by created_at', async () => {
    const created_at = new Date()
    const updated_at = new Date(created_at.getTime() + 100000)
    const items = [
      new Category({
        name: "test 1",
        created_at,
        updated_at
      }),
      new Category({
        name: "test 2",
        created_at: new Date(created_at.getTime() + 1000),
        updated_at
      }),
    ]
    repository.items = items
    const output = await useCase.Execute({})
    expect(output).toStrictEqual({
      items: [...items].reverse().map(item => item.toJSON()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    })


  })
  it('should be able to list categories using pagination, sort and filter', async () => {
    const items = [
      new Category({
        name: "aaaa",

      }),
      new Category({
        name: "AaaA",

      }),
      new Category({
        name: "AAAA",
      }),
      new Category({
        name: "bbbb",
      }),
      new Category({
        name: "cccc",
      }),

    ]
    repository.items = items
    /////
    let output = await useCase.Execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      filter: 'a'
    })
    expect(output).toStrictEqual({
      items: [items[2].toJSON(), items[1].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    })
    /////
    output = await useCase.Execute({
      page: 2,
      per_page: 2,
      sort: 'name',
      filter: 'a'
    })
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    })
    /////
    output = await useCase.Execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      filter: 'a',
      sort_dir: 'desc'
    })
    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[1].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    })

  })
})

