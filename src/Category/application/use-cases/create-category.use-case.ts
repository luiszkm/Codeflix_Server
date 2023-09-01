import { Category } from "../../domain/entity/category";
import { CategoryRepository } from "../../domain/repository/category.repository";

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository.Repository) { }

  async Execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
   const entity = new Category(input)
    await this.categoryRepository.Insert(entity)
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    }
  }
}


export type CreateCategoryInput = {
  name: string;
  description?: string;
  is_active?: boolean;
}
type CreateCategoryOutput = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

