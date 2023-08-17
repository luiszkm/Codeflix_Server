export class EntityValidationErrors extends Error {
  constructor(message?: string, name?: string) {
    super(message);
    this.name = name; // Opcional, você pode definir um nome personalizado para o erro
  }
}
