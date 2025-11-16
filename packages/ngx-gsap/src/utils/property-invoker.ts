import { TypeChecker } from './type-checker';

export class PropertyInvoker<T extends Record<string, unknown>> {
  constructor(private readonly target: T) {}

  public invoke(object: Record<string, unknown>): void {
    Object.entries(object)
      .filter(([key]) => new TypeChecker(this.target[key]).isFunction())
      .forEach(([key, value]) => (this.target[key] as (arg: unknown) => unknown)(value));
  }
}
