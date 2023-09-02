import { Category } from "core/Category/domain/entity/category"
import { CategoryOutputMapper } from "./category.output"

describe("CategoryOutputMapper", () => {
  it("should be able to map a category to a category output", async () => {
    const created_at = new Date()
    const updated_at = new Date(created_at.getTime() + 1000)
    const entity = new Category({
      name: "Category 1",
      description: "Category 1 description",
      is_active: true,
      created_at,
      updated_at,
    })
    const spy = jest.spyOn(entity, "toJSON")
    const output = CategoryOutputMapper.toOutput(entity)
    expect(spy).toBeCalledTimes(1)
     expect(output).toStrictEqual({
      id: entity.id,
      name: "Category 1",
      description: "Category 1 description",
      is_active: true,
      created_at,
      updated_at,
    })

  })
})