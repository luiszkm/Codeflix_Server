import { CategoryRepository } from "core/Category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category.output";
import { UseCase } from "core/@seedwork/application/use-case";

export class UpdateCategoryUseCase
  implements UseCase<Input, output> {
  constructor(private readonly categoryRepository: CategoryRepository.Repository) { }

  async Execute(input: Input): Promise<output> {
    const entity = await this.categoryRepository.FindByID(input.id)
    entity.Update({description: input.description, name: input.name})
    if (input.is_active === true) {
      entity.Activate()
    }
    if (input.is_active === false) {
      entity.Deactivate()
    }
    await this.categoryRepository.Update(entity)
    return CategoryOutputMapper.toOutput(entity)
  }
}

export type Input = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}
type output = CategoryOutput