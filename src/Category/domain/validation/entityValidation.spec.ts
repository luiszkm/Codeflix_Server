import { ValidCategory } from '../../utils/validCategory';
import { EntityValidationErrors } from '../errors/entityValidationErrors';
import { EntityValidation } from './entityValidation';

describe('Entity validation', () => {
  it('should be able to validate a entity with valid data', () => {
    const entity = new EntityValidation(ValidCategory, ValidCategory.id);
    expect(entity).toBeInstanceOf(EntityValidation);
    expect(entity.isValidUUID()).toBeTruthy();
  });
  it('should be not able to validate a entity with invalid id', () => {
    const entity = new EntityValidation(ValidCategory, 'invalid uuid');
    expect(entity).toBeInstanceOf(EntityValidation);
    expect(entity.isValidUUID()).toBeFalsy();
  });
  it('should be not able to validate a entity with invalid name', () => {
    let entity = new EntityValidation(
      {
        ...ValidCategory,
        name: 'a',
      },
      ValidCategory.id,
    );
    expect(entity).toBeInstanceOf(EntityValidation);
    expect(() => entity.Validation()).toThrowError(EntityValidationErrors);

    entity = new EntityValidation(
      {
        ...ValidCategory,
        name: 'aa',
      },
      ValidCategory.id,
    );
    expect(() => entity.Validation()).toThrowError(EntityValidationErrors);

    entity = new EntityValidation(
      {
        ...ValidCategory,
        name: 'aaa',
      },
      ValidCategory.id,
    );
    expect(() => entity.Validation()).toThrowError(EntityValidationErrors);
  });

  it('should be not able to validate a entity with invalid description', () => {
    let entity = new EntityValidation(
      {
        ...ValidCategory,
        description: null,
      },
      ValidCategory.id,
    );
    expect(entity).toBeInstanceOf(EntityValidation);
    expect(entity.description).toBeNull();

    entity = new EntityValidation(
      {
        ...ValidCategory,
        description: undefined,
      },
      ValidCategory.id,
    );
    expect(entity).toBeInstanceOf(EntityValidation);
    expect(entity.description).toBeUndefined();

    entity = new EntityValidation(
      {
        ...ValidCategory,
        description: 'a',
      },
      ValidCategory.id,
    );
    expect(entity).toBeInstanceOf(EntityValidation);
    expect(() => entity.Validation()).toThrowError(EntityValidationErrors);

    entity = new EntityValidation(
      {
        ...ValidCategory,
        description: 'aaa',
      },
      ValidCategory.id,
    );
    expect(() => entity.Validation()).toThrowError(EntityValidationErrors);
  });

  it('should be not able to validate a entity with invalid is_active', () => {
    let entity = new EntityValidation(
      {
        ...ValidCategory,
        is_active: null,
      },
      ValidCategory.id,
    );
    expect(() => entity.Validation()).toThrowError(EntityValidationErrors);
    entity = new EntityValidation(
      {
        ...ValidCategory,
        is_active: undefined,
      },
      ValidCategory.id,
    );
    expect(() => entity.Validation()).toThrowError(EntityValidationErrors);
  });

  it('should be not able to validate a entity with invalid created_at', () => {
    const entity = new EntityValidation(
      {
        ...ValidCategory,
        created_at: undefined,
      },
      ValidCategory.id,
    );
    expect(() => entity.Validation()).toThrowError(EntityValidationErrors);
  });

  it('should be not able to validate a entity with invalid updated_at', () => {
    const entity = new EntityValidation(
      {
        ...ValidCategory,
        updated_at: undefined,
      },
      ValidCategory.id,
    );
    expect(() => entity.Validation()).toThrowError(EntityValidationErrors);
  });
  it('should be not able to validate a entity with created_at bigger than update_At', () => {
    const entity = new EntityValidation(
      {
        ...ValidCategory,
        created_at: new Date(),
        updated_at: new Date('2021-01-01'),
      },
      ValidCategory.id,
    );
    expect(() => entity.Validation()).toThrowError(EntityValidationErrors);
  });
});
