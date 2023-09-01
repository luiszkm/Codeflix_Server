export interface UseCase<Input, Output> {
  Execute(input: Input): Output | Promise<Output>
}