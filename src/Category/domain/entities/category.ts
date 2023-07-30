interface ICategory {
  id?: string;
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class Category {

  constructor(public readonly props: ICategory) {
    this.props.description = this.props.description ?? null;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
    this.props.updated_at = this.props.updated_at ?? new Date();
  }
  get name() {
    return this.props.name;
  }
  get description() {
    return this.props.description;
  }

  get is_active() {
    return this.props.is_active;
  }
  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }

}