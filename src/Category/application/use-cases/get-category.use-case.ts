import { UseCase } from "@seedwork/application/use-case";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category.output";

export class GetCategoryUseCase
implements UseCase<CreateCategoryInput, output> {
  constructor(private readonly categoryRepository: CategoryRepository.Repository) { }

  async Execute(input: CreateCategoryInput): Promise<output> {
    const entity = await this.categoryRepository.FindByID(input.id)
 
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
  id: string;

}
type output = CategoryOutput

