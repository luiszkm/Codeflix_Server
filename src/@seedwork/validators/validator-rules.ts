import { ValidationError } from '../errors/validation-error';

export class ValidatorRules {
  private constructor(private value: any, private property: string) {}

  static Values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }
  Required(): this {
    //!this.value
    if (this.value === undefined || this.value === null || this.value === '') {
      throw new ValidationError(`The ${this.property} is required`);
    }
    return this;
  }
  String(): this {
    if (typeof this.value !== 'string' && !isEmpty(this.value)) {
      throw new ValidationError(`The ${this.property} must be a string`);
    }
    return this;
  }
  MaxLength(length: number): this {
    if (this.value.length < length) {
      throw new ValidationError(
        `The ${this.property} must be less than ${length} characters`,
      );
    }
    return this;
  }
  Boolean(): typeof this {
    if (typeof this.value !== 'boolean') {
      throw new ValidationError(`The ${this.property} must be a boolean`);
    }
    return this;
  }
}

function isEmpty(value: any): boolean {
  return value === undefined || value === null;
}
