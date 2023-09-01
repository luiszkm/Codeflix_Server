import { SearchResult } from "@seedwork/domain/repository/repository-contracts";

export type PaginationOutputDto <Items = unknown> = {
  items: Items[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
}

export class PaginationOutputMapper  {
 static toOutput(result: SearchResult):Omit<PaginationOutputDto, 'items'> {
  return{
    total: result.total,
    current_page: result.current_page,
    per_page: result.per_page,
    last_page: result.last_page
  }
 }
}