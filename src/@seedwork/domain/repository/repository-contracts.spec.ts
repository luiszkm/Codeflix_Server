import { SearchParams } from "./repository-contracts"

describe("Search Params - Unit test", () => {
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