import { randomUUID } from "node:crypto";

export  class UniqueEntityId {
  constructor(private readonly id?: string) {
    this.id = id || randomUUID();
    this.ValidateId();
  }
  private ValidateId(): void {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    const isValid = uuidRegex.test(this.id)
    if (!isValid) throw new Error('Invalid id')
  }

}