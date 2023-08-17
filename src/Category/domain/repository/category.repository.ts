import { ISearchableRepository } from '@seedwork/domain/repository/repository-contracts';
import { Category } from '../entity/category';

export type CategoryRepository = ISearchableRepository<Category, any, any>;
