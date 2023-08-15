import { error } from "console";

export class EntityValidationErrors extends Error {
  constructor(message?: string, name?: string) {
    super(message);
    this.name = name; // Opcional, você pode definir um nome personalizado para o erro
  }
}

// try {
//   // Alguma lógica de validação que dispara um erro:
//   throw new EntityValidationErrors(
//     error.message,
//   );
// } catch (error) {
//   if (error instanceof EntityValidationErrors) {
//     console.error('Erro personalizado capturado:', error.message);
//   } else {
//     console.error('Outro erro capturado:', error);
//   }
//}
