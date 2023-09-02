import { ValidCategory } from '../utils/validCategory';
import { EntityValidationErrors } from '../errors/entityValidationErrors';
import { EntityValidation } from './entityValidation';

describe('Entity validation', () => {
  it('should be able to validate a entity with valid data', () => {
    expect(() => {
      EntityValidation.Validation(ValidCategory);
    }).not.toThrowError();
  });
  it('should be not able to validate a entity with invalid name', () => {
    const arrange = [undefined, 'a', 'aa', 'aaa', null];
    arrange.forEach((value) => {
      expect(() =>
        EntityValidation.Validation({
          ...ValidCategory,
          name: value,
        }),
      ).toThrowError(EntityValidationErrors);
    });
  });

  it('should be not able to validate a entity with invalid description', () => {
    const longName = 'a'.repeat(256);
    const arrange = [ 'a', 'aa', longName];
    arrange.forEach((value) => {
      expect(() =>
        EntityValidation.Validation({
          ...ValidCategory,
          description: value,
        }),
      ).toThrowError(EntityValidationErrors);
    });
  });
});
it('should be not able to validate a entity with invalid is_active', () => {
  expect(() =>
    EntityValidation.Validation({
      ...ValidCategory,
      is_active: null,
    }),
  ).toThrowError();

  expect(() =>
    EntityValidation.Validation({
      ...ValidCategory,
      is_active: undefined,
    }),
  ).toThrowError(EntityValidationErrors);
});

it('should be not able to validate a entity with invalid created_at', () => {
  expect(() =>
    EntityValidation.Validation({
      ...ValidCategory,
      created_at: undefined,
    }),
  ).toThrowError(EntityValidationErrors);
});

it('should be not able to validate a entity with invalid updated_at', () => {
  expect(() =>
    EntityValidation.Validation({
      ...ValidCategory,
      updated_at: undefined,
    }),
  ).toThrowError(EntityValidationErrors);
});
it('should be not able to validate a entity with created_at bigger than update_At', () => {
  expect(() =>
    EntityValidation.Validation({
      ...ValidCategory,
      created_at: new Date(),
      updated_at: new Date('2021-01-01'),
    }),
  ).toThrowError(EntityValidationErrors);
});
