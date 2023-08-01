import { ICategory } from '../entities/category';
import { EntityValidationErrors } from '../errors/entityValidationErrors';

export class EntityValidation {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(
    { name, description, is_active, created_at, updated_at }: ICategory,
    id: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.is_active = is_active;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.Validation();
  }

  isValidUUID(): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(this.id)) {
      return false;
      throw new Error('Invalid UUID');
    }
    return true;
  }

  public Validation() {
    this.isValidUUID();

    if (!this.id) {
      throw new EntityValidationErrors('Id is required');
    }

    if (!this.name) {
      throw new EntityValidationErrors('Name is required');
    }
    if (this.name.length <= 3) {
      throw new EntityValidationErrors('Name must be at least 3 characters');
    }
    if (this.description && this.description.length <= 3) {
      throw new EntityValidationErrors(
        'Description must be at least 3 characters',
      );
    }
    if (this.description === undefined) {
      throw new EntityValidationErrors(
        'Description is not be undefined ',
      );
    }

    if (this.is_active === undefined) {
      throw new EntityValidationErrors('is_active is required');
    }
    if (typeof this.is_active !== 'boolean') {
      throw new EntityValidationErrors('is_active must be a boolean');
    }

    if (this.created_at === undefined) {
      throw new EntityValidationErrors('created_at is required');
    }

    if (this.updated_at === undefined) {
      throw new EntityValidationErrors('updated_at is required');
    }

    if (this.created_at > this.updated_at) {
      throw new EntityValidationErrors(
        'updated_at must be greater than created_at',
      );
    }
  }
}
