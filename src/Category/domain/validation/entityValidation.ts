import { EntityValidationErrors } from '../errors/entityValidationErrors';

interface IInputCategory {
  name: string;
  description: string;
  is_active: boolean;
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
    EntityValidation.ValidateName(name);
    EntityValidation.ValidateDescription(description);
    EntityValidation.ValidateISActive(is_active);

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
 static ValidateISActive(is_active: boolean) {
    if (is_active === undefined) {
      throw new EntityValidationErrors('is_active is required');
    }
    if (typeof is_active !== 'boolean') {
      throw new EntityValidationErrors('is_active must be a boolean');
    }
  }

 static ValidateName(name: string) {
    if (!name || name === typeof Number) {
      throw new EntityValidationErrors('Name is required');
    }
    if (name.length <= 3) {
      throw new EntityValidationErrors('Name must be at least 3 characters');
    }
    if (name.length > 255) {
      throw new EntityValidationErrors('Name must be at most 255 character');
    }
    
  }

  static ValidateDescription(description: string | undefined) {
    if (description && description.length < 3) {
      throw new EntityValidationErrors(
        'Description must be at least 3 characters',
      );
    }
    if (description && description.length > 255) {
      throw new EntityValidationErrors(
        'Description must be at most 255 character',
      );
    }
    if (description === undefined) {
      throw new EntityValidationErrors('Description is not be undefined ');
    }

  }
}
