import { UniqueEntityId } from '../value-objects/unique-entity-id';

export abstract class Entity<Props> {
  public readonly uniqueEntityId: UniqueEntityId;
  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id ?? new UniqueEntityId();
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }

  toJSON(): Required<Props & { id: string }> {
    return {
      id: this.id,
      ...this.props,
    } as Required<Props & { id: string }>;
  }
}
