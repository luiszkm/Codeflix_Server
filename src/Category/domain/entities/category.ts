import { randomUUID } from 'node:crypto';
import { EntityValidation } from '../validation/entityValidation';

export interface ICategory {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class Category {
  public readonly id: string;
  entityValidation: EntityValidation;
  constructor(public readonly props: ICategory) {
    this.id = randomUUID();
    this.props.description = this.props.description ?? null;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
    this.props.updated_at = this.props.updated_at ?? new Date();
    this.Validation();
    
  }


  Validation (){
    this.entityValidation = new EntityValidation(this.props, this.id);
    this.entityValidation.Validation();
  }

  get name() {
    return this.props.name;
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
