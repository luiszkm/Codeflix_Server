import { EntityValidationErrors } from '../errors/entityValidationErrors';
import { ValidatorRules } from '../../../@seedwork/validators/validator-rules';

interface IInputCategory {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class EntityValidation {
  static Validation({
    name,
    description,
    is_active,
    created_at,
    updated_at,
  }: IInputCategory) {
    // ValidatorRules.Values(name, 'name').Required().String()
    ValidatorRules.Values(description, 'description').String();
    //ValidatorRules.Values(is_active, 'is_active').Boolean()

    if (!name) {
      throw new EntityValidationErrors('Name is required');
    }
    if (name.length <= 3) {
      throw new EntityValidationErrors('Name must be at least 3 characters');
    }
    if (description && description.length <= 3) {
      throw new EntityValidationErrors(
        'Description must be at least 3 characters',
      );
    }
    if (description === undefined) {
      throw new EntityValidationErrors('Description is not be undefined ');
    }

    if (is_active === undefined) {
      throw new EntityValidationErrors('is_active is required');
    }
    if (typeof is_active !== 'boolean') {
      throw new EntityValidationErrors('is_active must be a boolean');
    }

    if (created_at === undefined) {
      throw new EntityValidationErrors('created_at is required');
    }

    if (updated_at === undefined) {
      throw new EntityValidationErrors('updated_at is required');
    }

    if (created_at > updated_at) {
      throw new EntityValidationErrors(
        'updated_at must be greater than created_at',
      );
    }
  }
}
