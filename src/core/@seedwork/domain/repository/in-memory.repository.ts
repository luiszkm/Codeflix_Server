import { Entity } from 'core/@seedwork/domain/entity/entity';
import {
  ISearchableRepository,
  RepositoryInterface,
  SearchParams,
  SearchResult,
} from './repository-contracts';
import { UniqueEntityId } from 'core/@seedwork/domain/value-objects/unique-entity-id';
import { NotFoundError } from '../../errors/in-memory/not-found.error';

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  public items: E[] = [];

  async Insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async FindByID(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }
  async FindAll(): Promise<E[]> {
    return this.items;
  }
  async Update(entity: E): Promise<void> {
    await this._get(entity.id);
    const indexFound = this.items.findIndex((item) => item.id === entity.id);
    this.items[indexFound] = entity;
  }
  async Delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    const indexFound = this.items.findIndex((item) => item.id === _id);
    this.items.splice(indexFound, 1);
  }

  protected async _get(id: string): Promise<E> {
    const item = await this.items.find((i) => i.id === id);
    if (!item)  throw new NotFoundError(`Entity not found using ID ${id}`);
    return item;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements ISearchableRepository<E>
{
  sortableFields: string[];
  async Search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sort_dir,
    );
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page,
    );
    const total = itemsFiltered.length;

    return new SearchResult<E>({
      items: itemsPaginated,
      total: total,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    });
  }
  protected abstract applyFilter(
    items: E[],
    filter: string | null,
  ): Promise<E[]>;
  protected async applySort(
    items: E[],
    sort: string | null,
    sort_dir: string | null,
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) return items;
    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sort_dir === 'asc' ? -1 : 1;
      }
      if (a.props[sort] > b.props[sort]) {
        return sort_dir === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    per_page: SearchParams['per_page'],
  ): Promise<E[]> {
    const start = (page - 1) * per_page;
    const limit = start + per_page;
    return items.slice(start, limit);
  }
}
