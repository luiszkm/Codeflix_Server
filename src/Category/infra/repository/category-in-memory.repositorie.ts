import { Category } from "../../domain/entity/category";
import InMemoryRepository, {} from "../../../@seedwork/domain/repository/repository";
import { CategoryRepository } from "../../domain/repository/category.repository";

class CategoryInMemoryRepository
  extends InMemoryRepository<Category>
  implements CategoryRepository {
}