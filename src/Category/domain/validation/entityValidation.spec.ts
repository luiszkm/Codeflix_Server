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
    expect(() => new EntityValidation(
      {
        ...ValidCategory,
        name: 'a',
      },
      ValidCategory.id,
    )).toThrowError(EntityValidationErrors);

    expect(() => new EntityValidation(
      {
        ...ValidCategory,
        name: 'aa',
      },
      ValidCategory.id,
    )).toThrowError(EntityValidationErrors);
    expect(() => new EntityValidation(
      {
        ...ValidCategory,
        name: 'aaa',
      },
      ValidCategory.id,
    )).toThrowError(EntityValidationErrors);
  });


  it('should be not able to validate a entity with invalid description', () => {

    const entity = new EntityValidation(
      {
        ...ValidCategory,
        description: null,
      },
      ValidCategory.id,
    )
    expect(entity.description).toBeNull();

    expect(() => new EntityValidation(
      {
        ...ValidCategory,
        description: undefined,
      },
      ValidCategory.id,
    )).toThrowError(EntityValidationErrors);

    expect(() => new EntityValidation(
      {
        ...ValidCategory,
        description: "a",
      },
      ValidCategory.id,
    )).toThrowError(EntityValidationErrors);
    expect(() => new EntityValidation(
      {
        ...ValidCategory,
        description: "aa",
      },
      ValidCategory.id,
    )).toThrowError(EntityValidationErrors);
    expect(() => new EntityValidation(
      {
        ...ValidCategory,
        description: "aaa",
      },
      ValidCategory.id,
    )).toThrowError(EntityValidationErrors);
  });
});

it('should be not able to validate a entity with invalid is_active', () => {
  expect(() => new EntityValidation(
    {
      ...ValidCategory,
      is_active: null,
    },
    ValidCategory.id,
  )).toThrowError(EntityValidationErrors);

  expect(() => new EntityValidation(
    {
      ...ValidCategory,
      is_active: undefined,
    },
    ValidCategory.id,
  )).toThrowError(EntityValidationErrors);

});


it('should be not able to validate a entity with invalid created_at', () => {
  expect(() => new EntityValidation(
    {
      ...ValidCategory,
      created_at: undefined,
    },
    ValidCategory.id,
  )).toThrowError(EntityValidationErrors);
});

it('should be not able to validate a entity with invalid updated_at', () => {
  expect(() => new EntityValidation(
    {
      ...ValidCategory,
      updated_at: undefined,
    },
    ValidCategory.id,
  )).toThrowError(EntityValidationErrors);
});
it('should be not able to validate a entity with created_at bigger than update_At', () => {
  expect(() => new EntityValidation(
    {
      ...ValidCategory,
      created_at: new Date(),
      updated_at: new Date('2021-01-01'),
    },
    ValidCategory.id,
  )).toThrowError(EntityValidationErrors)
});

