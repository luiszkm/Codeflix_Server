import { UseCase } from "@seedwork/application/use-case";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category.output";

export class ListCategoriesUseCase
implements UseCase<input, output> {
  Execute(input: input): CategoryOutput | Promise<CategoryOutput> {
    throw new Error("Method not implemented.");
  }
 

}


export type input = {
  id: string;

}
type output = CategoryOutput

