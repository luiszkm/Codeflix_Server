import { UseCase } from "@seedwork/application/use-case";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category.output";
import { SearchInputDto } from "@seedwork/application/dto/search-input.dto";
import { PaginationOutputDto, PaginationOutputMapper } from "@seedwork/application/dto/pagination-output.dto";

export class ListCategoriesUseCase
  implements UseCase<input, output> {
  constructor(private readonly categoryRepository: CategoryRepository.Repository) { }
  async Execute(input: input): Promise<output> {
    const params = new CategoryRepository.SearchParams(input)
    const searchResult = await this.categoryRepository.Search(params)
    return this.toOutput(searchResult)
  }
  private toOutput (searchResult: CategoryRepository.SearchResult): output{
    const items = searchResult.items.map(category => {
      return CategoryOutputMapper.toOutput(category)
    })
    return{
      items,
      total: searchResult.total,
      current_page: searchResult.current_page,
      per_page: searchResult.per_page,
      last_page: searchResult.last_page,
      ...PaginationOutputMapper.toOutput(searchResult),
    
    }
  }
}

export type input = SearchInputDto
type output = PaginationOutputDto<CategoryOutput>

