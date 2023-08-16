import { Category } from "../../domain/entity/category";
import {InMemorySearchableRepository} from "../../../@seedwork/domain/repository/repository";
import { CategoryRepository } from "../../domain/repository/category.repository";

class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository {
}