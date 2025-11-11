export class Is {
  constructor(private readonly value: unknown) {}

  public function(): boolean {
    return typeof this.value === 'function';
  }
}
