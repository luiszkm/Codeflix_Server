import { UniqueEntityId } from '../value-objects/unique-entity-id';
import { Entity } from './entity';

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

const uuidValidator = (uuid) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
};
describe('Entity', () => {
  it('should set props and id', () => {
    const arrange = { prop1: 'prop1 value', prop2: 2 };
    const entity = new StubEntity({ prop1: 'prop1 value', prop2: 2 });

    expect(entity.props).toStrictEqual(arrange);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).not.toBeNull();
    expect(entity.id).not.toBeUndefined();
    expect(uuidValidator(entity.id)).toBeTruthy();
  });
  it('should accept valid uuid', () => {
    const entity = new StubEntity({ prop1: 'prop1 value', prop2: 2 });
    const uniqueEntityId = new UniqueEntityId(entity.id);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueEntityId.value);
  });
  it('should convert a entity to a JSON object', () => {
    const arrange = { prop1: 'prop1 value', prop2: 2 };
    const entity = new StubEntity(arrange);
    const uniqueEntityId = new UniqueEntityId(entity.id);
    expect(entity.toJSON()).toStrictEqual({ id: entity.id, ...arrange });
  });
});
