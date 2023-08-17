import { Entity } from "../../entity/entity";
import { InMemorySearchableRepository } from "../in-memory.repository";
import { SearchParams, SearchResult } from "../repository-contracts";

type StubEntityProps = {
  name: string
  price: number
}
class StubEntity extends Entity<StubEntityProps> { }
class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  protected async applyFilter(
    items: StubEntity[],
    filter: string | null
  ): Promise<StubEntity[]> {
    if (!filter) return items
    return items.filter(item => {
      return (
        item.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.props.price.toString() === filter
      )
    })
  }
  sortableFields: string[] = ['name']
}
describe("InMemorySearchableRepository -  Unit test", () => {
  let repository: StubInMemorySearchableRepository
  beforeEach(() => {
    repository = new StubInMemorySearchableRepository()
  })
  describe("applyFilter method", () => {
    it("should no filter items when filter param  is null", async () => {
      const items = [new StubEntity({ name: "test", price: 1 })];
      const spyFilterMethod = jest.spyOn(items, "filter" as any)
      const result = await repository["applyFilter"](items, null)
      expect(result).toStrictEqual(items)
      expect(spyFilterMethod).not.toHaveBeenCalled()
    })
    it("should filter items when filter param  is not null", async () => {
      const items = [
        new StubEntity({ name: "fake", price: 5 }),
        new StubEntity({ name: "test", price: 2 }),
        new StubEntity({ name: "test2", price: 2 })
      ];
      {
        const spyFilterMethod = jest.spyOn(items, "filter" as any)
        const result = await repository["applyFilter"](items, "test")
        expect(result).toStrictEqual([items[1], items[2]])
        expect(spyFilterMethod).toHaveBeenCalledTimes(1)
      }
      {
        const spyFilterMethod = jest.spyOn(items, "filter" as any)
        const result = await repository["applyFilter"](items, "2")
        expect(result).toStrictEqual([items[1], items[2]])
        expect(spyFilterMethod).toHaveBeenCalledTimes(2)
      }
      {
        const spyFilterMethod = jest.spyOn(items, "filter" as any)
        const result = await repository["applyFilter"](items, "fake")
        expect(result).toStrictEqual([items[0]])
        expect(spyFilterMethod).toHaveBeenCalledTimes(3)
      }
      {
        const spyFilterMethod = jest.spyOn(items, "filter" as any)
        const result = await repository["applyFilter"](items, "no-filter")
        expect(result).toHaveLength(0)
        expect(spyFilterMethod).toHaveBeenCalledTimes(4)
      }
    })
  })
  describe("applySort method", () => {
    it("should not be able short items", async () => {
      const items = [
        new StubEntity({ name: "test", price: 1 }),
        new StubEntity({ name: "test2", price: 2 })
      ];
      let itemsSorted = await repository["applySort"](items, null, null)
      expect(itemsSorted).toStrictEqual(items)
      itemsSorted = await repository["applySort"](items, "price", "asc")
      expect(itemsSorted).toStrictEqual(items)
    })
    it("should be able short items", async () => {
      const items = [
        new StubEntity({ name: "b", price: 1 }),
        new StubEntity({ name: "a", price: 2 }),
        new StubEntity({ name: "c", price: 2 })

      ];
      let itemsSorted = await repository["applySort"](items, "name", "asc")
      expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]])

      itemsSorted = await repository["applySort"](items, "name", "desc")
      expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]])
    })
  })
  describe("applyPaginate method", () => {
    it("should not be able paginate items", async () => {
      const items = [
        new StubEntity({ name: "test", price: 1 }),
        new StubEntity({ name: "test2", price: 2 }),
        new StubEntity({ name: "test3", price: 3 }),
        new StubEntity({ name: "test4", price: 4 }),
        new StubEntity({ name: "test5", price: 5 })
      ];
      let itemsPaginated = await repository["applyPaginate"](items, 1, 2)
      expect(itemsPaginated).toStrictEqual([items[0], items[1]])
      itemsPaginated = await repository["applyPaginate"](items, 2, 2)
      expect(itemsPaginated).toStrictEqual([items[2], items[3]])
      itemsPaginated = await repository["applyPaginate"](items, 3, 2)
      expect(itemsPaginated).toStrictEqual([items[4]])
      itemsPaginated = await repository["applyPaginate"](items, 4, 2)
      expect(itemsPaginated).toStrictEqual([])
    })
  })
  describe("search method", () => {
    it("should return all items when no filter, sort and paginate", async () => {
      const entity = new StubEntity({ name: "test", price: 1 })
      const items = Array(16).fill(entity)
      repository.items = items
      const result = await repository.Search(new SearchParams())
      expect(result).toStrictEqual(new SearchResult({
        items: Array(15).fill(entity),
        total: 16,
        current_page: 1,
        per_page: 15,
        sort: null,
        sort_dir: null,
        filter: null
      }))
    })
    it("should apply paginate and filter", async () => {
      const items = [
        new StubEntity({ name: "test", price: 2 }),
        new StubEntity({ name: "a", price: 2 }),
        new StubEntity({ name: "TEST", price: 2 }),
        new StubEntity({ name: "TeSt", price: 2 }),
      ];
      repository.items = items
      let result = await repository.Search(new SearchParams({ filter: "TEST", per_page: 2, page: 1 }))
      expect(result).toStrictEqual(new SearchResult({
        items: [items[0], items[2]],
        total: 3,
        current_page: 1,
        per_page: 2,
        sort: null,
        sort_dir: null,
        filter: "TEST"
      }))
      result = await repository.Search(new SearchParams({ filter: "TEST", per_page: 2, page: 2 }))
      expect(result).toStrictEqual(new SearchResult({
        items: [items[3]],
        total: 3,
        current_page: 2,
        per_page: 2,
        sort: null,
        sort_dir: null,
        filter: "TEST"
      }))

    })
    it("should apply paginate and sort", async () => {
      const items = [
        new StubEntity({ name: "b", price: 2 }),
        new StubEntity({ name: "a", price: 2 }),
        new StubEntity({ name: "d", price: 2 }),
        new StubEntity({ name: "e", price: 2 }),
        new StubEntity({ name: "c", price: 2 }),

      ];
      repository.items = items
      const arrange = [
        {
          input: new SearchParams({ sort: 'name', per_page: 2, page: 2 }),
          expected: new SearchResult({
            items: [items[4], items[2]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: null
          })
        },
        {
          input: new SearchParams({ sort: 'name', per_page: 2, page: 1 }),
          expected: new SearchResult({
            items: [items[1], items[0]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: null
          })
        },
        {
          input: new SearchParams({ sort: 'name', per_page: 2, page: 2, sort_dir: 'desc' }),
          expected: new SearchResult({
            items: [items[4], items[0]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
            filter: null
          })
        },
        {
          input: new SearchParams({ sort: 'name', per_page: 2, page: 1, sort_dir: 'desc' }),
          expected: new SearchResult({
            items: [items[3], items[2]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc",
            filter: null
          })
        }
      ]
      arrange.forEach(async ({ input, expected }) => {
        const result = await repository.Search(input)
        expect(result).toStrictEqual(expected)
      })
    
    })
    it("should apply paginate, sort and filter", async () => {
      const items = [
        new StubEntity({ name: "test", price: 2 }),
        new StubEntity({ name: "a", price: 2 }),
        new StubEntity({ name: "TEST", price: 2 }),
        new StubEntity({ name: "e", price: 2 }),
        new StubEntity({ name: "TeSt", price: 2 }),

      ];
      repository.items = items
      const arrange = [
        {
          input: new SearchParams({ sort: 'name', per_page: 2, page: 1, filter: 'TEST'}),
          expected: new SearchResult({
            items: [items[2], items[4]],
            total: 3,
            current_page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: "TEST"
          })
        },
        {
          input: new SearchParams({ sort: 'name', per_page: 2, page: 2, filter: 'TEST' }),
          expected: new SearchResult({
            items: [items[0]],
            total: 3,
            current_page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: "asc",
            filter: "TEST"
          })
        }
      ]
      arrange.forEach(async ({ input, expected }) => {
        const result = await repository.Search(input)
        expect(result).toStrictEqual(expected)
      })
    })
  })
})