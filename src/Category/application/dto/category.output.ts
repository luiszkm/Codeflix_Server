import { Category } from "Category/domain/entity/category";

export type CategoryOutput = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class CategoryOutputMapper {
  static toCategoryOutput(entity: Category): CategoryOutput {
    return entity.toJSON() as CategoryOutput
  }
}
