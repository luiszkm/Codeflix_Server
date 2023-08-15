import { notDeepEqual } from "node:assert"
import { ValidCategory } from "../../utils/validCategory"
import { EntityValidationErrors } from "../../errors/entityValidationErrors"
import { Category } from "./category"

describe('Category Integration Tests', () => {
  it('should not be able create category with invalid name', () => {
    const longName = "a".repeat(256)
    const arrange = [null, undefined, '', 'a', 'ab', longName]
    arrange.forEach(async (value) => {
      expect(() => {
        new Category({ name: value })
      }).toThrow(EntityValidationErrors)
    })
  })
  it('should not be able create category with invalid description', async () => {
    const longName = "a".repeat(256)
    const arrange = [undefined, 'a', 'ab', longName]
    arrange.forEach(async (value) => {
      expect(() => {
        new Category({ ...ValidCategory, description: value })
      }).toThrow(EntityValidationErrors)
    })
  })
  it('should not be able create category with invalid isActive', async () => {
    expect(() => {
      new Category({ ...ValidCategory, is_active: undefined })
    }).toThrow(EntityValidationErrors)
  })
  it('should not be able create category with invalid Created_at', async () => {
    expect(() => {
      new Category({ ...ValidCategory, created_at: undefined })
    }).toThrow(EntityValidationErrors)
  })
  it('should not be able create category with invalid Updated_at', async () => {
    expect(() => {
      new Category({ ...ValidCategory, updated_at: undefined })
    }).toThrow(EntityValidationErrors)
  })
  it('should not be able create category with Updated_at less then created_at', async () => {
    expect(() => {
      new Category({
        ...ValidCategory,
        created_at: new Date(),
        updated_at: new Date('2021-01-01'),
      })
    }).toThrow(EntityValidationErrors)
  })

  it('should not be able create category with all valid data ', () => {
    const entity = new Category(ValidCategory)
    expect(entity).toBeInstanceOf(Category)
    expect(() => {
      entity
    }).not.toThrowError(EntityValidationErrors)
  })
  it('should not be able create category with valid  name ', () => {
    expect(() => {
      new Category({ ...ValidCategory, name: "valid name" })
    }).not.toThrowError(EntityValidationErrors)
  })
  it('should not be able create category with valid description ', () => {
    expect(() => {
      new Category({ ...ValidCategory, description: "valid description" })
    }).not.toThrowError(EntityValidationErrors)
  })
  it('should not be able create category with valid  is_active ', () => {
    expect(() => {
      new Category({ ...ValidCategory, is_active: true })
    }).not.toThrowError(EntityValidationErrors)
    expect(() => {
      new Category({ ...ValidCategory, is_active: false })
    }).not.toThrowError(EntityValidationErrors)
  })
  it('should not be able updated category with invalid name ', () => {
    const longName = "a".repeat(256)
    const arrange = [null, undefined, '', 'a', 'ab', longName]
    const entity = new Category(ValidCategory)
    arrange.forEach(async (value) => {
      expect(() => {
        entity.Update({ name: value })
      }).toThrow(EntityValidationErrors)
    })

  })
  it('should not be able updated category with invalid description ', () => {
    const longName = "a".repeat(256)
    const arrange = [null, undefined, '', 'a', 'ab', longName]
    const entity = new Category(ValidCategory)
    arrange.forEach(async (value) => {
      expect(() => {
        entity.Update({ description: value })
      }).toThrow(EntityValidationErrors)
    })
  })
  it('should not be able updated category with valid name ', () => {
    const entity = new Category(ValidCategory)
    expect(() => {
      entity.Update({ ...ValidCategory, name: "valid name" })
    }).not.toThrow(EntityValidationErrors)
    expect(entity.name).toBe("valid name")
  })
  it('should not be able updated category with valid description ', () => {
    const entity = new Category(ValidCategory)
    expect(() => {
      entity.Update({ ...ValidCategory, description: "valid description" })
    }).not.toThrow(EntityValidationErrors)
    expect(entity.description).toBe("valid description")
  })
})
