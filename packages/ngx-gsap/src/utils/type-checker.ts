export class TypeChecker {
  constructor(private readonly value: unknown) {}

  public isString(): boolean {
    return typeof this.value === 'string';
  }

  public isNumber(): boolean {
    return typeof this.value === 'number';
  }

  public isBoolean(): boolean {
    return typeof this.value === 'boolean';
  }

  public isFunction(): boolean {
    return typeof this.value === 'function';
  }

  public isObject(): boolean {
    return typeof this.value === 'object';
  }

  public isUndefined(): boolean {
    return typeof this.value === 'undefined';
  }

  public isSymbol(): boolean {
    return typeof this.value === 'symbol';
  }

  public isBigint(): boolean {
    return typeof this.value === 'bigint';
  }
}
