import { Category } from "../../domain/entity/category";
import { InMemorySearchableRepository } from "../../../@seedwork/domain/repository/in-memory.repository";
import { CategoryRepository } from "../../domain/repository/category.repository";

class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository {
  protected applyFilter(items: Category[], filter: string): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }
}