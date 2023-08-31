import { Category } from '../../domain/entity/category';
import { InMemorySearchableRepository } from '../../../@seedwork/domain/repository/in-memory.repository';
import { CategoryRepository } from 'Category/domain/repository/category.repository';

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at', ];

  protected async applyFilter(
    items: Category[],
    filter: string,
  ): Promise<Category[]> {
  if (!filter) return items;
  return items.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));

  }
  protected async applySort(
    items: Category[], 
    sort: string, 
    sort_dir: string): Promise<Category[]> {
    return !sort 
    ? super.applySort(items, 'created_at', "desc")
    : super.applySort(items, sort, sort_dir);
  }
}
