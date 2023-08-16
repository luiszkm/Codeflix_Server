import { ISearchableRepository } from "@seedwork/domain/repository/repository-contracts";
import { Category } from "../entity/category";

export interface CategoryRepository extends ISearchableRepository<Category, any, any> {

}