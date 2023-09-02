import { UseCase } from "core/@seedwork/application/use-case";
import { Category } from "core/Category/domain/entity/category";
import { CategoryRepository } from "core/Category/domain/repository/category.repository";
import { CategoryOutput } from "../dto/category.output";

export class CreateCategoryUseCase 
implements UseCase<CreateCategoryInput, output> {
  constructor(private readonly categoryRepository: CategoryRepository.Repository) { }

  async Execute(input: CreateCategoryInput): Promise<output> {
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
type output = CategoryOutput

