import {
  ISearchableRepository,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult
}
  from '../../../@seedwork/domain/repository/repository-contracts';
import { Category } from '../entity/category';


export namespace CategoryRepository {

  type Filter = string
  export class SearchParams extends DefaultSearchParams<Filter> { }

  export class SearchResult extends DefaultSearchResult<Category, Filter> { }

  export interface Repository
    extends ISearchableRepository<
      Category,
      Filter,
      SearchParams,
      SearchResult
    > { }

}