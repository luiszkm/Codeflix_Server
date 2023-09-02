import { randomUUID } from 'node:crypto';
import { ValueObject } from './value-object';

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || randomUUID());
    this.ValidateId();
  }
  private ValidateId(): void {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    const isValid = uuidRegex.test(this.value);
    if (!isValid) throw new Error('Invalid id');
  }
}
