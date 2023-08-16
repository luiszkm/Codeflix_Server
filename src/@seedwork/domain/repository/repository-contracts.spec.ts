import { SearchParams, SearchResult } from "./repository-contracts"

describe("SearchParams - Unit test", () => {
  test("page props", () => {
    const params = new SearchParams()
    expect(params.page).toBe(1)

    const arrange = [
      { input: undefined, expected: 1 },
      { input: null, expected: 1 },
      { input: "", expected: 1 },
      { input: "fake", expected: 1 },
      { input: 0, expected: 1 },
      { input: -1, expected: 1 },
      { input: true, expected: 1 },
      { input: false, expected: 1 },
      { input: 5.5, expected: 1 },
      { input: {}, expected: 1 },
      { input: 1, expected: 1 },
      { input: 2, expected: 2 },
    ]
    arrange.forEach(({ input, expected }) => {
      expect(new SearchParams({ page: input as any }).page).toBe(expected)
    })
  })
  test("per_page props", () => {
    const params = new SearchParams()
    expect(params.per_page).toBe(15)
    const arrange = [
      { input: undefined, expected: 15 },
      { input: null, expected: 15 },
      { input: "", expected: 15 },
      { input: "fake", expected: 15 },
      { input: 0, expected: 15 },
      { input: -5, expected: 15 },
      { input: true, expected: 15 },
      { input: false, expected: 15 },
      { input: 5.5, expected: 15 },
      { input: {}, expected: 15 },
      { input: 1, expected: 1 },
      { input: 2, expected: 2 },
      { input: 10, expected: 10 },
    ]
    arrange.forEach(({ input, expected }) => {
      expect(new SearchParams({ per_page: input as any }).per_page).toBe(expected)
    })
  })
  test("sort props", () => {
    const params = new SearchParams()
    expect(params.sort).toBe(null)
    const arrange = [
      { input: undefined, expected: null },
      { input: null, expected: null },
      { input: "", expected: null },
      { input: "field", expected: "field" },
      { input: 0, expected: "0" },
      { input: -15, expected: "-15" },
      { input: true, expected: "true" },
      { input: false, expected: "false" },
      { input: 5.5, expected: "5.5" },
      { input: {}, expected: "[object Object]" },
    ]
    arrange.forEach(({ input, expected }) => {
      expect(new SearchParams({ sort: input as any }).sort).toBe(expected)
    })
  })
  test("sort_dir props", () => {
    let params = new SearchParams({ sort: null })
    expect(params.sort_dir).toBe(null)
    params = new SearchParams({ sort: "" })
    expect(params.sort_dir).toBe(null)
    params = new SearchParams({ sort: undefined })
    expect(params.sort_dir).toBe(null)
    params = new SearchParams()
    expect(params.sort_dir).toBe(null)
    const arrange = [
      { input: undefined, expected: "asc" },
      { input: null, expected: "asc" },
      { input: "", expected: "asc" },
      { input: 0, expected: "asc" },
      { input: "fake", expected: "asc" },
      { input: "asc", expected: "asc" },
      { input: "ASC", expected: "asc" },
      { input: "desc", expected: "desc" },
      { input: "DESC", expected: "desc" },
    ]
    arrange.forEach(({ input, expected }) => {
      expect(new SearchParams({ sort: "field", sort_dir: input as any }).sort_dir).toBe(expected)
    })
  })
  test("filter props", () => {
    const params = new SearchParams()    
    expect(params.filter).toBeNull()
    const arrange = [
      { input: undefined, expected: null },
      { input: null, expected: null },
      { input: "", expected: null },
      { input: "field", expected: "field" },
      { input: 0, expected: "0" },
      { input: -15, expected: "-15" },
      { input: true, expected: "true" },
      { input: false, expected: "false" },
      { input: 5.5, expected: "5.5" },
      { input: {}, expected: "[object Object]" },
    ]
    arrange.forEach(({ input, expected }) => {
      expect(new SearchParams({ filter: input as any }).filter).toBe(expected)
    })
  })

})

describe("SearchResult - Unit test", () => {
  test("constructor props", () => {
   let result = new SearchResult({
    items: ["entity1", "entity2"] as any,
    total: 4,
    current_page:1,
    per_page: 2,
    sort: null,
    sort_dir: null,
    filter:null
   })
    expect(result.toJSON()).toStrictEqual({
      items: ["entity1", "entity2"] as any,
      total: 4,
      current_page:1,
      per_page: 2,
      last_page: 2,
      sort: null,
      sort_dir: null,
      filter:null
    })
    result = new SearchResult({
      items: ["entity1", "entity2"] as any,
      total: 4,
      current_page:1,
      per_page: 2,
      sort: "name",
      sort_dir: "asc",
      filter: "test"
     })
     expect(result.toJSON()).toStrictEqual({
      items: ["entity1", "entity2"] as any,
      total: 4,
      current_page:1,
      per_page: 2,
      last_page: 2,
      sort: "name",
      sort_dir: "asc",
      filter: "test"
    })

  })
  it("should set last_page 1 when per_page field is greater than total field", () => {
    let result = new SearchResult({
      items: [] as any,
      total: 4,
      current_page:1,
      per_page: 15,
      sort: null,
      sort_dir: null,
      filter:null
     })
     expect(result.last_page).toBe(1)

  })
  test("last_page prop when total is not a multiple of per_page", () => {
    let result = new SearchResult({
      items: [] as any,
      total: 101,
      current_page:1,
      per_page: 20,
      sort: null,
      sort_dir: null,
      filter:null
     })
     expect(result.last_page).toBe(6)

  })
})