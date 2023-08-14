import { EntityValidation } from '../validation/entityValidation';
import { UniqueEntityId } from '../../../@seedwork/domain/value-objects/unique-entity-id';
import { Entity } from '../../../@seedwork/domain/entity/entity';
import { ValidatorRules } from '../../../@seedwork/validators/validator-rules';

interface ICategory {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

interface IUpdate {
  name: string;
  description: string;
}

export class Category extends Entity<ICategory> {
  entityValidation: EntityValidation;
  constructor(public readonly props: ICategory, id?: UniqueEntityId) {
    super(props, id);
    this.props.description = this.props.description ?? null;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
    this.props.updated_at = this.props.updated_at ?? new Date();
    Category.Validate(props);
  }

  static Validate(props: ICategory) {
    EntityValidation.Validation(props);
  }

  Update({ name, description }: IUpdate): void {
    Category.Validate({ ...this.props, name, description });
    this.props.name = name;
    this.props.description = description;
    this.props.updated_at = new Date();
  }
  Activate() {
    this.props.is_active = true;
    this.props.updated_at = new Date();
  }
  Deactivate() {
    this.props.is_active = false;
    this.props.updated_at = new Date();
  }

  get name() {
    return this.props.name;
  }
  private set name(value: string) {
    this.props.name = value;
  }
  get description() {
    return this.props.description;
  }
  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }
  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }
  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }
}
