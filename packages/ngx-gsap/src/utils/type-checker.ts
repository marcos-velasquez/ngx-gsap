export class TypeChecker {
  constructor(private readonly value: unknown) {}

  public string(): boolean {
    return typeof this.value === 'string';
  }

  public number(): boolean {
    return typeof this.value === 'number';
  }

  public boolean(): boolean {
    return typeof this.value === 'boolean';
  }

  public function(): boolean {
    return typeof this.value === 'function';
  }

  public object(): boolean {
    return typeof this.value === 'object';
  }

  public undefined(): boolean {
    return typeof this.value === 'undefined';
  }

  public symbol(): boolean {
    return typeof this.value === 'symbol';
  }

  public bigint(): boolean {
    return typeof this.value === 'bigint';
  }
}
