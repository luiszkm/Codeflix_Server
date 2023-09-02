import { Category } from "core/Category/domain/entity/category";

export type CategoryOutput = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutput {
    return entity.toJSON() as CategoryOutput
  }
}
