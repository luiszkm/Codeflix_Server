import { Category } from "Category/domain/entity/category"
import { PaginationOutputMapper } from "./pagination-output.dto"
import { SearchResult } from "@seedwork/domain/repository/repository-contracts"


describe("CategoryOutputMapper - unit test", () => {
  it("should be able to convert a search result in output ", async () => {
    const created_at = new Date()
    const updated_at = new Date(created_at.getTime() + 1000)
    const result = new SearchResult({
      items: ['fake'] as any,
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "desc",
      filter: "fake",
    })
    const output = PaginationOutputMapper.toOutput(result)
    expect(output).toStrictEqual({
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1
    })
  })
})
